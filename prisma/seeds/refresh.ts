import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createRefresh = async () => {
    await prisma.refreshCounter.create({
        data: {
            name: 'Refresh 1',
            slug: 'refresh-1',
            value: 10,
        },
      });
}