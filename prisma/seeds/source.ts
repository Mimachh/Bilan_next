import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSource = async () => {
  const stat = await prisma.statistique.findFirst();
    if (!stat) {
        return
    }
  await prisma.source.create({
    data: {
      url: "https://www.example.com",
      description: "This is an example source",
      statistiqueId: stat?.id,
    },
  });
};
