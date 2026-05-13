---
id: presentation
name: Presentations & decks
version: 0.1.0
appliesToWorkerTypes: [Designer, Frontend]
appliesToFiles: ["**/deck/**", "**/slides/**", "**/presentation/**", "**/index.html"]
loadMode: lazy
---

# Presentations

> **Building decks in Forge.** Use the `<deck-stage>` web component as the canonical container. Each slide is one `<section>` child. Authored at design size 1920×1080; deck-stage handles scaling, navigation, and print.
> 1. **Container.** Wrap slides in `<deck-stage width="1920" height="1080">`. Each direct child `<section data-label="...">` is a slide.
> 2. **Design size.** Author every slide at exactly 1920×1080 (CSS pixels). deck-stage scales with `transform: scale()` to fit the viewport — letterboxed, not stretched.
> 3. **Typography.** ≤3 weights per deck. Display headings 120-360px. Tagline 48-72px. Body 24-32px. Meta 16-20px. Use `letter-spacing: -0.04em` for display sizes.
> 4. **Color.** Pick a palette: a canvas (e.g. `#0A0A0A`) + a foreground (`#F5F5F5`) + ONE accent. Use the accent on ≤1 word per slide. No random hex values.
> 5. **Layout primitives.** Title (centered hero), big-stat (one figure dominant), content (heading + 2-4 bullets), two-column (text + media), comparison matrix.
> 6. **Whitespace.** 64-96px padding minimum on slides. Let the canvas breathe.
> 7. **Real content.** Specific numbers ("847 projects in 30 days"), real names, sharp headlines. No "Lorem ipsum", no "Click here".
> 8. **Self-contained slides.** Inline `<style>` per slide is fine — keeps each slide independent. Shared concerns (font import, CSS reset) belong in the parent `index.html`.

## Slide structure

```html
<section data-label="Slide name" class="slide slide--{primitive}">
  <!-- semantic content -->
  <style>
    .slide--{primitive} {
      width: 100%;
      height: 100%;
      background: #0A0A0A;
      color: #F5F5F5;
      font-family: 'Geist', system-ui, sans-serif;
      box-sizing: border-box;
      padding: 96px;
      /* ... */
    }
  </style>
</section>
```

## The deck-stage component

`deck-stage.js` is a web component (~620 lines) that provides:

- Auto-scaling (transform-based, letterboxed) — slides stay at design size, viewport adapts
- Keyboard nav (←/→, PgUp/PgDn, Space, Home/End, R to reset, 0-9 jump)
- Touch zones on mobile (left third = back, right third = forward)
- Print support (one slide per page via `@media print` — works with browser Save-as-PDF)
- localStorage persistence of slide index
- `slidechange` CustomEvent for slide-aware logic

Usage in `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Deck title</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1/dist/fonts.css" />
  </head>
  <body>
    <deck-stage width="1920" height="1080">
      <section data-label="Title">...</section>
      <section data-label="Problem">...</section>
      <!-- ... 8 more slides -->
    </deck-stage>
    <script src="./deck-stage.js"></script>
  </body>
</html>
```

If the project doesn't already include `deck-stage.js`, copy the canonical implementation (it's standalone, no deps).

## Layout primitives reference

### Title (centered hero)
- Display heading 120-200px, `letter-spacing: -0.04em`, `line-height: 0.95`
- Tagline 48-72px, `line-height: 1.15`
- Optional meta line 16-20px, muted (~55% opacity)
- Padding: 96px
- Use `display: grid; place-items: center;` for vertical centring

### Big-stat
- Single huge figure 240-360px, accent color, `font-feature-settings: 'tnum' 1`
- Context line 32-48px below
- Section label + page number in top chrome (16px, muted, `letter-spacing: 0.12em`, uppercase)
- Use for traction, market size, single key insight

### Content (heading + bullets)
- Section heading 56-72px
- 2-4 bullets max, 28-36px each, `line-height: 1.4`
- Distill to phrases — don't paste paragraphs

### Two-column
- 50/50 or 60/40 split via `grid-template-columns`
- Text one side, media (image, chart, code) the other
- 64-96px gap between columns

### Comparison matrix
- Header row + 3-5 feature rows × 2-3 column comparison
- Bold the "us" column, mute the others
- Check/dash icons, not full text in cells where possible
