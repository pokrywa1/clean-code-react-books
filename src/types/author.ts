import { TBook } from './book'

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
