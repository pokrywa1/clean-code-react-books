import { api } from '../../lib/axios'

export const deleteBook = (id: number) => {
    return api.delete(`/books/${id}`).then(({ data }) => data)
}
