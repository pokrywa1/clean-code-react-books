import { api } from '../../lib/axios'

export const deleteBook = (id: string) => {
    return api.delete(`/books/${id}`)
}
