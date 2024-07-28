import { z } from "zod";
import { CategorySchema } from "./category-schema";
import { RefreshSchema } from "./refresh-schema";
import { SourceSchema } from "./source";

export const StatisticSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(1).max(60),
    slug: z.string().optional(),
    stat_reference_previous_year: z.number(),
    isActive: z.boolean().default(true),
    isPrice: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    comment: z.string().optional(),
    // sources: z.array(SourceSchema),
    // createdAt: z.string().optional(),

    // refresh: RefreshSchema.optional(),
    categoryId: z.number(),
    // category: CategorySchema.optional(),
    isStatic: z.boolean().default(false),

    refreshId: z.number().optional(),

    has_starting_stat_to_add: z.boolean().default(false),
    starting_stat_to_add: z.number().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.has_starting_stat_to_add === true && !val.starting_stat_to_add) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Starting stat to add is required",
        path: ["starting_stat_to_add"],
      });
    }
  });

export const StatAndSourceSchema = z.object({
  id: z.number().optional(),
  sources: z.optional(z.array(SourceSchema)),
});
