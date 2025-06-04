import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/axios'
import { TBook } from '../books/getBooks'

export type TUser = {
    id: number
    name: string
    email: string
    books: TBook[]
}
export const getUsers = () => {
    return api.get<TUser[]>('/users').then((res) => res.data)
}

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    })
}
