---
id: stack-conventions
name: Stack Conventions
version: 0.1.0
loadMode: always
---

# Stack Conventions

> **Stack** — this project is Vite + React 19 + TypeScript + Tailwind 4 (+ optional shadcn/ui). Follow these conventions to fit in.
> 1. **Tailwind 4 has no config file.** Tokens live in CSS via `@theme { --color-foo: ...; }`. Never add `tailwind.config.js` or `postcss.config.js` — they don't apply.
> 2. **React 19** — components can accept `ref` as a regular prop; `forwardRef` still works but is no longer required for new code. Use `use()` for promises/contexts inside Suspense. Don't add `"use client"` (this isn't Next).
> 3. **TypeScript** — strict mode is on. No `any`. No non-null assertions (`!`) without a comment explaining why. Prefer discriminated unions over flag-bag objects.
> 4. **Imports** use `@/` alias for `src/`. Group order: external → `@/` → relative. Don't write `../../../`.
> 5. **Styling** — Tailwind utility classes inline. Use `cn()` from `@/lib/utils` to merge conditional classes. CSS modules only for complex animations.
> 6. **State** — TanStack Query for server state. `useState` / `useReducer` for local. No custom event buses.
> 7. **Bun, not Node.** Use `bun` for scripts and `bun:test` for tests. Don't add `nodemon`, `ts-node`, or `npm`.
> 8. **File layout** — components in `src/components/`, routes in `src/routes/`, utilities in `src/lib/`, types in `src/types/`. Keep one component per file unless they're tightly coupled.
