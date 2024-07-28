import { z } from "zod";

export const SourceSchema = z.object({
    id: z.number().optional(),
    url: z.string().optional(),
    name: z.string().max(255),
    description: z.string().max(255).optional(),
    statistiqueId: z.number(),
});