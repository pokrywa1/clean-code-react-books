import z from 'zod'
import { api } from '../../lib/axios'
import { TEditAuthor } from '../../types/author'

export const editAuthorSchema: z.ZodSchema<Omit<TEditAuthor, 'id'>> = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
})

export const editAuthor = (id: number) => (data: TEditAuthor) => {
    return api.patch(`/authors/${id}`, data).then((res) => res)
}
