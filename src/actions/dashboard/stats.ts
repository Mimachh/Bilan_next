"use server";

import { db } from "@/lib/db";
import { generateSlugFromCategoryName } from "@/lib/generate-slug";
import { StatisticSchema } from "@/schemas/admin/statistic-schema";
import { StatisticDataTable } from "@/types/statistic";
import { z } from "zod";

export const getStatsFromAdmin = async (): Promise<
  StatisticDataTable[] | []
> => {
  const stats = await db.statistique.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      starting_stat_to_add: true,
      stat_reference_previous_year: true,
      has_starting_stat_to_add: true,
      comment: true,
      refreshId: true,
      categoryId: true,
      createdAt: true,
      isActive: true,
      isPrice: true,
      isFeatured: true,
      isStatic: true,
      category: {
        select: {
          name: true,
        },
      },
      refresh: {
        select: {
          name: true,
        },
      },
    },
  });

  return stats;
};

export const getStatById = async (id: string) => {
  const data = await db.statistique.findFirst({
    where: {
      id,
    },
  });

  if (!data) return null;
  return data;
};

export const upsertStat = async (data: z.infer<typeof StatisticSchema>) => {
  const validateData = StatisticSchema.safeParse(data);
  if (!validateData.success) {
    return { error: "Invalid fields!" };
  }

  const slug = await generateSlugFromCategoryName(data.name, "statistique");

  await db.statistique.upsert({
    where: {
      id: data.id ?? "undefined",
    },
    update: {
      slug,
      ...data,
    },
    create: {
      slug,
      ...data,
    },
  });

  return { success: "Stat created or updated successfully!" };
};

export const deleteStat = async (id: string) => {
  const existingStat = await db.statistique.findFirst({
    where: {
      id,
    },
  });
  if(!existingStat) return { error: "Stat not found!" };
  
  await db.statistique.delete({
    where: {
      id,
    },
  });

  return { success: "Stat deleted successfully!" };
}