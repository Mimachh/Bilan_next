"use server";

import { db } from "@/lib/db";
import { generateSlugFromCategoryName } from "@/lib/generate-slug";
import { CategorySchema } from "@/schemas/admin/category-schema";
import { CategoryDataTable } from "@/types/category";
import { z } from "zod";

export const getCategoriesFromAdmin = async (): Promise<
  CategoryDataTable[] | []
> => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      name: true,
      slug: true,
      isActive: true,
      isFeatured: true,
      description: true,
      titleSeo: true,
      descriptionSeo: true,
      keywordsSeo: true,
    },
  });

  return categories;
};

export const getCategoryById = async (
  id: string
): Promise<CategoryDataTable | null> => {
  const category = await db.category.findFirst({
    where: {
      id,
    },
  });

  if (!category) return null;

  return category;
};


export const createCategory = async (data: z.infer<typeof CategorySchema>) => {
  
  const validateData = CategorySchema.safeParse(data);
  if (!validateData.success) {
    return { error: "Invalid fields!" };
  }

  const slug = await generateSlugFromCategoryName(data.name, "category");

  const category = await db.category.upsert({
    where: {
      id: data.id ?? "undefined",
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

  return { success: "Category created successfully!" };
};

export const deleteCategory = async (id: string) => {
  const category = await db.category.findFirst({ 
    where: { id }
  });
  if(!category) return { error: "Category not found!" };

  await db.category.delete({ where: { id } });

  return { success: "Category deleted successfully!" };
}