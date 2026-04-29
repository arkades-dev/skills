---
id: forge-code-hygiene
name: Forge code hygiene
version: "1.0.0"
appliesToWorkerTypes:
  - CEO
  - Frontend
  - Backend
  - DBA
  - QA
  - Security
  - Docs
  - Founding
  - Specialist
appliesToFiles:
  - "**/*"
docsBaseUrl: https://arkades.dev/docs/code-hygiene
loadMode: always
---

# Forge code hygiene

> **Forge code hygiene** — what NOT to add to code:
>
> 1. NO comments explaining WHAT code does. Well-named identifiers do that. Only WHY when non-obvious.
> 2. NO speculative TODOs (`// TODO: later`). Solve now or open an issue.
> 3. NO celebration text (`// Done!`, `// Successfully…`). Code shows it works.
> 4. NO backwards-compat shims for code you just removed. Just remove it.
> 5. NO `// removed` markers — the diff shows it.
> 6. Match the file's existing conventions; don't impose new ones.
> 7. Use existing functions; grep before writing new utilities.

## Curated docs

- [Forge code hygiene guide](/code-hygiene): The canonical version of these rules with examples and rationale.
- [Comment philosophy](/code-hygiene/comments): What "WHY not WHAT" looks like in practice.
- [Avoiding boilerplate](/code-hygiene/boilerplate): Why generated code accumulates noise and how to prevent it.
