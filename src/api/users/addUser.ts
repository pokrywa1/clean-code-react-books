import { API_URL } from '../../misc/config/env'

export const addUser = ({ name, email }) =>
  fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  })
