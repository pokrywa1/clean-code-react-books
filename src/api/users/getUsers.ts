import { API_URL } from '../../misc/config/env'

export const getUsers = () => fetch(`${API_URL}/users`)
