import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const localeCopy = z.object({
  title: z.string().min(3),
  subtitle: z.string().min(8).optional(),
  strapline: z.string().min(12),
  context: z.string().min(20),
  problem: z.string().min(20),
  system: z.string().min(20),
  contribution: z.string().min(20),
  impact: z.string().min(20),
  technical: z.string().min(20).optional(),
  confidentiality: z.string().min(12),
});

const projectSchema = z.object({
  code: z.string().regex(/^(P|L)\d{3}$/),
  order: z.number().int().positive(),
  period: z.object({ es: z.string(), en: z.string() }),
  level: z.enum(["featured", "project", "lab"]),
  status: z.object({ es: z.string(), en: z.string() }),
  architecture: z.object({
    es: z.array(z.string()).min(3),
    en: z.array(z.string()).min(3),
  }),
  media: z
    .object({
      src: z.string().startsWith("/"),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      alt: z.object({ es: z.string().min(12), en: z.string().min(12) }),
      caption: z.object({ es: z.string().min(12), en: z.string().min(12) }),
    })
    .optional(),
  copy: z.object({ es: localeCopy, en: localeCopy }),
});

export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
    schema: projectSchema,
  }),
  lab: defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/lab" }),
    schema: projectSchema,
  }),
};
