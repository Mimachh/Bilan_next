import { z } from "zod";

export const RefreshSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(60, {
      message: "Name is too long",
    }),
    value: z.number(),
});
