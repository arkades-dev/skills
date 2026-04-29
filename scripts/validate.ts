// Validate every skill .md file in this repo:
//   1. Frontmatter conforms to schema.json
//   2. id matches filename basename
//   3. Body has a # H1 matching name, a > blockquote primer, and a
//      ## Curated docs section
//   4. index.json items match files on disk (path, id, version, name, loadMode)
//   5. Primer length capped per loadMode:
//      - foundation (loadMode: always) → ≤600 chars (~150 tokens with margin)
//      - domain     (loadMode: lazy)   → ≤1200 chars (~300 tokens)
//   6. Anti-injection sweep on the primer body
//   7. forgeNotes forbidden on foundation skills (they're inherently
//      Forge-opinionated; the whole content IS the Forge note)
//
// Run locally: bun run scripts/validate.ts
// CI:          .github/workflows/validate.yml

import Ajv from "ajv"
import addFormats from "ajv-formats"
import matter from "gray-matter"
import { glob } from "glob"
import { readFileSync, existsSync } from "node:fs"
import { basename, extname } from "node:path"

const SCHEMA_PATH = "schema.json"
const INDEX_PATH = "index.json"

const PRIMER_CAP_FOUNDATION = 600
const PRIMER_CAP_DOMAIN = 1200

// Hard-block patterns. These all attempt to override the worker's
// system prompt or role. False-positive risk is low — none of these
// phrases appear in legitimate framework documentation.
const INJECTION_PATTERNS: Array<{ name: string; re: RegExp }> = [
  {
    name: "ignore-previous-instructions",
    re: /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  },
  {
    name: "disregard-role",
    re: /disregard\s+(your\s+)?(role|instructions|system\s+prompt)/i,
  },
  {
    name: "you-are-now-unrestricted",
    re: /you\s+are\s+now\s+(an?\s+)?(unrestricted|jailbroken|uncensored|dan|developer)/i,
  },
  { name: "forget-everything", re: /forget\s+(everything|all)/i },
  { name: "fake-system-message", re: /^\s*system\s*[:>]\s*\w+/im },
]

interface IndexItem {
  id: string
  path: string
  version: string
  name: string
  loadMode: "always" | "lazy"
}
interface IndexFile {
  version: number
  items: IndexItem[]
}

async function main(): Promise<void> {
  if (!existsSync(SCHEMA_PATH) || !existsSync(INDEX_PATH)) {
    console.error("schema.json and index.json must exist at repo root")
    process.exit(2)
  }
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, "utf8")) as Record<string, unknown>
  delete schema.$schema
  const index = JSON.parse(readFileSync(INDEX_PATH, "utf8")) as IndexFile

  const ajv = new Ajv({ strict: true, allErrors: true, useDefaults: true })
  addFormats(ajv)
  const validateFrontmatter = ajv.compile(schema)

  const skillFiles = await glob("**/*.md", {
    ignore: ["README.md", "node_modules/**", ".github/**"],
  })

  let errorCount = 0
  const onErr = (file: string, msg: string): void => {
    console.error(`✗ ${file}: ${msg}`)
    errorCount += 1
  }

  for (const file of skillFiles.sort()) {
    const raw = readFileSync(file, "utf8")
    let parsed: ReturnType<typeof matter>
    try {
      parsed = matter(raw)
    } catch (err) {
      onErr(file, `frontmatter parse failed: ${err instanceof Error ? err.message : err}`)
      continue
    }
    const { data, content } = parsed

    // 1. Frontmatter conforms to schema.
    if (!validateFrontmatter(data)) {
      onErr(file, ajv.errorsText(validateFrontmatter.errors))
      continue
    }
    const fm = data as {
      id: string
      name: string
      version: string
      forgeNotes?: string
      loadMode?: "always" | "lazy"
    }
    // ajv applies the schema default; assert post-default.
    const loadMode: "always" | "lazy" = fm.loadMode ?? "lazy"

    // 2. id matches filename basename.
    const expectedId = basename(file, extname(file))
    if (fm.id !== expectedId) {
      onErr(file, `id "${fm.id}" must match filename basename "${expectedId}"`)
      continue
    }

    // 3a. # H1 matches name.
    const h1Re = new RegExp(`^# ${escapeRegex(fm.name)}\\s*$`, "m")
    if (!h1Re.test(content)) {
      onErr(file, `body must contain exactly "# ${fm.name}" (matching the name field)`)
      continue
    }

    // 3b. > blockquote primer present, plus extract its content for length / anti-injection checks.
    const primer = extractPrimer(content)
    if (primer === null) {
      onErr(file, "body must contain a `>` blockquote primer at the top")
      continue
    }

    // 3c. ## Curated docs section.
    if (!/^##\s+Curated docs\s*$/m.test(content)) {
      onErr(file, 'body must contain a "## Curated docs" section')
      continue
    }

    // 5. Primer length cap by loadMode.
    const cap = loadMode === "always" ? PRIMER_CAP_FOUNDATION : PRIMER_CAP_DOMAIN
    if (primer.length > cap) {
      onErr(
        file,
        `primer is ${primer.length} chars; cap for loadMode="${loadMode}" is ${cap} chars (~${Math.round(cap / 4)} tokens)`,
      )
      continue
    }

    // 6. Anti-injection sweep on the primer.
    for (const { name, re } of INJECTION_PATTERNS) {
      if (re.test(primer)) {
        onErr(
          file,
          `primer matches anti-injection pattern "${name}". Suspicious content blocked. If this is a legitimate framework reference, rephrase.`,
        )
        // Don't continue — keep checking other patterns to surface all issues.
        break
      }
    }

    // 7. Foundation skills must NOT have forgeNotes.
    if (loadMode === "always" && fm.forgeNotes) {
      onErr(
        file,
        `foundation skills (loadMode: always) cannot have forgeNotes — the whole skill IS the Forge convention. Move project-specific guidance into the primer or split into a separate domain skill.`,
      )
      continue
    }

    // 8. enforcementRules: compile each pattern as a real RegExp to
    //    catch syntax errors before they reach the runtime. A bad
    //    regex would crash the server's ChangeSet scanner.
    const rules = (data as { enforcementRules?: Array<{ pattern: string; message: string }> })
      .enforcementRules
    if (Array.isArray(rules)) {
      let ruleErr = false
      for (const [idx, rule] of rules.entries()) {
        try {
          // We use the regex globally + multiline (server runs them
          // across multiple files joined; consistent with future runtime).
          new RegExp(rule.pattern, "gm")
        } catch (err) {
          onErr(
            file,
            `enforcementRules[${idx}].pattern is not a valid regex: ${err instanceof Error ? err.message : err}`,
          )
          ruleErr = true
        }
      }
      if (ruleErr) continue
    }

    const ruleSummary = Array.isArray(rules) && rules.length > 0
      ? `, ${rules.length} rule${rules.length === 1 ? "" : "s"}`
      : ""
    console.log(`✓ ${file} [${loadMode}, ${primer.length}ch primer${ruleSummary}]`)
  }

  // 4. index.json ↔ disk parity.
  const indexedPaths = new Set(index.items.map((i) => i.path))
  const diskPaths = new Set(skillFiles)

  for (const f of skillFiles) {
    if (!indexedPaths.has(f)) {
      onErr(f, "present on disk but missing from index.json")
    }
  }
  for (const item of index.items) {
    if (!diskPaths.has(item.path)) {
      onErr(item.path, "listed in index.json but missing on disk")
    }
  }

  // Index frontmatter parity.
  for (const item of index.items) {
    if (!diskPaths.has(item.path)) continue
    const raw = readFileSync(item.path, "utf8")
    const { data } = matter(raw)
    const fm = data as {
      id: string
      version: string
      name: string
      loadMode?: "always" | "lazy"
    }
    if (fm.id !== item.id) {
      onErr(item.path, `index.json id "${item.id}" doesn't match frontmatter id "${fm.id}"`)
    }
    if (fm.version !== item.version) {
      onErr(
        item.path,
        `index.json version "${item.version}" doesn't match frontmatter version "${fm.version}"`,
      )
    }
    if (fm.name !== item.name) {
      onErr(
        item.path,
        `index.json name "${item.name}" doesn't match frontmatter name "${fm.name}"`,
      )
    }
    const fmMode = fm.loadMode ?? "lazy"
    if (fmMode !== item.loadMode) {
      onErr(
        item.path,
        `index.json loadMode "${item.loadMode}" doesn't match frontmatter loadMode "${fmMode}"`,
      )
    }
  }

  if (errorCount > 0) {
    console.error(`\n${errorCount} validation error(s)`)
    process.exit(1)
  }
  console.log(`\nAll ${skillFiles.length} skill file(s) valid.`)
}

// Extract the primer = the leading `>` blockquote (contiguous lines
// starting with `>`). Returns the concatenated content with `> `
// markers stripped, or null if no blockquote is found.
function extractPrimer(body: string): string | null {
  const lines = body.split("\n")
  // Skip the leading H1 + any blank lines.
  let i = 0
  while (i < lines.length && (lines[i].trim() === "" || /^# /.test(lines[i]))) {
    i += 1
  }
  // Now we should be at the first content line. If it's not a `>` line,
  // no primer.
  const primerLines: string[] = []
  while (i < lines.length && /^\s*>/.test(lines[i])) {
    primerLines.push(lines[i].replace(/^\s*>\s?/, ""))
    i += 1
  }
  if (primerLines.length === 0) return null
  return primerLines.join("\n").trim()
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

main().catch((err) => {
  console.error("validator threw:", err)
  process.exit(2)
})
