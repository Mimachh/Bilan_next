"use server"

import { db } from "@/lib/db";
import { SourceSchema } from "@/schemas/admin/source";
import { StatAndSourceSchema } from "@/schemas/admin/statistic-schema";
import { z } from "zod";

export const getSourcesByStatId = async (id: number) => {
    const existingStat = await db.statistique.findFirst({
        where: {
            id,
        },
    });
    if (!existingStat) return [];

    const sources = await db.source.findMany({
        where: {
            statistiqueId: id,
        },
        orderBy: {
            createdAt: "asc",
        }
    });

    return sources;
}

export const upsertSources = async (data: z.infer<typeof StatAndSourceSchema>) => {
  
    const validateData = StatAndSourceSchema.safeParse(data);
    if (!validateData.success) {
      return { error: "Invalid fields!" };
    }
  
 
    const existingSources = await db.source.findMany({
        where: {
            statistiqueId: data.id,
        },
    })

    // les existingSources dont l'id n'est pas dans data.sources doivent être supprimées.
    for (const source of existingSources) {
        if (data.sources && !data.sources.find((s) => s.id === source.id)) {
            await db.source.delete({
                where: {
                    id: source.id,
                },
            });
        }
    }


    if (data.sources && data.sources?.length > 0) {
        for (const source of data.sources) {
          await db.source.upsert({
            where: {
              id: source.id ?? 0,
            },
            update: {
              name: source.name,
              statistiqueId: source.statistiqueId,
              url: source.url,
              description: source.description,
            },
            create: {
              name: source.name,
              statistiqueId: source.statistiqueId,
              url: source.url,
              description: source.description,
            },
          });
        }
      }
  
    return { success: "Source created successfully!" };
  };