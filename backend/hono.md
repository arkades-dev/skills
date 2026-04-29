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

> **Hono** is an ultra-fast web framework for Bun, Cloudflare Workers,
> Node, and Deno. Lightweight, zero-dep, TS-first.
>
> 1. **Context object**: middleware/handlers receive `c`. Use
>    `c.req.json()`, `c.req.param("id")`, `c.req.query()`. Reply with
>    `c.json(data)`, `c.text("...")`, `c.html(...)`.
> 2. **Routing**: `app.get(path, ...middlewares, handler)`. Middlewares
>    chain via varargs.
> 3. **Bun runtime**: `export default app` — Bun's serve picks up
>    `fetch`. WebSockets via the `hono/bun` adapter.
> 4. **`hono/jsx` is server-rendering JSX, NOT React.** Don't import
>    React in Hono routes; use `c.html(<Page />)`.
> 5. **RPC**: `hc<typeof app>(baseUrl)` builds a type-safe client from
>    your route definitions — no codegen needed.
> 6. **Validators**: use `@hono/zod-validator` (`zValidator`) for typed
>    request validation. Don't roll custom parsers.

## Curated docs

- [App](/api/hono): The main Hono class — routes, middleware.
- [Context](/api/context): The `c` object — req, res, helpers.
- [Routing](/api/routing): Route patterns, params, regex routes.
- [Middleware concepts](/concepts/middleware): The middleware model.
- [RPC](/guides/rpc): Type-safe client from route definitions.
- [Bun adapter](/getting-started/bun): Running Hono on Bun.
- [Validation](/guides/validation): zValidator and friends.

## Upstream

- [Hono llms.txt](https://hono.dev/llms.txt): The full upstream index.
