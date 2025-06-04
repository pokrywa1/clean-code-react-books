import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/axios'

export const getBooks = () => {
    return api.get('/books').then((res) => res.data)
}

export const useGetBooks = () => {
    return useQuery({
        queryKey: ['books'],
        queryFn: getBooks,
    })
}
