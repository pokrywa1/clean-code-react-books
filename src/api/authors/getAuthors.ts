import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/axios'
import { TAuthor } from '../../types/author'
import { PaginatedResponse } from '../../types/pagination'

export interface GetAuthorsParams {
    page?: number
    limit?: number
}

export const getAuthors = async (params: GetAuthorsParams = {}) => {
    const response = await api.get<PaginatedResponse<TAuthor>>('/authors', {
        params: {
            page: params.page ?? 1,
            limit: params.limit ?? 10,
        },
    })
    return response.data
}

export const useGetAuthors = (params: GetAuthorsParams = {}) => {
    return useQuery({
        queryKey: ['authors', params],
        queryFn: () => getAuthors(params),
    })
}
