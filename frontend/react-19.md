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
loadMode: lazy
enforcementRules:
  - pattern: 'forwardRef\s*[<(]'
    message: "React 19 uses ref-as-prop. Rewrite without forwardRef — pass `ref` as a regular prop on the function component."
  - pattern: '\buseFormState\b'
    message: "useFormState was renamed to useActionState in React 19. Update the import and the call."
  - pattern: '^\s*["'']use (client|server)["'']'
    message: "Server Components don't apply in Vite SPAs. Remove the directive — Vite is purely client-side."
---

# React 19

> **React 19** — override v17/v18 reflexes:
>
> 1. **ref-as-prop** (NOT forwardRef):
>    ✅ `function Input({ ref, ...rest }) { return <input ref={ref} {...rest} /> }`
>    ❌ `const Input = forwardRef((props, ref) => <input ref={ref} {...props} />)`
>
> 2. **`use(promise)` in `<Suspense>`** (NOT useEffect for one-shot async):
>    ✅ `const data = use(fetchPromise)` inside Suspense
>    ❌ `useEffect(() => { fetch(...).then(setData) }, [])`
>
> 3. **`useActionState`** (NOT `useFormState` — renamed). `useFormStatus` for pending state.
>
> 4. **NO `"use client"` / `"use server"`** in Vite SPAs — Server Components don't apply.
>
> 5. **Plain function components** (NOT `React.FC<Props>`).

## Curated docs

- [`use`](/use): Read promises and contexts inside render.
- [`useTransition`](/useTransition): Non-blocking state updates.
- [`useOptimistic`](/useOptimistic): Optimistic UI for async mutations.
- [`useActionState`](/useActionState): Replaces useFormState.
- [`useFormStatus`](/useFormStatus): Read pending state inside an action.
- [`useEffect` vs `use`](/useEffect): When you still need useEffect (subscriptions, cleanup) vs prefer use().
- [`startTransition`](/startTransition): Mark updates as non-urgent without the hook.
- [Components reference](/components): Built-in components — Suspense, Fragment, ErrorBoundary, etc.
- [Hooks reference](/hooks): Full hooks index.
- [React 19 release notes](https://react.dev/blog/2024/12/05/react-19): Migration notes — official rundown of what changed from 18 → 19.
- [Full reference index](https://react.dev/reference/react): Upstream's complete docs (no llms.txt at react.dev) — start here when the curated list above doesn't cover it.
