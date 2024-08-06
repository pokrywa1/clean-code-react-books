import '@mantine/core/styles.css'
import {
    Box,
    Button,
    Card,
    Center,
    Container,
    Group,
    Modal,
    SimpleGrid,
    Stack,
    Table,
    TextInput,
    Title,
    MantineProvider,
    ActionIcon,
} from '@mantine/core'
import { theme } from './theme'
import { TbPencil, TbPlus, TbTrash } from 'react-icons/tb'
import { useEffect, useState } from 'react'

export default function App() {
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [userToDelete, setUserToDelete] = useState(null)
    const [userToEdit, setUserToEdit] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
                console.log(data)
            })
            .catch((error) => console.error('Error fetching users:', error))
    }, [])

    const handleAddUser = () => {
        setLoading(true)
        setError('')

        fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.text().then((text) => {
                        throw new Error(text)
                    })
                }
                return res.json()
            })
            .then((data) => {
                setUsers((prevUsers) => [...prevUsers, data])
                setOpen(false)
                setName('')
                setEmail('')
            })
            .catch((error) => {
                console.error('Error adding user:', error)
                setError(error.message || 'Error adding user')
            })
            .finally(() => setLoading(false))
    }

    const handleEditUser = (user) => {
        setUserToEdit(user)
        setName(user.name)
        setEmail(user.email)
        setEditOpen(true)
    }

    const confirmEditUser = () => {
        setLoading(true)
        setError('')

        fetch(`http://localhost:8080/users/${userToEdit.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.text().then((text) => {
                        throw new Error(text)
                    })
                }
                return res.json()
            })
            .then((data) => {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userToEdit.id ? data : user
                    )
                )
                setEditOpen(false)
                setUserToEdit(null)
                setName('')
                setEmail('')
            })
            .catch((error) => {
                console.error('Error editing user:', error)
                setError(error.message || 'Error editing user')
            })
            .finally(() => setLoading(false))
    }

    const handleDeleteUser = (user) => {
        setUserToDelete(user)
        setDeleteOpen(true)
    }

    const confirmDeleteUser = () => {
        fetch(`http://localhost:8080/users/${userToDelete.id}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (!res.ok) {
                    return res.text().then((text) => {
                        throw new Error(text)
                    })
                }
                setUsers((prevUsers) => {
                    if (!userToDelete) return prevUsers
                    return prevUsers.filter(
                        (user) => user.id !== userToDelete.id
                    )
                })
                setDeleteOpen(false)
                setUserToDelete(null)
            })
            .catch((error) => {
                console.error('Error deleting user:', error)
                setError(error.message || 'Error deleting user')
            })
    }

    return (
        <MantineProvider theme={theme}>
            <Box component="main" mih={'100vh'}>
                <Container mt={'100px'}>
                    <Center h={'100%'}>
                        <Card w={'100%'} withBorder>
                            <Group justify="space-between">
                                <Title order={1}>Autorzy</Title>
                                <Button
                                    leftSection={<TbPlus />}
                                    onClick={() => setOpen(true)}
                                >
                                    Dodaj Autora
                                </Button>
                                {users.length === 0 && <p>Brak autorów</p>}
                                <Table>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>Imię</Table.Th>
                                            <Table.Th>Nazwisko</Table.Th>
                                            <Table.Th></Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {users.map((user) => (
                                            <Table.Tr key={user.id}>
                                                <Table.Td>{user.name}</Table.Td>
                                                <Table.Td>
                                                    {user.email}
                                                </Table.Td>
                                                <Table.Td>
                                                    <Group justify="flex-end">
                                                        <ActionIcon
                                                            variant="outline"
                                                            color="red"
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            <TbTrash />
                                                        </ActionIcon>
                                                        <ActionIcon
                                                            variant="outline"
                                                            onClick={() =>
                                                                handleEditUser(
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            <TbPencil />
                                                        </ActionIcon>
                                                    </Group>
                                                </Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            </Group>
                        </Card>
                    </Center>
                    <Modal
                        title={'Dodaj autora'}
                        opened={open}
                        onClose={() => setOpen(false)}
                    >
                        <Stack>
                            <SimpleGrid cols={2}>
                                <TextInput
                                    label="Imię"
                                    placeholder="Wpisz imię"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                                <TextInput
                                    label="E-mail"
                                    placeholder="Wpisz e-mail"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </SimpleGrid>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Button onClick={handleAddUser} loading={loading}>
                                Dodaj
                            </Button>
                        </Stack>
                    </Modal>
                    <Modal
                        title={'Potwierdź usunięcie'}
                        opened={deleteOpen}
                        onClose={() => setDeleteOpen(false)}
                    >
                        <Stack>
                            <p>Czy na pewno chcesz usunąć tego użytkownika?</p>
                            <Group justify="flex-end">
                                <Button
                                    variant="outline"
                                    onClick={() => setDeleteOpen(false)}
                                >
                                    Anuluj
                                </Button>
                                <Button color="red" onClick={confirmDeleteUser}>
                                    Usuń
                                </Button>
                            </Group>
                        </Stack>
                    </Modal>
                    <Modal
                        title={'Edytuj autora'}
                        opened={editOpen}
                        onClose={() => setEditOpen(false)}
                    >
                        <Stack>
                            <SimpleGrid cols={2}>
                                <TextInput
                                    label="Imię"
                                    placeholder="Wpisz imię"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                                <TextInput
                                    label="E-mail"
                                    placeholder="Wpisz e-mail"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </SimpleGrid>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Button onClick={confirmEditUser} loading={loading}>
                                Edytuj
                            </Button>
                        </Stack>
                    </Modal>
                </Container>
            </Box>
        </MantineProvider>
    )
}
