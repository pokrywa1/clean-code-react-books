import { api } from '../../lib/axios'
import { TBook } from './getBooks'

export const editBook = (id: string) => (data: TBook) => {
    return api.put(`/books/${id}`, data).then((res) => res)
}
