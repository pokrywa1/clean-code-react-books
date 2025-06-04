import { z } from 'zod'
import { api } from '../../lib/axios'
import { TUser, TAddUser } from '../../types/user'

export const addUserSchema: z.ZodSchema<TAddUser> = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
})

export const addUser = (data: TAddUser): Promise<TUser> => {
    return api.post('/users', data).then((res) => res.data)
}
