import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/axios'
import { TUser } from '../users/getUsers'

export type TBook = {
    id: number
    title: string
    genre: string
    authorId: number
    author: TUser
}
export const getBooks = () => {
    return api('/books').then((res) => res.data)
}

export const useGetBooks = () => {
    return useQuery({
        queryKey: ['books'],
        queryFn: getBooks,
    })
}
