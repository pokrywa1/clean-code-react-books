import { api } from '../../lib/axios'
import { TBook } from './getBooks'

export const addBook = (book: TBook) =>
    api.post('books', book).then((res) => res)
