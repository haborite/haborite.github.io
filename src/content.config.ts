import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // One folder per post: src/content/blog/<slug>/index.md (+ images next to it)
  loader: glob({ base: './src/content/blog', pattern: '**/index.{md,mdx}', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      draft: z.boolean().default(false),
      // Migration metadata from the old WordPress blog (blog.haborite.com)
      wordpressId: z.number().optional(),
      legacyComments: z
        .array(
          z.object({
            id: z.number(),
            parent: z.number().optional(),
            author: z.string(),
            date: z.coerce.date(),
            body: z.string(),
          }),
        )
        .optional(),
    }),
});

export const collections = { blog };
