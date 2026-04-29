---
id: hono
name: Hono
version: "1.0.0"
appliesToWorkerTypes:
  - Backend
appliesToFiles:
  - "**/routes/**"
  - "**/server/**"
  - "**/api/**"
  - "src/index.ts"
docsBaseUrl: https://hono.dev/docs
llmsTxtUrl: https://hono.dev/llms.txt
loadMode: lazy
---

# Hono

> **Hono** — ultra-fast web framework for Bun, Cloudflare Workers, Node, Deno. Override Express/Fastify reflexes:
>
> 1. **Context object `c`** (NOT separate req/res):
>    ✅ `app.get("/x", (c) => c.json({ ok: true }))`
>    ✅ `c.req.json()`, `c.req.param("id")`, `c.req.query()`
>    ❌ `(req, res) => res.json(...)` (Express pattern)
>
> 2. **Routing**: `app.get(path, ...mw, handler)` — middlewares chain via varargs.
>
> 3. **Bun runtime**: `export default app` — Bun's serve picks up `fetch`. WebSockets via `hono/bun` adapter.
>
> 4. **`hono/jsx` is server-rendering JSX, NOT React.** Don't import React in Hono routes; use `c.html(<Page />)`.
>
> 5. **RPC**: `hc<typeof app>(baseUrl)` builds a type-safe client from your route definitions — no codegen needed.
>
> 6. **Validators**: use `@hono/zod-validator` (`zValidator`) for typed request validation. Don't roll custom parsers.

## Curated docs

- [App](/api/hono): The main Hono class — routes, middleware.
- [Context](/api/context): The `c` object — req, res, helpers.
- [Routing](/api/routing): Route patterns, params, regex routes.
- [Middleware concepts](/concepts/middleware): The middleware model.
- [RPC](/guides/rpc): Type-safe client from route definitions.
- [Bun adapter](/getting-started/bun): Running Hono on Bun.
- [Validation](/guides/validation): zValidator and friends.
- [Testing](/guides/testing): Built-in testing helpers.
- [Hono llms.txt](https://hono.dev/llms.txt): Upstream's curated index — fetch when you need something not in the list above.
