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
} from '@mantine/core'
import { theme } from './theme'
import { TbPencil, TbPlus, TbTrash } from 'react-icons/tb'
import { useEffect, useState } from 'react'

export default function App() {
    const [users, setUsers] = useState([])
    const [books, setBooks] = useState([])

    const [openUser, setOpenUser] = useState(false)
    const [deleteUserOpen, setDeleteUserOpen] = useState(false)
    const [editUserOpen, setEditUserOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null)
    const [userToEdit, setUserToEdit] = useState(null)

    const [openBook, setOpenBook] = useState(false)
    const [deleteBookOpen, setDeleteBookOpen] = useState(false)
    const [editBookOpen, setEditBookOpen] = useState(false)
    const [bookToDelete, setBookToDelete] = useState(null)
    const [bookToEdit, setBookToEdit] = useState(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [authorId, setAuthorId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then((res) => res.json())
            .then((data) => setUsers(data))

        fetch('http://localhost:8080/books')
            .then((res) => res.json())
            .then((data) => setBooks(data))
    }, [])

    const handleAddUser = () => {
        setLoading(true)
        setError('')
        fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email }),
        })
            .then((res) => res.json())
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
        fetch(`http://localhost:8080/users/${userToEdit.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email }),
        })
            .then((res) => res.json())
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
        fetch(`http://localhost:8080/users/${userToDelete.id}`, {
            method: 'DELETE',
        }).then(() => {
            setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id))
            setDeleteUserOpen(false)
        })
    }

    const handleAddBook = () => {
        setLoading(true)
        setError('')
        fetch('http://localhost:8080/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, genre, author_id: authorId }),
        })
            .then((res) => res.json())
            .then((data) => {
                setBooks((prev) => [...prev, data])
                setOpenBook(false)
                setTitle('')
                setGenre('')
                setAuthorId(null)
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    const handleEditBook = (book) => {
        setBookToEdit(book)
        setTitle(book.title)
        setGenre(book.genre)
        setAuthorId(book.author_id)
        setEditBookOpen(true)
    }

    const confirmEditBook = () => {
        setLoading(true)
        setError('')
        fetch(`http://localhost:8080/books/${bookToEdit.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, genre, author_id: authorId }),
        })
            .then((res) => res.json())
            .then((data) => {
                setBooks((prev) =>
                    prev.map((b) => (b.id === data.id ? data : b))
                )
                setEditBookOpen(false)
                setTitle('')
                setGenre('')
                setAuthorId(null)
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    const handleDeleteBook = (book) => {
        setBookToDelete(book)
        setDeleteBookOpen(true)
    }

    const confirmDeleteBook = () => {
        fetch(`http://localhost:8080/books/${bookToDelete.id}`, {
            method: 'DELETE',
        }).then(() => {
            setBooks((prev) => prev.filter((b) => b.id !== bookToDelete.id))
            setDeleteBookOpen(false)
        })
    }

    return (
        <MantineProvider theme={theme}>
            <Box component="main" mih={'100vh'} bg={'#f5f5f5'}>
                <Container pt={40}>
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
                                                    onClick={() =>
                                                        handleEditUser(user)
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
                    </Card>

                    <Group mt={40} justify="space-between" align="center">
                        <Title order={2}>Książki</Title>
                        <Group justify="space-between" mb={20}>
                            <Button
                                leftSection={<TbPlus />}
                                onClick={() => setOpenBook(true)}
                            >
                                Dodaj Książkę
                            </Button>
                        </Group>
                    </Group>
                    <Card>
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
                                        <Table.Td>{book.title}</Table.Td>
                                        <Table.Td>{book.genre}</Table.Td>
                                        <Table.Td>
                                            {
                                                users.find(
                                                    (u) =>
                                                        u.id === book.author_id
                                                )?.name
                                            }
                                        </Table.Td>
                                        <Table.Td>
                                            <Group justify="flex-end">
                                                <ActionIcon
                                                    color="red"
                                                    onClick={() =>
                                                        handleDeleteBook(book)
                                                    }
                                                >
                                                    <TbTrash />
                                                </ActionIcon>
                                                <ActionIcon
                                                    onClick={() =>
                                                        handleEditBook(book)
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
                                <Button
                                    onClick={() => setDeleteUserOpen(false)}
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
                        opened={openBook}
                        onClose={() => setOpenBook(false)}
                        title="Dodaj książkę"
                    >
                        <Stack>
                            <TextInput
                                label="Tytuł"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextInput
                                label="Gatunek"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                            <Select
                                label="Autor"
                                data={users.map((u) => ({
                                    value: u.id.toString(),
                                    label: u.name,
                                }))}
                                value={authorId?.toString() || ''}
                                onChange={(val) => setAuthorId(parseInt(val))}
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Button onClick={handleAddBook} loading={loading}>
                                Dodaj
                            </Button>
                        </Stack>
                    </Modal>

                    <Modal
                        opened={editBookOpen}
                        onClose={() => setEditBookOpen(false)}
                        title="Edytuj książkę"
                    >
                        <Stack>
                            <TextInput
                                label="Tytuł"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextInput
                                label="Gatunek"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                            <Select
                                label="Autor"
                                data={users.map((u) => ({
                                    value: u.id.toString(),
                                    label: u.name,
                                }))}
                                value={authorId?.toString() || ''}
                                onChange={(val) => setAuthorId(parseInt(val))}
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Button onClick={confirmEditBook} loading={loading}>
                                Zapisz
                            </Button>
                        </Stack>
                    </Modal>

                    <Modal
                        opened={deleteBookOpen}
                        onClose={() => setDeleteBookOpen(false)}
                        title="Usuń książkę"
                    >
                        <Stack>
                            <p>Czy na pewno chcesz usunąć książkę?</p>
                            <Group justify="flex-end">
                                <Button
                                    onClick={() => setDeleteBookOpen(false)}
                                >
                                    Anuluj
                                </Button>
                                <Button color="red" onClick={confirmDeleteBook}>
                                    Usuń
                                </Button>
                            </Group>
                        </Stack>
                    </Modal>
                </Container>
            </Box>
        </MantineProvider>
    )
}
