import { API_URL } from '../../misc/config/env'

export const editUser = ({ id, name, email }) =>
  fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  })
