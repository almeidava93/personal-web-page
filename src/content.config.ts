import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blog posts — one Markdown/MDX file per post in src/content/blog/
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      heroImage: image().optional(),
    }),
});

// Research projects — one Markdown/MDX file per project in src/content/research/
const research = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/research" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      status: z.enum(["ongoing", "completed", "paused"]).default("ongoing"),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
      heroImage: image().optional(),
    }),
});

// Publications — one Markdown/MDX file per entry in src/content/publications/
const publications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number().int(),
    type: z
      .enum([
        "paper",
        "preprint",
        "talk",
        "poster",
        "registration",
        "chapter",
        "workshop",
        "editorial",
      ])
      .default("paper"),
    featured: z.boolean().default(false),
    doi: z.string().optional(),
    pdf: z.string().url().optional(),
    url: z.string().url().optional(),
    bibtex: z.string().optional(),
  }),
});

export const collections = { blog, research, publications };
