import z from 'zod'
import { api } from '../../lib/axios'
import { TUser } from './getUsers'

export type TEditUser = Omit<TUser, 'books' | 'id'>

export const editUserSchema: z.ZodSchema<TEditUser> = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
})

export const editUser = (id: number) => (data: TEditUser) => {
    return api.patch(`/users/${id}`, data).then((res) => res)
}
