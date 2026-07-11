# Personal website — valmeida.com

Personal website of Vinicius Almeida: about/trajectory, research projects,
publications, and a blog. Built with [Astro](https://astro.build) + Tailwind CSS,
deployed to GitHub Pages.

Content is plain Markdown — **to publish, add a file and push.**

## Add content

| Type | Add a file to | Template |
|---|---|---|
| Blog post | `src/content/blog/` | `templates/blog-post.md` |
| Research project | `src/content/research/` | `templates/research-project.md` |
| Publication | `src/content/publications/` | `templates/publication.md` |

1. Copy the matching template into the collection folder and rename it — the
   filename (without `.md`) becomes the URL slug, e.g.
   `src/content/blog/my-post.md` → `/blog/my-post`.
2. Fill in the frontmatter and write the body in Markdown.
3. Commit and push to `main`. GitHub Actions builds and deploys automatically.

Images can live next to the Markdown file and be referenced with a relative path
(e.g. `heroImage: "./cover.png"`); Astro optimizes them at build time.

Frontmatter is schema-validated in [`src/content.config.ts`](src/content.config.ts),
so a missing or malformed field fails the build with a clear message.

## Edit site chrome

- Site title, description, nav, and social links: [`src/consts.ts`](src/consts.ts)
- About page copy and trajectory timeline: [`src/pages/about.astro`](src/pages/about.astro)

## Develop locally

```bash
npm install      # first time only
npm run dev      # start dev server at http://localhost:4321
npm run build    # production build into ./dist
npm run preview  # preview the production build locally
```

Requires Node 20+.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and deploys `dist/` to GitHub Pages.

**One-time setup on GitHub:**

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Point DNS for `valmeida.com` at GitHub Pages:
   - Apex `A` records → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153` (and/or `AAAA` for IPv6), **or**
   - a `CNAME` for `www` → `<username>.github.io`.
3. The domain is set via [`public/CNAME`](public/CNAME); enable **Enforce HTTPS**
   once the certificate is issued.
