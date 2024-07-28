"use server"
import { db } from "@/lib/db";
import { generateSlugFromCategoryName } from "@/lib/generate-slug";
import { RefreshSchema } from "@/schemas/admin/refresh-schema";
import { RefreshDataTable } from "@/types/refresh";
import { z } from "zod";

export const getRefreshById = async (id: number) => {
  const refresh = await db.refreshCounter.findFirst({
    where: {
      id,
    },
  });

  if (!refresh) return null;
  return refresh;
};

export const deleteRefresh = async (id: number) => {
  const refresh = await db.refreshCounter.findFirst({
    where: { id },
  });

  if (!refresh) return { error: "Refresh not found!" };

  await db.refreshCounter.delete({
    where: { id },
  });

  return { success: "Refresh deleted successfully!" };
};

export const getRefreshesFromAdmin = async (): Promise<
  RefreshDataTable[] | []
> => {
  const refreshes = await db.refreshCounter.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      value: true,
    },
  });

  return refreshes;
};


export const upsertRefresh = async (data: z.infer<typeof RefreshSchema>) => {
  
  const validateData = RefreshSchema.safeParse(data);
  if (!validateData.success) {
    return { error: "Invalid fields!" };
  }

  const slug = await generateSlugFromCategoryName(data.name, "refreshCounter");

  await db.refreshCounter.upsert({
    where: {
      id: data.id ?? 0,
    },
    update: {
      slug,
      ...data
    },
    create: {
      slug,
      ...data
    },
  });

  return { success: "Refresh created successfully!" };
};