import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/axios'

import { TAuthor } from '../../types/author'

export const getAuthors = () => {
    return api.get<TAuthor[]>('/authors').then((res) => res.data)
}

export const useGetAuthors = () => {
    return useQuery({
        queryKey: ['authors'],
        queryFn: getAuthors,
    })
}
