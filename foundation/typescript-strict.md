---
id: typescript-strict
name: TypeScript strict
version: "1.0.0"
appliesToWorkerTypes:
  - Frontend
  - Backend
  - DBA
  - QA
appliesToFiles:
  - "**/*.ts"
  - "**/*.tsx"
  - "tsconfig*.json"
docsBaseUrl: https://www.typescriptlang.org/docs/handbook
loadMode: always
---

# TypeScript strict

> **TypeScript strict** — type discipline:
>
> 1. Prefer `unknown` over `any`. `any` opts out of safety.
> 2. Use `satisfies` over `as` when both work — it's narrower.
> 3. Validate at boundaries (network, user input, JSON columns). Internal code trusts.
> 4. Don't `as any` to silence errors. `as unknown as Foo` is the escape hatch; prefer fixing the type.
> 5. Prefer narrow unions over broad strings: `"open" | "closed"` not `string`.
> 6. `readonly` on arrays/props you don't mutate.

## Curated docs

- [Strictness flags](/2/basic-types.html#strictness): What `strict: true` actually enables.
- [Narrowing](/2/narrowing.html): Type guards, discriminated unions, the narrowing model.
- [Utility types](/2/utility-types.html): `Pick`, `Omit`, `Partial`, `ReturnType`, etc.
- [`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator): Why it's better than `as` for type narrowing.
- [`unknown` vs `any`](/2/everyday-types.html#unknown): Type-safe escape hatch.
