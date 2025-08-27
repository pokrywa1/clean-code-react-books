import { api } from '../../lib/axios'
import { TEditBook } from '../../types/book'
import * as z from 'zod'

export const editBookSchema: z.ZodType<TEditBook> = z.object({
    title: z.string().min(1),
    genre: z.string().min(1),
    authorId: z.number().min(1),
})
export const editBook = (id: number) => (data: TEditBook) => {
    return api
        .patch(`/books/${id}`, {
            ...data,
            authorId: data.authorId ? Number(data.authorId) : undefined,
        })
        .then(({ data }) => data)
}
