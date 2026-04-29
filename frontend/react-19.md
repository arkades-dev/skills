---
id: react-19
name: React 19
version: "1.0.0"
appliesToWorkerTypes:
  - Frontend
appliesToFiles:
  - "**/*.tsx"
  - "**/*.jsx"
docsBaseUrl: https://react.dev/reference/react
---

# React 19

> **React 19** introduces new primitives. Models trained on v17/v18
> reflexively generate older patterns — override these defaults:
>
> 1. **`forwardRef` is no longer required.** Pass `ref` as a regular
>    prop on function components:
>    ```tsx
>    function Input({ ref, ...rest }) {
>      return <input ref={ref} {...rest} />
>    }
>    ```
> 2. **Prefer `use(promise)` inside `<Suspense>`** over `useEffect +
>    useState` for one-shot async data.
> 3. **`useFormState` was renamed to `useActionState`.** `useFormStatus`
>    reads pending state inside an action.
> 4. **`useOptimistic`** for optimistic UI on async mutations.
> 5. **Server Components are NOT applicable in Vite SPAs.** Don't
>    generate `"use client"` / `"use server"` directives or RSC patterns.
>    Vite is purely client-side.
> 6. **`React.FC<Props>` is discouraged.** Use plain function components
>    with a typed props parameter.

## Curated docs

- [`use`](/use): Read promises and contexts inside render.
- [`useTransition`](/useTransition): Non-blocking state updates.
- [`useOptimistic`](/useOptimistic): Optimistic UI for async mutations.
- [`useActionState`](/useActionState): Replaces useFormState.
- [`useFormStatus`](/useFormStatus): Read pending state inside an action.
- [Hooks reference](/hooks): Full hooks index.
