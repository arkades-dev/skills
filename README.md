# arkades/skills

Knowledge packs that workers in [Forge](https://arkades.dev) install to write idiomatic, version-aware code. Each skill is a markdown file with YAML frontmatter (runtime metadata) and a body containing a **primer** (always loaded into the worker's system prompt) plus a **curated docs index** (served on demand via `fetch_docs`).

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
forgeNotes: |                                   # optional
  Forge-specific overlay (multi-line YAML).
---

# Tailwind CSS 4

> Primer goes here as a `>` blockquote. Always loaded into worker's
> system prompt. ≤ 200 tokens. Counters training-data inertia with
> concrete imperatives. NOT a rehash of the docs.

## Curated docs

- [Theme](/theme): Configure design tokens via the @theme CSS block.
- [Upgrade guide](/upgrade-guide): Differences from v3.
- ...
```

See [`schema.json`](./schema.json) for the strict frontmatter contract (CI rejects malformed PRs). See any existing skill (e.g. [`frontend/tailwind-4.md`](./frontend/tailwind-4.md)) for a complete reference.

## Format rules

A skill file:
- Lives at `<category>/<id>.md` where `<category>` is `frontend`, `backend`, `runtime`, etc.
- Filename basename **must** match the `id` field in frontmatter.
- Has a `# Title` matching the `name` field.
- Has exactly **one `>` blockquote** at the top — the primer.
- Has a `## Curated docs` section with a markdown link list.
- Optionally a `## Upstream` section pointing at the framework's own llms.txt.

## Contributing a new skill

1. Fork.
2. Add `<category>/<id>.md` — copy a similar existing skill as a starting point.
3. Add an entry to [`index.json`](./index.json).
4. Open a PR. CI validates frontmatter against `schema.json`, checks that filename matches `id`, and verifies required body sections.
5. Maintainers review for content quality (see anti-patterns below).

Within ~24h of merge, every Forge instance picks up the new skill in its catalog automatically.

## Anti-patterns (please read before writing a primer)

The primer is the **most expensive context budget item** — every task the worker runs costs tokens for it. Wasting that budget on stuff the model already knows is a quality regression, not an improvement.

### ❌ Don't

- **Don't rehash the docs.** "Tailwind is a utility-first CSS framework" — the model knows.
- **Don't write generic best practices.** "Use semantic HTML, accessible labels…" — irrelevant noise.
- **Don't celebrate the version.** "Tailwind 4 is great!" — pure tokens-for-nothing.
- **Don't write 'when to use this skill'** — the worker already has it installed; it can't choose.
- **Don't list features the model already gets right.** Only the gotchas.

### ✅ Do

The primer should answer: **"What about THIS version is the model likely to get wrong from training-data inertia?"** That's the entire job.

High-signal primer content:
- "v4 removed `@apply` — use utility classes directly."
- "Pass `ref` as a regular prop — `forwardRef` is no longer required."
- "Server Components are NOT applicable in Vite SPAs — don't generate `\"use client\"`."

Low-signal primer content (don't):
- "Tailwind makes it easy to style your components." (Pure noise.)
- "Use React 19 for the latest features." (Model knows.)
- "Always test your code." (Generic.)

## Curated docs index

What the worker fetches via `fetch_docs(skillId)`:
- 5–15 entries. Less is more.
- Each entry: `[Title](path): one-line summary`. Paths relative to `docsBaseUrl` OR full URLs.
- Mix of: most-changed APIs in this version, migration guide (when relevant), 1–2 "common gotchas" / pattern pages.

## License

MIT — see [LICENSE](./LICENSE).
