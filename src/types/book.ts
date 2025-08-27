import { TAuthor } from './author'

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
