"use server"

import { db } from "@/lib/db"


export const getActiveCountersGroupedByCategory = async () => {

    const stats = await db.category.findMany({
        where: {
            isActive: true
        },
        select: {
            name: true,
            statistics: {
                where: {
                    isActive: true,
                    isFeatured: true
                },
                select: {
                    name: true,
                    slug: true,
                    stat_reference_previous_year: true,
                    has_starting_stat_to_add: true,
                    starting_stat_to_add: true,
                    isActive: true,
                    isStatic: true,
                    isPrice: true,
                    refresh: {
                        select: {
                            value: true
                        }
                    }
                }
            }
        }
    })

    return stats
}