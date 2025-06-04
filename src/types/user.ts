import { TBook } from './book'

export interface TUser {
    id: number
    name: string
    email: string
    books?: TBook[]
}

export interface TAddUser {
    name: string
    email: string
}

export interface TEditUser extends TAddUser {
    id: number
}
