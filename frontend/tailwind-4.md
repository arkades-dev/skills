---
id: tailwind-4
name: Tailwind CSS 4
version: "1.0.0"
appliesToWorkerTypes:
  - Frontend
appliesToFiles:
  - "**/*.tsx"
  - "**/*.css"
  - "vite.config.ts"
docsBaseUrl: https://tailwindcss.com/docs
llmsTxtUrl: https://tailwindcss.com/llms.txt
cacheTtlHours: 24
loadMode: lazy
---

# Tailwind CSS 4

> **Tailwind 4** is a breaking release from v3, and models trained on
> v3 examples reflexively generate v3 patterns. Override these defaults:
>
> 1. **NO `tailwind.config.js`.** Config moved to CSS:
>    ```css
>    @theme {
>      --color-primary: oklch(70% 0.15 145);
>      --font-sans: "Inter", sans-serif;
>    }
>    ```
> 2. **Single import**: `@import "tailwindcss";` — NOT the v3 trio of
>    base/components/utilities imports.
> 3. **`@apply` was REMOVED.** Use utility classes directly in JSX, or
>    extract into components. Don't generate `@apply` directives.
> 4. **Use `@tailwindcss/vite` plugin** (already wired in the default
>    scaffold). NOT PostCSS + Autoprefixer + tailwindcss as separate steps.
> 5. **Dark mode**: toggle `.dark` class on `<html>`. Use `dark:` variants
>    in classes (`bg-white dark:bg-zinc-900`).

## Curated docs

- [Theme](/theme): Configure design tokens via the @theme CSS block.
- [Functions and directives](/functions-and-directives): @theme, @import, @utility, @custom-variant — the new authoring API.
- [Upgrade guide](/upgrade-guide): Differences from v3 — what was removed, what was renamed.
- [Dark mode](/dark-mode): Class-based vs media-query-based.
- [Adding custom styles](/adding-custom-styles): @utility vs @layer in v4.

## Upstream

- [Tailwind 4 llms.txt](https://tailwindcss.com/llms.txt): The full upstream index for deeper exploration.
