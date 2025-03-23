import { API_URL } from '../../misc/config/env'

export const deleteUser = ({ id }) =>
  fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  })
