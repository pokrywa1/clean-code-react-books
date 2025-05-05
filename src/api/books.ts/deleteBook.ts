import { API_URL } from '../../misc/config/env'

export const deleteBook = ({ id }) =>
  fetch(`${API_URL}/books/${id}`, {
    method: 'DELETE',
  })
