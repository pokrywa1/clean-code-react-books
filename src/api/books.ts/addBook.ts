import { API_URL } from '../../misc/config/env'

export const addBook = ({ title, authorId, genre }) =>
  fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, author_id: authorId, genre }),
  })
