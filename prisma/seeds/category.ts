import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async () => {
    await prisma.category.create({
        data: {
            name: "Category 1",
            slug: "category-1",
            description: "Category 1 description",
            titleSeo: "Category 1 SEO title",
            descriptionSeo: "Category 1 SEO description",
            keywordsSeo: "Category 1 SEO keywords",
            isActive: true,
        },
      });
}