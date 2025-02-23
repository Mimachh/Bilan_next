"use server"

import { db } from "@/lib/db"

export const getYearByName = async (name: string) => {
    const year = await db.year.findFirst({
        where: {
            name
        }
    })

    return year
}

export const getCurrentYear = async () => {
    const year = await getYearByName('2023');
    return year
}
