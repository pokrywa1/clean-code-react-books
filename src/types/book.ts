import { TUser } from './user'

export interface TBook {
    id: string
    title: string
    genre: string
    authorId: string
    author?: TUser
}

export interface TAddBook {
    title: string
    genre: string
    authorId: string
}

export interface TEditBook extends TAddBook {
    id: string
}
