import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Démographie",
    slug: "demographie",
    description: "",
    titleSeo: "Bilan de la démographie française sous Macron en 2024",
    descriptionSeo:
      "Voici un bilan en temps réel de la démographie française sous le mandat de Emmanuel Macron en 2024.",
    keywordsSeo: "Démographie. France. Macron. 2024. Bilan",
    isActive: true,
    isFeatured: true,
  },
  {
    name: "Immigration",
    slug: "immigration",
    description: "",
    titleSeo: "Bilan de l'immigration en France sous Macron en 2024",
    descriptionSeo:
      "Voici un bilan en temps réel de l'immigration en France sous le mandat de Emmanuel Macron en 2024.",
    keywordsSeo: "Immigration. France. Macron. 2024. Bilan",
    isActive: true,
    isFeatured: true,
  },
  {
    name: "Insécurité",
    slug: "insecurite",
    description: "",
    titleSeo: "Bilan de l'insécurité en France sous Macron en 2024",
    descriptionSeo:
      "Voici un bilan en temps réel de l'insécurité française sous le mandat de Emmanuel Macron en 2024.",
    keywordsSeo: "Insécurité. France. Macron. 2024. Bilan",
    isActive: true,
    isFeatured: true,
  },
  {
    name: "Economie",
    slug: "economie",
    description: "",
    titleSeo: "Bilan de l'économie française sous Macron en 2024",
    descriptionSeo:
      "Voici un bilan en temps réel de l'économie française sous le mandat de Emmanuel Macron en 2024.",
    keywordsSeo: "Economie. France. Macron. 2024. Bilan",
    isActive: true,
    isFeatured: true,
  },
  {
    name: "Religion",
    slug: "religion",
    description: "",
    titleSeo: "Bilan de la religion en France sous Macron en 2024",
    descriptionSeo:
      "Voici un bilan en temps réel de la religion en France sous le mandat de Emmanuel Macron en 2024.",
    keywordsSeo: "Religion. France. Macron. 2024. Bilan",
    isActive: true,
    isFeatured: true,
  },
  {
    name: "Écologie",
    slug: "ecologie",
    description: "",
    titleSeo: "Bilan de l'écologie en France sous Macron en 2025",
    descriptionSeo:
      "Voici un bilan en temps réel de la religion en France sous le mandat de Emmanuel Macron en 2025.",
    keywordsSeo: "Ecologie. France. Macron. 2024. Bilan",
    isActive: true,
    isFeatured: true,
  },
  {
    name: "Justice",
    slug: "justice",
    description: "",
    titleSeo: "Bilan de la justice en France sous Macron en 2024",
    descriptionSeo:
      "Voici un bilan en temps réel de la justice en France sous le mandat de Emmanuel Macron en 2024.",
    keywordsSeo: "Justice. France. Macron. 2024. Bilan",
    isActive: true,
    isFeatured: true,
  }
];
export const createCategory = async () => {
  await prisma.category.createMany({
    data: categories,
  });
};
