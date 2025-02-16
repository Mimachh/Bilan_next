"use server"

import { db } from "@/lib/db"

export const getSourcesFromStatId = async (statId: number) => {
    const existingStat = await db.statistique.findFirst({
        where: {
            id: statId
        }
    });

    if(!existingStat) {
        return [];
    }

    const sources = await db.source.findMany({
        where: {
            statistiqueId: statId
        },
        select: {
            id: true,
            name: true,
            url: true,
            description: true
        }
    });

    return sources;
}