import { API_URL } from '../../misc/config/env'

export const editBook = ({ id, title, authorId, genre }) =>
  fetch(`${API_URL}/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, authorId, genre }),
  })
