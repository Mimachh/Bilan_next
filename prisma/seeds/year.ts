import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "2023",
    value: "1672527600000",
  },
  {
    name: "2024",
    value: "1704067201000",
  },
];
export const createYear = async () => {
  await prisma.year.createMany({
    data: categories,
  });
};
