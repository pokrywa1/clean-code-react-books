import { api } from '../../lib/axios'
import { TAddBook, TBook } from '../../types/book'
import * as z from 'zod'

export const addBookSchema: z.ZodType<TAddBook> = z.object({
    title: z.string().min(1),
    genre: z.string().min(1),
    authorId: z.number().min(1),
})

export const addBook = (book: TAddBook): Promise<TBook> =>
    api.post('/books', book).then(({ data }) => data)
