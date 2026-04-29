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
enforcementRules:
  - pattern: '@apply\s'
    message: "Tailwind 4 removed `@apply`. Use utility classes directly in JSX, or extract a component."
  - pattern: '@import\s+["'']tailwindcss/(base|components|utilities)["'']'
    message: "Tailwind 4 uses a single `@import \"tailwindcss\";` import — drop the v3 base/components/utilities split."
  - pattern: 'theme\s*:\s*\{\s*extend\s*:'
    message: "Tailwind 4 has no JS config. Move theme tokens into a `@theme {}` CSS block."
---

# Tailwind CSS 4

> **Tailwind 4** — override v3 reflexes:
>
> 1. **CSS-first config** (NOT `tailwind.config.js`):
>    ✅ `@theme { --color-primary: oklch(70% 0.15 145); }` in CSS
>    ❌ `module.exports = { theme: { extend: {} } }` in JS
>
> 2. **Single import** (NOT three v3 imports):
>    ✅ `@import "tailwindcss";`
>    ❌ `@import "tailwindcss/base";` + `/components` + `/utilities`
>
> 3. **Utility classes directly** (NOT `@apply`):
>    ✅ `<div className="bg-zinc-900 p-4">`
>    ❌ `.card { @apply bg-zinc-900 p-4; }`
>
> 4. **`@tailwindcss/vite` plugin** (NOT PostCSS+Autoprefixer).
>
> 5. **Dark mode**: `.dark` on `<html>`, `dark:` variants in classes.

## Curated docs

- [Theme](/theme): Configure design tokens via the @theme CSS block.
- [Functions and directives](/functions-and-directives): @theme, @import, @utility, @custom-variant — the new authoring API.
- [Upgrade guide](/upgrade-guide): Differences from v3 — what was removed, what was renamed.
- [Dark mode](/dark-mode): Class-based vs media-query-based.
- [Adding custom styles](/adding-custom-styles): @utility vs @layer in v4.
- [Responsive design](/responsive-design): Breakpoint variants (sm:, md:, etc.) and arbitrary values.
- [Hover, focus, and other states](/hover-focus-and-other-states): All variant prefixes.
- [Tailwind llms.txt](https://tailwindcss.com/llms.txt): Upstream's curated index — fetch when you need something not in the list above.
