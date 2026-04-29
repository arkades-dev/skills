// Validate every skill .md file in this repo:
//   1. Frontmatter conforms to schema.json
//   2. id matches filename basename
//   3. Body has a # H1 matching name, a > blockquote primer, and a
//      ## Curated docs section
//   4. index.json items match files on disk
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

interface IndexItem {
  id: string
  path: string
  version: string
  name: string
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
  // Strip the $schema reference — ajv treats it as needing a registered
  // meta-schema. We don't need it for runtime validation; the file is
  // self-describing for editors.
  delete schema.$schema
  const index = JSON.parse(readFileSync(INDEX_PATH, "utf8")) as IndexFile

  const ajv = new Ajv({ strict: true, allErrors: true })
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
      onErr(
        file,
        `frontmatter parse failed: ${err instanceof Error ? err.message : err}`,
      )
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
    }

    // 2. id matches filename basename.
    const expectedId = basename(file, extname(file))
    if (fm.id !== expectedId) {
      onErr(file, `id "${fm.id}" must match filename basename "${expectedId}"`)
      continue
    }

    // 3a. # H1 matches name.
    const h1Re = new RegExp(
      `^# ${escapeRegex(fm.name)}\\s*$`,
      "m",
    )
    if (!h1Re.test(content)) {
      onErr(file, `body must contain exactly "# ${fm.name}" (matching the name field)`)
      continue
    }

    // 3b. > blockquote primer present.
    if (!/^\s*>\s/m.test(content)) {
      onErr(file, "body must contain a `>` blockquote primer at the top")
      continue
    }

    // 3c. ## Curated docs section.
    if (!/^##\s+Curated docs\s*$/m.test(content)) {
      onErr(file, 'body must contain a "## Curated docs" section')
      continue
    }

    console.log(`✓ ${file}`)
  }

  // 4. Index.json ↔ disk parity.
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

  // 5. Index ids match frontmatter ids.
  for (const item of index.items) {
    if (!diskPaths.has(item.path)) continue
    const raw = readFileSync(item.path, "utf8")
    const { data } = matter(raw)
    const fm = data as { id: string; version: string; name: string }
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
  }

  if (errorCount > 0) {
    console.error(`\n${errorCount} validation error(s)`)
    process.exit(1)
  }
  console.log(`\nAll ${skillFiles.length} skill file(s) valid.`)
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

main().catch((err) => {
  console.error("validator threw:", err)
  process.exit(2)
})
