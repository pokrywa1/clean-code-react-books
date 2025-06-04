import { z } from 'zod'
import { api } from '../../lib/axios'
import { TAuthor, TAddAuthor } from '../../types/author'

export const addAuthorSchema: z.ZodSchema<TAddAuthor> = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
})

export const addAuthor = (data: TAddAuthor): Promise<TAuthor> => {
    return api.post('/authors', data).then((res) => res.data)
}
