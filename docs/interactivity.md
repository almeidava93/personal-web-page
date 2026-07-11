# Adding interactivity to pages and blog posts

This site is **static by default**: every page ships as plain HTML with no
JavaScript. Interactivity is opt-in, added only to the specific parts that need
it. Astro calls these interactive parts **islands** — the rest of the page stays
static and fast, and only the island loads JS.

> This file lives in `docs/` (a repo-root folder outside `src/`), so it is
> documentation only and never published to the website.

There are three levels of interactivity, from cheapest to most powerful. Reach
for the simplest one that does the job.

---

## Level 1 — Plain `<script>` (zero setup, already works)

Any `.astro` page or component can include a `<script>` tag. Astro bundles,
optimizes, and ships it to the browser. No dependencies, no configuration.

Good for: toggles, copy-to-clipboard buttons, small canvas/SVG widgets,
accordions, anything a bit of vanilla JS (or a small standalone library) can do.

**Live example already in this repo:** the light/dark theme toggle,
[`src/components/ThemeToggle.astro`](../src/components/ThemeToggle.astro) — a
button plus a `<script>` that flips a class and stores the choice.

Minimal pattern:

```astro
---
// src/components/Counter.astro
---
<button id="inc" type="button">Clicked <span id="n">0</span> times</button>

<script>
  let n = 0;
  const out = document.getElementById("n");
  document.getElementById("inc")?.addEventListener("click", () => {
    out.textContent = String(++n);
  });
</script>
```

Drop `<Counter />` into any `.astro` page and it works.

---

## Level 2 — Interactive components inside blog posts (via MDX)

`@astrojs/mdx` is already installed and configured. Plain **`.md` files cannot
import components**, but **`.mdx` files can**. Both extensions load into the same
content collections (the loader glob is `**/*.{md,mdx}`), so switching is just a
rename — no config change, no schema change.

To embed a widget in a post, rename it `.md` → `.mdx` and import:

```mdx
---
title: "A post with a live demo"
description: "Showing an interactive widget inline."
pubDate: 2026-07-11
tags: ["demo"]
---

Here's some explanation text, then an interactive widget:

import Counter from "@/components/Counter.astro";

<Counter />

...and the prose continues normally after it.
```

Notes:
- The frontmatter is identical to a `.md` post — the same schema applies.
- Put `import` statements below the frontmatter, anywhere before first use.
- Use this for the `blog`, `research`, or any other collection equally.

---

## Level 3 — Stateful UI-framework components (React, Svelte, Vue, …)

For richer widgets — stateful forms, data explorers, interactive charts,
anything with real component state — add a UI framework. This is a one-time
setup command:

```bash
npx astro add react     # or: svelte, vue, preact, solid
```

That installs the integration and updates `astro.config.mjs` automatically. Then
write a normal component (e.g. `src/components/Chart.jsx`) and use it in an
`.astro` page or an `.mdx` post with a **client directive** that controls *when*
the JavaScript hydrates:

```mdx
import Chart from "@/components/Chart.jsx";

<Chart client:visible />
```

### Client directives (when the island's JS loads)

| Directive        | Loads when…                                    | Use for |
|------------------|------------------------------------------------|---------|
| `client:load`    | immediately on page load                        | above-the-fold, needed right away |
| `client:idle`    | browser is idle after load                      | not urgent, but soon |
| `client:visible` | the component scrolls into view                 | heavy widgets lower on the page |
| `client:media`   | a CSS media query matches (e.g. desktop only)   | responsive-only interactivity |
| `client:only`    | client-side only, skip server render            | components that can't render on the server |

A component **without** a `client:*` directive is rendered to static HTML at
build time and ships **no JavaScript** — the default.

---

## Choosing a level

- **Small, self-contained behavior?** → Level 1 (`<script>`). No dependencies.
- **Embedding a widget in written content?** → Level 2 (rename post to `.mdx`).
- **Genuine component state / a charting or UI library?** → Level 3 (framework
  + `client:*`).

## Why this matters

Each interactive island loads its JavaScript independently. A heavy chart at the
bottom of a post marked `client:visible` costs the reader nothing until they
scroll to it, and a page with no islands ships no framework JS at all. That is
what keeps the site fast while still allowing interactivity wherever it earns its
place.

## References

- Astro islands: https://docs.astro.build/en/concepts/islands/
- Client directives: https://docs.astro.build/en/reference/directives-reference/#client-directives
- MDX: https://docs.astro.build/en/guides/integrations-guide/mdx/
- Adding UI frameworks: https://docs.astro.build/en/guides/framework-components/
