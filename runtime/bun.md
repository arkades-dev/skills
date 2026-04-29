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
loadMode: lazy
---

# Bun

> **Bun** — runtime + package manager + bundler. Override Node/npm reflexes:
>
> 1. **Use `bun`** (NOT npm/pnpm/yarn):
>    ✅ `bun install`, `bun run dev`, `bun src/index.ts`
>    ❌ `npm install`, `pnpm dev`, `tsx src/index.ts`
>
> 2. **Lockfile is `bun.lock`** (mixing managers breaks workspace links — never commit npm/yarn lockfiles).
>
> 3. **TypeScript runs natively** — no `tsx`, `ts-node`, or build step needed for execution.
>
> 4. **Bun-native APIs** when on Bun:
>    ✅ `Bun.spawn(...)`, `Bun.file(...)`, `Bun.serve(...)`, `Bun.hash(...)`
>    `node:child_process` etc. work but `Bun.*` is faster + native.
>
> 5. **`bun --hot`** reloads source. Does NOT refresh `node_modules` — restart after `prisma generate`, dependency upgrades.
>
> 6. **`bun install --ignore-scripts`** for untrusted package contexts (postinstall hooks are arbitrary code).
>
> 7. **Workspaces**: declared in root `package.json` `workspaces` field. Linked via `bun install`.

## Curated docs

- [Runtime](/runtime): Bun.serve, Bun.spawn, Bun.file, etc.
- [Package manager](/cli/install): bun install, lockfile, workspaces.
- [bun create](/cli/bun-create): Project scaffolding.
- [bun run](/cli/run): Run scripts and TS files directly.
- [Hot reload](/runtime/hot): `bun --hot` semantics.
- [Bundler](/bundler): `bun build` for production bundles.
- [Compatibility](/runtime/nodejs-apis): What's supported from Node.
- [Bun llms.txt](https://bun.com/llms.txt): Upstream's curated index — fetch when you need something not in the list above.
- [Bun llms-full.txt](https://bun.sh/llms-full.txt): Upstream's full content concatenated — heavyweight; use only when llms.txt doesn't have the topic.
- [Bun llms-rules.txt](https://bun.com/llms-rules.txt): Upstream's published rules for AI agents.
