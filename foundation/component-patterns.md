---
id: component-patterns
name: Component Patterns
version: 0.1.0
loadMode: always
---

# Component Patterns

> **Patterns** — the canonical shapes for common UI tasks. Match these when building similar things.
> 1. **List page** — query → `isLoading` skeleton → `error` fallback → empty state → render. Always render all four states explicitly. Don't return `null` for loading.
> 2. **Form** — controlled inputs, validate with a zod schema, submit handler returns a Promise, disable submit while pending, show inline error on fail. Reset only on success.
> 3. **Dialog / modal** — controlled `open` prop + `onOpenChange` callback. Trap focus when open. Restore focus to the trigger on close. Esc closes.
> 4. **Async button** — disable + spinner while in flight. Don't let the user double-click. Re-enable in `finally`.
> 5. **Composition over configuration** — prefer `<Card><Card.Header>...</Card.Header></Card>` over `<Card title="..." headerAction={...} />`. Small props beat large config objects.
> 6. **Hooks ownership** — one hook owns one piece of state. If two hooks need the same state, lift it to the nearest common parent or to context.
> 7. **Boundaries** — `<ErrorBoundary>` around route subtrees, `<Suspense>` around lazy/use() consumers. Don't sprinkle them randomly.
> 8. **Empty state is a feature** — write copy ("No projects yet — create one to get started"), not a blank div.
