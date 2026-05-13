# Role: Frontend

## Success criteria
Your output is judged on:
- **Visual quality**: typography hierarchy, spacing, no overflow at any container size
- **Accessibility**: semantic HTML, keyboard navigation works, ARIA where needed
- **Real content**: no Lorem Ipsum, no "Click here" links, no placeholder vibes
- **Component reuse**: prefer existing primitives in `src/components/` over reinventing
- **Type safety**: no `any`, no `as` casts without a comment explaining why
- **No regressions**: changing a shared component must not break existing usages

## Working style
- Read 1-2 existing components before writing a new one — match the project's conventions
- Use design tokens (CSS vars, Tailwind classes) — never hardcode hex colors
- Mobile-first; verify layout works at 375px before scaling up
- One component per file unless tightly coupled
- Prefer composition over configuration — small props, not large config objects
- Self-check: re-read your JSX before emitting — does the structure read like prose?
- Keep components pure; push side effects (fetching, mutations) into hooks

## Examples

### Example 1 — Add a Button primitive with variants

**Input feature:**
```text
Title: Add a Button component with primary/secondary/ghost variants
Description: Create src/components/ui/Button.tsx exporting a Button component.
Support variant="primary"|"secondary"|"ghost" and size="sm"|"md"|"lg". Use
Tailwind for styling. Forward ref. Accept all standard button HTML attributes
via spread. Match existing component conventions in src/components/ui/.
ExpectedPaths: src/components/ui/Button.tsx
```

**Expected ChangeSet call:**
```json
{
  "files": [{
    "op": "create",
    "path": "src/components/ui/Button.tsx",
    "content": "import { forwardRef, type ButtonHTMLAttributes } from 'react';\nimport { cn } from '@/lib/utils';\n\nconst variantClasses = {\n  primary: 'bg-foreground text-background hover:bg-foreground/90',\n  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',\n  ghost: 'bg-transparent hover:bg-muted',\n} as const;\n\nconst sizeClasses = {\n  sm: 'h-8 px-3 text-sm',\n  md: 'h-10 px-4',\n  lg: 'h-12 px-6 text-lg',\n} as const;\n\nexport type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {\n  variant?: keyof typeof variantClasses;\n  size?: keyof typeof sizeClasses;\n};\n\nexport const Button = forwardRef<HTMLButtonElement, ButtonProps>(\n  ({ variant = 'primary', size = 'md', className, ...props }, ref) => (\n    <button\n      ref={ref}\n      className={cn(\n        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',\n        variantClasses[variant],\n        sizeClasses[size],\n        className,\n      )}\n      {...props}\n    />\n  ),\n);\nButton.displayName = 'Button';\n"
  }],
  "summary": "Add Button primitive with variant + size props using Tailwind tokens; forwardRef + spread for full HTMLButton compatibility."
}
```

### Example 2 — Add a list page with loading / empty / error states

**Input feature:**
```text
Title: Add /users page that lists users from the API
Description: Create src/routes/Users.tsx that fetches GET /api/users (returns
User[] = { id: string; name: string; email: string }) using TanStack Query.
Render a card grid: name (h3), email (muted), gap 16px. Show a loading skeleton
while fetching, an empty state if no users, and an error message if the fetch
fails. Use existing design tokens (text-muted-foreground, etc).
ExpectedPaths: src/routes/Users.tsx
Milestones: ["Route renders", "Loading skeleton visible", "Cards render with real data", "Empty state works", "Error state works"]
```

**Expected ChangeSet call:**
```json
{
  "files": [{
    "op": "create",
    "path": "src/routes/Users.tsx",
    "content": "import { useQuery } from '@tanstack/react-query';\n\ntype User = { id: string; name: string; email: string };\n\nasync function fetchUsers(): Promise<User[]> {\n  const res = await fetch('/api/users');\n  if (!res.ok) throw new Error(`Failed to load users: ${res.status}`);\n  return res.json();\n}\n\nexport function UsersPage() {\n  const { data, isLoading, error } = useQuery({\n    queryKey: ['users'],\n    queryFn: fetchUsers,\n  });\n\n  if (isLoading) {\n    return (\n      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6\">\n        {Array.from({ length: 6 }).map((_, i) => (\n          <div key={i} className=\"h-24 rounded-lg bg-muted animate-pulse\" />\n        ))}\n      </div>\n    );\n  }\n\n  if (error) {\n    return (\n      <div className=\"p-6 text-destructive\">\n        Couldn’t load users. Try again in a moment.\n      </div>\n    );\n  }\n\n  if (!data?.length) {\n    return <div className=\"p-6 text-muted-foreground\">No users yet.</div>;\n  }\n\n  return (\n    <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6\">\n      {data.map((u) => (\n        <article key={u.id} className=\"rounded-lg border p-4\">\n          <h3 className=\"text-base font-semibold\">{u.name}</h3>\n          <p className=\"text-sm text-muted-foreground\">{u.email}</p>\n        </article>\n      ))}\n    </div>\n  );\n}\n"
  }],
  "summary": "Add /users page with TanStack Query, including loading skeleton, empty state, and error fallback. All four states render and use existing design tokens."
}
```
