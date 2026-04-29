# arkades/skills

Knowledge installed on workers in [Forge](https://arkades.dev) so they write idiomatic, version-aware code with consistent hygiene. Skills are markdown files with YAML frontmatter.

## Two kinds of skills

The registry distinguishes by `loadMode` in the frontmatter:

| Kind | `loadMode` | When loaded | Token budget | Where they live |
|---|---|---|---|---|
| **Foundation** | `always` | Inlined into every task's system prompt | ≤ 600 char primer (~150 tok) | `foundation/` |
| **Domain** | `lazy` (default) | Loaded on demand via `use_skill(id)` tool | ≤ 1200 char primer (~300 tok) | `frontend/`, `backend/`, `runtime/`, … |

**Foundations** are universal AI hygiene + project-wide conventions: code style, security baseline, type discipline. They apply to every task regardless of what the worker is touching. Forge auto-installs them on every newly-spawned worker.

**Domain skills** are framework-specific knowledge: Tailwind 4, React 19, Prisma 6, Hono. Workers only consult them when the task's domain matches. Manually installed via the picker, or auto-installed when a template's `recommendedSkills` includes them.

> **Runtime note:** the schema and tooling are ready for the lazy-load model today; the server-side runtime (`use_skill` tool, primer summary block) ships incrementally. In the interim window, both foundation and domain skills always-load. Mark new skills with the correct `loadMode` regardless — the runtime catches up to the metadata, not the other way around.

## Anatomy of a skill

```md
---
id: tailwind-4
name: Tailwind CSS 4
version: "1.0.0"
appliesToWorkerTypes: [Frontend]
appliesToFiles: ["**/*.tsx", "**/*.css"]
docsBaseUrl: https://tailwindcss.com/docs
llmsTxtUrl: https://tailwindcss.com/llms.txt   # optional
loadMode: lazy                                  # default; foundations use "always"
forgeNotes: |                                   # optional; FORBIDDEN on foundations
  Forge-specific overlay (multi-line YAML).
---

# Tailwind CSS 4

> Primer goes here as a `>` blockquote. Loaded into the worker's system
> prompt (foundations: always; domain: on demand). Counters training-data
> inertia with concrete imperatives. NOT a rehash of the docs.

## Curated docs

- [Theme](/theme): Configure design tokens via the @theme CSS block.
- ...
```

See [`schema.json`](./schema.json) for the strict frontmatter contract (CI rejects malformed PRs). See any existing skill (e.g. [`frontend/tailwind-4.md`](./frontend/tailwind-4.md) for domain, [`foundation/forge-code-hygiene.md`](./foundation/forge-code-hygiene.md) for foundation) for a complete reference.

## Format rules

A skill file:
- Lives at `<category>/<id>.md` where `<category>` is `foundation`, `frontend`, `backend`, `runtime`, etc.
- Filename basename **must** match the `id` field in frontmatter.
- Has a `# Title` matching the `name` field.
- Has exactly **one `>` blockquote** at the top — the primer.
- Has a `## Curated docs` section with a markdown link list.
- Optionally a `## Upstream` section pointing at the framework's own llms.txt.
- Foundations (`loadMode: always`) **MUST NOT** have `forgeNotes` — the whole skill IS the Forge convention.
- Foundation primers are capped at **600 chars** (~150 tokens). Domain primers at **1200 chars** (~300 tokens). Counted on blockquote content with `>` markers stripped.

## Anti-injection sweep

Validation rejects PRs whose primers match patterns commonly used in prompt injection attempts:
- `ignore (all )?(previous|prior) instructions`
- `disregard (your )?(role|instructions|system prompt)`
- `you are now (an? )?(unrestricted|jailbroken|...)`
- `forget (everything|all)`
- Fake system-message lines (`SYSTEM: ...`)

Public PRs pass through CI; if they trip these patterns, the validator blocks. If you're writing a legitimate framework reference and somehow trip a pattern, rephrase.

## Anti-patterns — foundation skills

The foundation primer is **always** in the worker's system prompt for every task across every project. Wasted tokens compound. Bad guidance compounds even worse — it shapes every output.

### ❌ Don't (foundations)

- **Don't write framework-specific advice.** Foundations are universal. "Use Tailwind 4 conventions" doesn't belong in a foundation — that's a domain skill.
- **Don't write soft suggestions.** "Consider using descriptive variable names." Foundation rules are imperative. Either it's a rule, or it's not in a foundation.
- **Don't list 12 things.** A foundation primer should fit in one screen. 5–7 rules max. Too many rules → workers prioritize wrong.
- **Don't duplicate domain skill content.** If `tailwind-4` covers it, foundation shouldn't repeat.

### ✅ Do (foundations)

- **Express universal opinions.** "No comments explaining what code does." "Validate at boundaries."
- **Be terse.** Every char counts × every task × every worker × every project.
- **Be falsifiable.** Each rule should be checkable: did the worker follow it? Soft virtues like "write good code" are not.

## Anti-patterns — domain skills

The primer is the **most expensive context budget item** for domain skills the worker actually engages — every relevant task pays the load cost. Wasting that budget on stuff the model already knows is a quality regression.

### ❌ Don't (domain skills)

- **Don't rehash the docs.** "Tailwind is a utility-first CSS framework" — the model knows.
- **Don't write generic best practices.** "Use semantic HTML, accessible labels…" — irrelevant noise.
- **Don't celebrate the version.** "Tailwind 4 is great!" — pure tokens-for-nothing.
- **Don't write 'when to use this skill'** — the worker already has it installed; it can't choose.

### ✅ Do (domain skills)

The primer should answer: **"What about THIS version is the model likely to get wrong from training-data inertia?"** That's the entire job. Concrete, imperative, with code examples where they help.

High-signal primer content:
- "v4 removed `@apply` — use utility classes directly."
- "Pass `ref` as a regular prop — `forwardRef` is no longer required."
- "Server Components are NOT applicable in Vite SPAs — don't generate `\"use client\"`."

## Curated docs index

What the worker fetches via `fetch_docs(skillId)`:
- 5–15 entries. Less is more.
- Each entry: `[Title](path): one-line summary`. Paths relative to `docsBaseUrl` OR full URLs.
- Mix of: most-changed APIs in this version, migration guide (when relevant), 1–2 "common gotchas" / pattern pages.

## Contributing

1. Decide if your skill is a **foundation** (universal hygiene/convention) or a **domain** (framework-specific). When in doubt, it's domain.
2. Fork.
3. Add `<category>/<id>.md`. Copy a similar existing skill as a starting point.
4. Add an entry to [`index.json`](./index.json).
5. Open a PR. CI validates frontmatter, primer length, anti-injection patterns, and the foundation/forgeNotes rule.
6. Maintainers review for content quality (foundations get extra scrutiny — they shape every Forge output).

Within ~24h of merge, every Forge instance picks up the new skill in its catalog automatically.

## License

MIT — see [LICENSE](./LICENSE).
