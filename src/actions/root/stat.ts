"use server"

import { db } from "@/lib/db"
import { CategoryNameSlug } from "@/types/category"
import { Statistic } from "@/types/statistic"


export const getActiveCountersGroupedByCategory = async () => {

    const stats = await db.category.findMany({
        where: {
            isActive: true
        },
        select: {
            id: true,
            name: true,
            slug: true,
            statistics: {
                where: {
                    isActive: true,
                    isFeatured: true
                },
                select: {
                    id: true,
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

export const getActiveCountersByCategorySlug = async (slug: string) => {
   
    const category = await db.category.findFirst({
        where: { 
            slug
        }
    })
    if (!category) {
        return null
    }

    const stats = await db.statistique.findMany({
        where: {
            isActive: true,
            categoryId: category.id
        },
        select: {
            id: true,
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
        },
        
    })

    return stats
}

export const getCounterBySlug = async (slug: string) => {
    const stat = await db.statistique.findFirst({
        where: {
            slug
        },
        select: {
            id: true,
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
    })

    return stat
}