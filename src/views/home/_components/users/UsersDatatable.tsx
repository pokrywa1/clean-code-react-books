import {
    Group,
    Title,
    Button,
    Card,
    Table,
    ActionIcon,
    Modal,
    Stack,
    TextInput,
} from '@mantine/core'
import { useState, useEffect } from 'react'
import { TbPlus, TbTrash, TbPencil } from 'react-icons/tb'
import { addUser } from '../../../../api/users/addUser'
import { deleteUser } from '../../../../api/users/deleteUser'
import { editUser } from '../../../../api/users/editUser'
import { getUsers } from '../../../../api/users/getUsers'

export const UsersDatatable = () => {
    const [users, setUsers] = useState([])

    const [openUser, setOpenUser] = useState(false)
    const [deleteUserOpen, setDeleteUserOpen] = useState(false)
    const [editUserOpen, setEditUserOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null)
    const [userToEdit, setUserToEdit] = useState(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        getUsers().then((data) => setUsers(data))
    }, [])

    const handleAddUser = () => {
        setLoading(true)
        setError('')
        addUser({ email, name })
            .then((data) => {
                setUsers((prev) => [...prev, data])
                setOpenUser(false)
                setName('')
                setEmail('')
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    const handleEditUser = (user) => {
        setUserToEdit(user)
        setName(user.name)
        setEmail(user.email)
        setEditUserOpen(true)
    }

    const confirmEditUser = () => {
        setLoading(true)
        setError('')
        editUser(userToEdit.id, { name, email })
            .then((data) => {
                setUsers((prev) =>
                    prev.map((u) => (u.id === data.id ? data : u))
                )
                setEditUserOpen(false)
                setName('')
                setEmail('')
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    const handleDeleteUser = (user) => {
        setUserToDelete(user)
        setDeleteUserOpen(true)
    }

    const confirmDeleteUser = () => {
        deleteUser(userToDelete.id).then(() => {
            setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id))
            setDeleteUserOpen(false)
        })
    }
    return (
        <>
            <Group justify="space-between" mb={20}>
                <Title order={2}>Autorzy</Title>
                <Button
                    leftSection={<TbPlus />}
                    onClick={() => setOpenUser(true)}
                >
                    Dodaj Autora
                </Button>
            </Group>
            <Card>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Imię</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {users.map((user) => (
                            <Table.Tr key={user.id}>
                                <Table.Td>{user.name}</Table.Td>
                                <Table.Td>{user.email}</Table.Td>
                                <Table.Td>
                                    <Group justify="flex-end">
                                        <ActionIcon
                                            color="red"
                                            onClick={() =>
                                                handleDeleteUser(user)
                                            }
                                        >
                                            <TbTrash />
                                        </ActionIcon>
                                        <ActionIcon
                                            onClick={() => handleEditUser(user)}
                                        >
                                            <TbPencil />
                                        </ActionIcon>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>

            <Modal
                opened={openUser}
                onClose={() => setOpenUser(false)}
                title="Dodaj autora"
            >
                <Stack>
                    <TextInput
                        label="Imię"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button onClick={handleAddUser} loading={loading}>
                        Dodaj
                    </Button>
                </Stack>
            </Modal>

            <Modal
                opened={editUserOpen}
                onClose={() => setEditUserOpen(false)}
                title="Edytuj autora"
            >
                <Stack>
                    <TextInput
                        label="Imię"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button onClick={confirmEditUser} loading={loading}>
                        Zapisz
                    </Button>
                </Stack>
            </Modal>

            <Modal
                opened={deleteUserOpen}
                onClose={() => setDeleteUserOpen(false)}
                title="Usuń autora"
            >
                <Stack>
                    <p>Czy na pewno chcesz usunąć autora?</p>
                    <Group justify="flex-end">
                        <Button onClick={() => setDeleteUserOpen(false)}>
                            Anuluj
                        </Button>
                        <Button color="red" onClick={confirmDeleteUser}>
                            Usuń
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    )
}
