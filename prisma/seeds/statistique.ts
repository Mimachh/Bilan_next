import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createStatistique = async () => {
    const category = await prisma.category.findFirst();
    const refresh = await prisma.refreshCounter.findFirst();
    if (!category || !refresh) {
        return;
    }
    await prisma.statistique.create({
        data: {
            name: 'Statistique 1',
            slug: 'statistique-1',
            stat_reference_previous_year: 100,
            has_starting_stat_to_add: true,
            starting_stat_to_add: 10,
            comment: 'Commentaire 1',
            categoryId: category?.id,
            refreshId: refresh?.id,
        },
      });
}