import { z } from 'zod'
import { api } from '../../lib/axios'
import { TUser } from './getUsers'

export type TAddUser = Omit<TUser, 'books' | 'id'>

export const addUserSchema: z.ZodSchema<TAddUser> = z.object({
    name: z.string().min(1, 'Title is required'),
    email: z.string().min(1, 'Genre is required'),
})
export const addUser = (data: TAddUser) => {
    return api.post('/users', data).then((res) => res)
}
