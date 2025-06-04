import { api } from '../../lib/axios'

export const deleteAuthor = (id: number) => {
    return api.delete(`/authors/${id}`)
}
