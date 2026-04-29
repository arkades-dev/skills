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
forgeNotes: |
  AI-driven destructive ops (`migrate reset`, `db push --force-reset`) are
  blocked unless `PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION` is set with
  the exact consent string — ask the user before running these. After
  `prisma generate`, restart the API + worker processes to pick up new
  client types (Bun --hot doesn't refresh node_modules).
---

# Prisma 6

> **Prisma 6** ORM patterns.
>
> 1. **Migrations**: `prisma migrate dev --name <description>`. Check the
>    generated SQL into git.
> 2. **UUID primary keys**: `@id @default(uuid()) @db.Uuid`. Snake-case
>    columns via `@map("...")`.
> 3. **JSON columns**: `Json` type in schema; cast at the TS boundary:
>    ```ts
>    const data = row.payload as unknown as { foo: string }
>    ```
> 4. **Transactions**: `await prisma.$transaction(async (tx) => { ... })`.
>    Use `tx` inside, not `prisma`.
> 5. **Timestamps**: `DateTime @db.Timestamptz(6)` for time-with-zone.
> 6. **Soft deletes**: add `deletedAt DateTime?` and remember to filter
>    on it (no built-in).
> 7. **Avoid `$queryRaw`** unless absolutely necessary; if used,
>    parameterize via `` Prisma.sql`...` `` — never string-concatenate
>    user input.

## Curated docs

- [Schema reference](/orm/reference/prisma-schema-reference): Full schema syntax.
- [Migrate workflow](/orm/prisma-migrate/workflows/development-and-production): When to use migrate dev vs deploy.
- [Client API](/orm/reference/prisma-client-reference): findMany, findUnique, create, update, upsert, $transaction.
- [Working with JSON](/orm/prisma-client/special-fields-and-types/working-with-json-fields): Type narrowing, nested-key queries.
- [Raw queries](/orm/prisma-client/queries/raw-database-access/raw-queries): Safe parameterized SQL.
- [Transactions](/orm/prisma-client/queries/transactions): Interactive transactions, nested writes.
