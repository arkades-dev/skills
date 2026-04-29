---
id: prisma-6
name: Prisma 6
version: "1.0.0"
appliesToWorkerTypes:
  - DBA
  - Backend
appliesToFiles:
  - "prisma/schema.prisma"
  - "prisma/migrations/**"
  - "**/db/**"
  - "**/prisma/**"
docsBaseUrl: https://www.prisma.io/docs
loadMode: lazy
forgeNotes: |
  AI-driven destructive ops (`migrate reset`, `db push --force-reset`) are
  blocked unless `PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION` is set with
  the exact consent string — ask the user before running these. After
  `prisma generate`, restart the API + worker processes to pick up new
  client types (Bun --hot doesn't refresh node_modules).
enforcementRules:
  - pattern: 'prisma\s+migrate\s+reset'
    message: "`prisma migrate reset` is destructive and AI-blocked in Forge. Ask the user before running it; never bypass via scripts."
  - pattern: '\$queryRaw\s*`[^`]*\$\{'
    message: "Don't string-interpolate user input into $queryRaw. Use Prisma.sql with parameters: `Prisma.sql\\`SELECT * WHERE x = ${value}\\``."
---

# Prisma 6

> **Prisma 6** — schema + client patterns:
>
> 1. **Migrations**: `prisma migrate dev --name <description>`. Check the generated SQL into git.
>
> 2. **UUID PKs** (NOT autoincrement):
>    ✅ `id String @id @default(uuid()) @db.Uuid`
>    ❌ `id Int @id @default(autoincrement())`
>
> 3. **Snake-case columns** via `@map`:
>    ✅ `createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)`
>    ❌ `createdAt DateTime @default(now())` (would create camelCase column)
>
> 4. **Transactions**: `await prisma.$transaction(async (tx) => { ... })` — use `tx` inside, not `prisma`.
>
> 5. **JSON columns** cast at the boundary:
>    ✅ `const data = row.payload as unknown as { foo: string }`
>
> 6. **Avoid `$queryRaw`**; if used, parameterize via `` Prisma.sql`...` `` — never string-concatenate user input.

## Curated docs

- [Schema reference](/orm/reference/prisma-schema-reference): Full schema syntax — model, field, attributes.
- [Datasource configuration](/orm/reference/prisma-schema-reference#datasource): Database URL, env vars, multiple datasources.
- [Relations](/orm/prisma-schema/data-model/relations): 1:1, 1:M, M:M with code examples.
- [Indexes](/orm/prisma-schema/data-model/indexes): @@index, @@unique, partial/conditional indexes.
- [Migrate workflow](/orm/prisma-migrate/workflows/development-and-production): When to use migrate dev vs deploy.
- [Client API](/orm/reference/prisma-client-reference): findMany, findUnique, create, update, upsert, $transaction.
- [Filtering with `where`](/orm/prisma-client/queries/filtering-and-sorting): Operators, AND/OR/NOT, nested filters.
- [Pagination](/orm/prisma-client/queries/pagination): Offset vs cursor pagination.
- [Working with JSON](/orm/prisma-client/special-fields-and-types/working-with-json-fields): Type narrowing, nested-key queries.
- [Raw queries](/orm/prisma-client/queries/raw-database-access/raw-queries): Safe parameterized SQL.
- [Transactions](/orm/prisma-client/queries/transactions): Interactive transactions, nested writes.
- [Generated types](/orm/prisma-client/type-safety/operating-against-partial-structures): Prisma.UserCreateInput, etc.
- [Prisma llms.txt](https://www.prisma.io/llms.txt): Upstream's curated index — fetch when you need something not in the list above.
- [Prisma llms-full.txt](https://www.prisma.io/docs/llms-full.txt): Upstream's full content concatenated — heavyweight; use only when llms.txt doesn't have the topic.
