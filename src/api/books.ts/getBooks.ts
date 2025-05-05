import { API_URL } from '../../misc/config/env'

export const getBooks = () => fetch(`${API_URL}/books`)
