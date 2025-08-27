import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/axios'
import { TBook } from '../../types/book'
import { PaginatedResponse } from '../../types/pagination'

export interface GetBooksParams {
    page?: number
    limit?: number
}

export const getBooks = (params: GetBooksParams = {}) => {
    return api
        .get<PaginatedResponse<TBook>>('/books', {
            params: {
                page: params.page ?? 1,
                limit: params.limit ?? 10,
            },
        })
        .then(({ data }) => data)
}

export const useGetBooks = (params: GetBooksParams = {}) => {
    return useQuery({
        queryKey: ['books', params],
        queryFn: async () => await getBooks(params),
    })
}
