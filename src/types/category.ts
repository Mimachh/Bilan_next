import { Statistic } from "./statistic"

export interface CategoryNameSlug {
    name: string
    slug: string
}
export interface CategoryDataTable {
    id: number
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
    id: number
    name: string
    // description?: string | null
    slug: string
    // isActive: boolean
    // isFeatured: boolean
    // titleSeo?: string | null
    // descriptionSeo?: string | null
    // keywordsSeo?: string | null
    statistics: Statistic[]
}

