import { z } from 'zod'

export const PaginationMetaSchema = z.object({
    totalItems: z.number(),
    itemsPerPage: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
})

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(
    itemSchema: T
) =>
    z.object({
        items: z.array(itemSchema),
        meta: PaginationMetaSchema,
    })
