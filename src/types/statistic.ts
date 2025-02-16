export interface StatisticDataTable {
    id: number
    name: string
    categoryId: number
    category: {
        name: string
    }
    refresh: {
        name: string | null
    } | null
    isActive: boolean
    isFeatured: boolean
    stat_reference_previous_year: number
    isStatic: boolean
    has_starting_stat_to_add: boolean
    starting_stat_to_add: number | null
    isPrice: boolean
    comment: string | null
    createdAt: Date
    refreshId: number | null
    // sources: {}
}

export interface Statistic {
    id: number
    name: string
    slug: string
    stat_reference_previous_year: number
    has_starting_stat_to_add: boolean
    starting_stat_to_add?: number | null
    isActive: boolean
    isStatic: boolean
    isPrice: boolean
    refresh?: {
        value: number
    } | null
}