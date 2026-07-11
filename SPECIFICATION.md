# Personal Website — Specification

## 1. Overview

A personal website that serves as the single, up-to-date home for the owner's
professional identity: who they are, their career/academic trajectory, their
research projects, their publications, and a blog.

**Guiding principle:** content is authored as **plain Markdown files**. Adding a
new blog post or research project means adding one Markdown file to a folder and
pushing to Git — no code changes, no database, no CMS. The site rebuilds and
deploys automatically.

**Owner:** Vinicius Almeida

**Contact / social links** *(shown in footer; confirm handles/URLs):* email
(vinicius.almeida@spesia.com.br), GitHub, ORCID, Google Scholar, LinkedIn.

---

## 2. Goals & Non-Goals

### Goals
- Publish new content by adding a single Markdown file (blog post or research project).
- Present an always-current, professional public profile.
- Fast, accessible, mobile-friendly, works without heavy JavaScript.
- Zero-cost hosting with automatic deploys on `git push`.
- Easy to maintain solo over years.

### Non-Goals (initial version)
- User accounts, authentication, or comments.
- A database or server-side backend.
- An admin/CMS UI (Markdown-in-Git *is* the CMS).
- E-commerce, newsletters, or analytics-heavy tracking (may be added later).

---

## 3. Tech Stack

| Concern | Choice |
|---|---|
| Framework | **Astro** (static output) |
| Content | Markdown / MDX via Astro **Content Collections** |
| Styling | **Tailwind CSS** (via `@astrojs/tailwind`) |
| Hosting | **GitHub Pages** |
| CI/CD | **GitHub Actions** (build + deploy on push to `main`) |
| Language | TypeScript for config/components |

**Why Astro:** first-class Markdown content collections with typed frontmatter
schemas, ships minimal/zero JS by default, fast builds, simple theming.

---

## 4. Site Structure & Pages

| Route | Purpose | Source |
|---|---|---|
| `/` | Home / landing — short intro, latest posts, featured projects, links | `src/pages/index.astro` |
| `/about` | Bio + trajectory timeline (education, roles, milestones) | `src/pages/about.astro` (+ optional data file) |
| `/research` | Index of research projects (cards, filter by tag) | generated from `research` collection |
| `/research/[slug]` | Individual research project page | one Markdown file per project |
| `/blog` | Blog index / archive (reverse-chronological, tag filter) | generated from `blog` collection |
| `/blog/[slug]` | Individual blog post | one Markdown file per post |
| `/publications` | Structured list of papers & talks (with links / citation) | `publications` collection or a data file |
| `/404` | Not-found page | `src/pages/404.astro` |

Global elements: header nav (Home · About · Research · Publications · Blog),
footer with social/contact links (email, GitHub, ORCID, Google Scholar, LinkedIn).

---

## 5. Content Model (Markdown Frontmatter)

Content collections are defined and **schema-validated** in
`src/content/config.ts`, so a malformed file fails the build early with a clear
error.

### 5.1 Blog post — `src/content/blog/<slug>.md`
```yaml
---
title: "Post title"
description: "One-line summary for previews and SEO"
pubDate: 2026-07-11          # required, drives ordering
updatedDate: 2026-07-12      # optional
tags: ["nlp", "notes"]       # optional
draft: false                 # optional; drafts excluded from production build
heroImage: "./cover.png"     # optional
---

Markdown body…
```

### 5.2 Research project — `src/content/research/<slug>.md`
```yaml
---
title: "Project name"
summary: "Short description shown on the index cards"
startDate: 2025-01-01        # required
endDate: 2026-03-01          # optional; omit = ongoing
status: "ongoing"            # ongoing | completed | paused
tags: ["healthcare", "llm"]
featured: true               # optional; surfaces on the home page
links:                       # optional
  - { label: "Paper", url: "https://…" }
  - { label: "Code", url: "https://github.com/…" }
heroImage: "./diagram.png"   # optional
---

Full project write-up in Markdown…
```

### 5.3 Publication — `src/content/publications/<slug>.md` *(or a single YAML/JSON list)*
```yaml
---
title: "Paper title"
authors: ["V. Almeida", "…"]
venue: "Conference / Journal name"
year: 2026
type: "paper"                # paper | preprint | talk | poster
doi: "10.xxxx/xxxxx"         # optional
pdf: "https://…"             # optional
url: "https://…"             # optional
bibtex: "@article{…}"        # optional
---
```

Publications are authored as **one Markdown file per entry**, consistent with the
blog and research collections.

---

## 6. Authoring Workflow ("just add a Markdown file")

1. Create a new `.md` file in the relevant `src/content/<collection>/` folder.
2. Fill in the frontmatter (copy from a template — see §9).
3. Commit and push to `main`.
4. GitHub Actions builds the site and deploys to GitHub Pages automatically.
5. New page + index entry appear live in ~1–2 minutes.

Images for a post/project live alongside it (co-located) and are referenced with
relative paths; Astro optimizes them at build time.

---

## 7. Design & UX

- Clean, minimal, content-first; readable typography and generous spacing.
- **Responsive** (mobile → desktop).
- **Light/dark mode** respecting system preference, with a manual toggle.
- Accessible: semantic HTML, keyboard navigable, sufficient contrast, alt text.
- Tag-based filtering on the blog and research indexes.
- Reverse-chronological ordering for blog; research sortable by date/status.

---

## 8. Cross-Cutting Requirements

- **SEO:** per-page `<title>`/meta description, Open Graph + Twitter cards,
  `sitemap.xml`, `robots.txt`, canonical URLs.
- **RSS feed** for the blog at `/rss.xml`.
- **Performance:** static HTML, optimized images, near-zero client JS; target
  Lighthouse ≥ 95 across categories.
- **Analytics:** none.
- **Custom domain:** **valmeida.com** — served via `public/CNAME`, DNS pointed at
  GitHub Pages, HTTPS enforced. `astro.config.mjs` `site: "https://valmeida.com"`
  and no `base` subpath needed.
- **Language:** English only.

---

## 9. Repository Layout

```
personal-web-page/
├─ .github/workflows/deploy.yml    # build + deploy to GitHub Pages
├─ astro.config.mjs                # site URL, integrations (sitemap, mdx, rss)
├─ package.json
├─ tsconfig.json
├─ public/                         # static assets (favicon, CNAME, robots.txt)
├─ src/
│  ├─ content/
│  │  ├─ config.ts                 # collection schemas (validation)
│  │  ├─ blog/                     # blog posts (.md)
│  │  ├─ research/                 # research projects (.md)
│  │  └─ publications/             # publications (.md)
│  ├─ components/                  # Header, Footer, Card, TagList, ThemeToggle…
│  ├─ layouts/                     # BaseLayout, PostLayout, ProjectLayout
│  └─ pages/                       # index, about, research, blog, publications, 404
├─ templates/                      # copy-paste frontmatter starters for new content
└─ README.md                       # how to add content + run locally
```

---

## 10. Deployment (GitHub Pages)

- GitHub Actions workflow triggers on push to `main`.
- Steps: checkout → install → `astro build` → upload artifact → deploy to Pages.
- `astro.config.mjs` sets `site: "https://valmeida.com"` (no `base` subpath).
- Custom domain **valmeida.com** via `public/CNAME`; configure DNS (A/ALIAS or
  CNAME records) to point at GitHub Pages; HTTPS enforced.

---

## 11. Milestones

1. **Scaffold** — Astro project, base layout, header/footer, deploy pipeline live.
2. **Blog** — collection + schema, index, post page, RSS, tags.
3. **Research** — collection + schema, index with filtering, project page.
4. **About & Publications** — trajectory timeline, publications list.
5. **Polish** — dark mode, SEO, images, accessibility, performance pass.
6. **Content migration** — add real posts/projects; wire custom domain.

---

## 12. Decisions Log

| Question | Decision |
|---|---|
| Display name | Vinicius Almeida |
| Custom domain | valmeida.com |
| Publications format | One Markdown file per entry |
| Styling | Tailwind CSS |
| Analytics | None |
| Language | English only |

### Still to confirm
1. Exact social/contact URLs (GitHub, ORCID, Google Scholar, LinkedIn handles).
2. Which links appear in the footer vs. the About page.
