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
    Select,
    Tabs,
} from '@mantine/core'
import { theme } from './theme'
import { TbPencil, TbPlus, TbTrash } from 'react-icons/tb'
import { useEffect, useState } from 'react'

export default function App() {
    const [users, setUsers] = useState([])
    const [books, setBooks] = useState([])
    const [open, setOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [bookOpen, setBookOpen] = useState(false)
    const [bookDeleteOpen, setBookDeleteOpen] = useState(false)
    const [bookEditOpen, setBookEditOpen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [authorId, setAuthorId] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [userToDelete, setUserToDelete] = useState(null)
    const [userToEdit, setUserToEdit] = useState(null)
    const [bookToDelete, setBookToDelete] = useState(null)
    const [bookToEdit, setBookToEdit] = useState(null)

    useEffect(() => {
        // Fetch users
        fetch('http://localhost:8080/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
                console.log('Users:', data)
            })
            .catch((error) => console.error('Error fetching users:', error))

        // Fetch books
        fetch('http://localhost:8080/books')
            .then((res) => res.json())
            .then((data) => {
                setBooks(data)
                console.log('Books:', data)
            })
            .catch((error) => console.error('Error fetching books:', error))
    }, [])

    // User functions
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

    // Book functions
    const handleAddBook = () => {
        setLoading(true)
        setError('')

        fetch('http://localhost:8080/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                genre,
                author_id: parseInt(authorId),
            }),
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
                setBooks((prevBooks) => [...prevBooks, data])
                setBookOpen(false)
                setTitle('')
                setGenre('')
                setAuthorId('')
            })
            .catch((error) => {
                console.error('Error adding book:', error)
                setError(error.message || 'Error adding book')
            })
            .finally(() => setLoading(false))
    }

    const handleEditBook = (book) => {
        setBookToEdit(book)
        setTitle(book.title)
        setGenre(book.genre)
        setAuthorId(book.author_id?.toString() || '')
        setBookEditOpen(true)
    }

    const confirmEditBook = () => {
        setLoading(true)
        setError('')

        fetch(`http://localhost:8080/books/${bookToEdit.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                genre,
                author_id: parseInt(authorId),
            }),
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
                setBooks((prevBooks) =>
                    prevBooks.map((book) =>
                        book.id === bookToEdit.id ? data : book
                    )
                )
                setBookEditOpen(false)
                setBookToEdit(null)
                setTitle('')
                setGenre('')
                setAuthorId('')
            })
            .catch((error) => {
                console.error('Error editing book:', error)
                setError(error.message || 'Error editing book')
            })
            .finally(() => setLoading(false))
    }

    const handleDeleteBook = (book) => {
        setBookToDelete(book)
        setBookDeleteOpen(true)
    }

    const confirmDeleteBook = () => {
        fetch(`http://localhost:8080/books/${bookToDelete.id}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (!res.ok) {
                    return res.text().then((text) => {
                        throw new Error(text)
                    })
                }
                setBooks((prevBooks) => {
                    if (!bookToDelete) return prevBooks
                    return prevBooks.filter(
                        (book) => book.id !== bookToDelete.id
                    )
                })
                setBookDeleteOpen(false)
                setBookToDelete(null)
            })
            .catch((error) => {
                console.error('Error deleting book:', error)
                setError(error.message || 'Error deleting book')
            })
    }

    const getAuthorName = (authorId) => {
        const author = users.find((user) => user.id === authorId)
        return author ? author.name : 'Nieznany autor'
    }

    const userOptions = users.map((user) => ({
        value: user.id.toString(),
        label: user.name,
    }))

    return (
        <MantineProvider theme={theme}>
            <Box component="main" mih={'100vh'}>
                <Container mt={'50px'}>
                    <Center h={'100%'}>
                        <Stack w={'100%'} spacing="xl">
                            <Card withBorder>
                                <Group justify="space-between" mb="md">
                                    <Title order={1}>
                                        Autorzy ({users.length})
                                    </Title>
                                    <Button
                                        leftSection={<TbPlus />}
                                        onClick={() => setOpen(true)}
                                    >
                                        Dodaj Autora
                                    </Button>
                                </Group>
                                {users.length === 0 && <p>Brak autorów</p>}
                                {users.length > 0 && (
                                    <Table>
                                        <Table.Thead>
                                            <Table.Tr>
                                                <Table.Th>Imię</Table.Th>
                                                <Table.Th>E-mail</Table.Th>
                                                <Table.Th></Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {users.map((user) => (
                                                <Table.Tr key={user.id}>
                                                    <Table.Td>
                                                        {user.name}
                                                    </Table.Td>
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
                                )}
                            </Card>

                            <Card w={'100%'} withBorder>
                                <Group justify="space-between" mb="md">
                                    <Title order={1}>
                                        Książki ({books.length})
                                    </Title>
                                    <Button
                                        leftSection={<TbPlus />}
                                        onClick={() => setBookOpen(true)}
                                    >
                                        Dodaj Książkę
                                    </Button>
                                </Group>
                                {books.length === 0 && <p>Brak książek</p>}
                                <Card>
                                    {books.length > 0 && (
                                        <Table>
                                            <Table.Thead>
                                                <Table.Tr>
                                                    <Table.Th>Tytuł</Table.Th>
                                                    <Table.Th>Gatunek</Table.Th>
                                                    <Table.Th>Autor</Table.Th>
                                                    <Table.Th></Table.Th>
                                                </Table.Tr>
                                            </Table.Thead>
                                            <Table.Tbody>
                                                {books.map((book) => (
                                                    <Table.Tr key={book.id}>
                                                        <Table.Td>
                                                            {book.title}
                                                        </Table.Td>
                                                        <Table.Td>
                                                            {book.genre}
                                                        </Table.Td>
                                                        <Table.Td>
                                                            {getAuthorName(
                                                                book.author_id
                                                            )}
                                                        </Table.Td>
                                                        <Table.Td>
                                                            <Group justify="flex-end">
                                                                <ActionIcon
                                                                    variant="outline"
                                                                    color="red"
                                                                    onClick={() =>
                                                                        handleDeleteBook(
                                                                            book
                                                                        )
                                                                    }
                                                                >
                                                                    <TbTrash />
                                                                </ActionIcon>
                                                                <ActionIcon
                                                                    variant="outline"
                                                                    onClick={() =>
                                                                        handleEditBook(
                                                                            book
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
                                    )}
                                </Card>
                            </Card>
                        </Stack>
                    </Center>

                    {/* User Modals */}
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

                    {/* Book Modals */}
                    <Modal
                        title={'Dodaj książkę'}
                        opened={bookOpen}
                        onClose={() => setBookOpen(false)}
                    >
                        <Stack>
                            <TextInput
                                label="Tytuł"
                                placeholder="Wpisz tytuł książki"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            <TextInput
                                label="Gatunek"
                                placeholder="Wpisz gatunek"
                                onChange={(e) => setGenre(e.target.value)}
                                value={genre}
                            />
                            <Select
                                label="Autor"
                                placeholder="Wybierz autora"
                                data={userOptions}
                                value={authorId}
                                onChange={setAuthorId}
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Button onClick={handleAddBook} loading={loading}>
                                Dodaj
                            </Button>
                        </Stack>
                    </Modal>

                    <Modal
                        title={'Potwierdź usunięcie'}
                        opened={bookDeleteOpen}
                        onClose={() => setBookDeleteOpen(false)}
                    >
                        <Stack>
                            <p>Czy na pewno chcesz usunąć tę książkę?</p>
                            <Group justify="flex-end">
                                <Button
                                    variant="outline"
                                    onClick={() => setBookDeleteOpen(false)}
                                >
                                    Anuluj
                                </Button>
                                <Button color="red" onClick={confirmDeleteBook}>
                                    Usuń
                                </Button>
                            </Group>
                        </Stack>
                    </Modal>

                    <Modal
                        title={'Edytuj książkę'}
                        opened={bookEditOpen}
                        onClose={() => setBookEditOpen(false)}
                    >
                        <Stack>
                            <TextInput
                                label="Tytuł"
                                placeholder="Wpisz tytuł książki"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            <TextInput
                                label="Gatunek"
                                placeholder="Wpisz gatunek"
                                onChange={(e) => setGenre(e.target.value)}
                                value={genre}
                            />
                            <Select
                                label="Autor"
                                placeholder="Wybierz autora"
                                data={userOptions}
                                value={authorId}
                                onChange={setAuthorId}
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Button onClick={confirmEditBook} loading={loading}>
                                Edytuj
                            </Button>
                        </Stack>
                    </Modal>
                </Container>
            </Box>
        </MantineProvider>
    )
}
