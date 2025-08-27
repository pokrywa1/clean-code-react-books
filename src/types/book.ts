import { z } from 'zod'
import { TAuthor } from './author'

export const BookSchema = z.object({
    id: z.number(),
    title: z.string(),
    publishedAt: z.string().datetime().optional(),
})
export interface TBook {
    id: number
    title: string
    genre: string
    authorId: number
    author?: TAuthor
}

export interface TAddBook {
    title: string
    genre: string
    authorId: number
}

export interface TEditBook extends TAddBook {}
