import { api } from '../../lib/axios'
import { TEditBook } from '../../types/book'

export const editBook = (id: string) => (data: TEditBook) => {
    return api.patch(`/books/${id}`, data).then((res) => res)
}
