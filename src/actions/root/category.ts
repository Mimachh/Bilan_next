"use server"

import { db } from "@/lib/db"

export const getCategoryBySlug = async (slug: string) => {
    const category = await db.category.findFirst({
        where: {
            slug
        }
    })

    if (!category) {
        return null
    }
    return category
}

export const getAllCategories = async () => {
    const categories = await db.category.findMany({
        where: {
            isActive: true
        }
    })

    return categories
}