import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/axios'
import { AuthorSchema, TAuthor } from '../../types/author'
import { PaginatedResponse } from '../../types/pagination'

import { PaginatedResponseSchema } from '../../lib/utils/validation'

export interface GetAuthorsParams {
    page?: number
    limit?: number
}

export const getAuthors = (params: GetAuthorsParams = {}) => {
    return api
        .get<PaginatedResponse<TAuthor>>('/authors', {
            params: {
                page: params.page ?? 1,
                limit: params.limit ?? 10,
            },
        })
        .then(({ data }) => PaginatedResponseSchema(AuthorSchema).parse(data))
}

export const useGetAuthors = (params: GetAuthorsParams = {}) => {
    return useQuery({
        queryKey: ['authors', params],
        queryFn: () => getAuthors(params),
    })
}
