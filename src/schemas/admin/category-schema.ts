import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(60, {
      message: "Name is too long",
    }),

  description: z
    .string()
    .max(160, {
      message: "Description is too long",
    })
    .optional(),

  titleSeo: z.string().optional(),
  descriptionSeo: z.string().optional(),
  keywordsSeo: z.string().optional(),

  isActive: z.boolean(),
  isFeatured: z.boolean(),
});
