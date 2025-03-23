import { useEffect, useState } from 'react'
import { addUser } from '../../api/users/addUser'
import { deleteUser } from '../../api/users/deleteUser'
import { editUser } from '../../api/users/editUser'
import { getUsers } from '../../api/users/getUsers'

export const useUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchUsers = async () => {
        try {
            const res = await getUsers()
            const data = await res.json()
            setUsers(data)
        } catch (err) {
            setError('Failed to fetch users')
        }
    }

    const handleAddUser = async (user) => {
        try {
            setLoading(true)
            const res = await addUser(user)
            if (!res.ok) throw new Error(await res.text())
            const newUser = await res.json()
            setUsers((prev) => [...prev, newUser])
        } catch (err) {
            setError(err.message || 'Error adding user')
        } finally {
            setLoading(false)
        }
    }

    const handleEditUser = async (updatedUser) => {
        try {
            setLoading(true)
            const res = await editUser(updatedUser)
            if (!res.ok) throw new Error(await res.text())
            const editedUser = await res.json()
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === updatedUser.id ? editedUser : user
                )
            )
        } catch (err) {
            setError(err.message || 'Error editing user')
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteUser = async (userId) => {
        try {
            setLoading(true)
            const res = await deleteUser({ id: userId })
            if (!res.ok) throw new Error(await res.text())
            setUsers((prev) => prev.filter((user) => user.id !== userId))
        } catch (err) {
            setError(err.message || 'Error deleting user')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return {
        users,
        loading,
        error,
        handleAddUser,
        handleEditUser,
        handleDeleteUser,
    }
}
