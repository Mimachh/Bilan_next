import { Statistic } from "./statistic"

export interface CategoryDataTable {
    id: string
    name: string
    description?: string | null
    slug: string
    isActive: boolean
    isFeatured: boolean
    titleSeo?: string | null
    descriptionSeo?: string | null
    keywordsSeo?: string | null
}

export interface CategoryRootWithStats {
    // id: string
    name: string
    // description?: string | null
    // slug: string
    // isActive: boolean
    // isFeatured: boolean
    // titleSeo?: string | null
    // descriptionSeo?: string | null
    // keywordsSeo?: string | null
    statistics: Statistic[]
}

