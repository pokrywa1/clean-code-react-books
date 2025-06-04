import { api } from '../../lib/axios'

export const deleteUser = (id: number) => {
    return api.delete(`/users/${id}`)
}
