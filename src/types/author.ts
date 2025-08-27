import { z } from 'zod'
import { BookSchema, TBook } from './book'

export const AuthorSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    books: z.array(BookSchema).optional(),
})

export interface TAuthor {
    id: number
    name: string
    email: string
    books?: TBook[]
}

export interface TAddAuthor {
    name: string
    email: string
}

export interface TEditAuthor extends TAddAuthor {}
