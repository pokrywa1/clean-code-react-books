import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/axios'

import { TUser } from '../../types/user'

export const getUsers = () => {
    return api.get<TUser[]>('/users').then((res) => res.data)
}

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    })
}
