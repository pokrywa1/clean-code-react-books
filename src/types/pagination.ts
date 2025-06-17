export interface PaginationMeta {
    totalItems: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export interface PaginatedResponse<T> {
    items: T[]
    meta: PaginationMeta
}
