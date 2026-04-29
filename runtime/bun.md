---
id: bun
name: Bun
version: "1.0.0"
appliesToWorkerTypes:
  - Frontend
  - Backend
appliesToFiles:
  - "package.json"
  - "bun.lock*"
  - "Dockerfile"
docsBaseUrl: https://bun.sh/docs
---

# Bun

> **Bun** is a JavaScript runtime + package manager + bundler. Mostly
> Node-compatible, with Bun-specific quirks the model needs to internalize.
>
> 1. **Use `bun`, never `npm`/`pnpm`.** Lockfile is `bun.lock`. Mixing
>    managers breaks workspace links.
> 2. **TypeScript runs natively** — no `tsx`, `ts-node`, or build step
>    needed. `bun src/index.ts` just works.
> 3. **Bun-native APIs**: `Bun.spawn(...)`, `Bun.file(...)`,
>    `Bun.serve(...)`, `Bun.hash(...)`. Prefer these over
>    `node:child_process` / `node:fs` when on Bun.
> 4. **`bun create <template>`** scaffolds projects. **`bunx <pkg>`**
>    runs npm packages without global install.
> 5. **`bun --hot`** reloads source on save. Does NOT refresh
>    `node_modules` — restart after `prisma generate`, `bun install`, etc.
> 6. **`bun install --ignore-scripts`** is the safe default in untrusted
>    contexts (postinstall hooks can run arbitrary code).
> 7. **Workspaces**: declared in root `package.json` `workspaces` field.
>    Linked via `bun install`.

## Curated docs

- [Runtime](/runtime): Bun.serve, Bun.spawn, Bun.file, etc.
- [Package manager](/cli/install): bun install, lockfile, workspaces.
- [bun create](/cli/bun-create): Project scaffolding.
- [bun run](/cli/run): Run scripts and TS files directly.
- [Hot reload](/runtime/hot): `bun --hot` semantics.
- [Bundler](/bundler): `bun build` for production bundles.
- [Compatibility](/runtime/nodejs-apis): What's supported from Node.
