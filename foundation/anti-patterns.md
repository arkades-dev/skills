---
id: anti-patterns
name: Anti-patterns
version: 0.1.0
loadMode: always
---

# Anti-patterns

> **Don't do these.** Common mistakes that look fine in review but cause bugs or rot the codebase.
> 1. **`useEffect` for derived state.** If you can compute it from existing state/props, just compute it. `useEffect` + `setState` causes extra renders and stale-closure bugs.
> 2. **Empty `catch (err) {}`.** Silent failures kill debuggability. At minimum `console.error` with context. Better: rethrow or surface to user.
> 3. **`any` to silence the compiler.** If you don't know the type, narrow with `unknown` + type guards. `any` propagates and disables checking everywhere it touches.
> 4. **Inline `style={{...}}` for layout.** Use Tailwind utilities. `style` is for dynamic values only (e.g. `style={{ height: pct + '%' }}`).
> 5. **Prop drilling 3+ levels.** Lift to context, or pass a callback. Don't thread `setSomething` through five intermediate components.
> 6. **Re-implementing existing utilities.** Before writing `cn`, `formatDate`, `debounce` — grep first. They probably exist.
> 7. **Hardcoded colors / spacing.** Use design tokens. `bg-foreground`, not `bg-[#0A0A0A]`. `p-4`, not `padding: 17px`.
> 8. **Mutating state or props directly.** Always immutable updates. `setItems([...items, x])`, not `items.push(x)`.
> 9. **Catching errors just to log them.** If you can't recover, let the boundary handle it. Mid-tree `try/catch` that just `console.error` is worse than nothing.
> 10. **TODO comments without context.** Either fix it now or write WHY it's deferred. `// TODO: fix this` is noise.
