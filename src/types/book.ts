import { TAuthor } from './author'

export interface TBook {
    id: string
    title: string
    genre: string
    authorId: string
    author?: TAuthor
}

export interface TAddBook {
    title: string
    genre: string
    authorId: string
}

export interface TEditBook extends TAddBook {
    id: string
}
