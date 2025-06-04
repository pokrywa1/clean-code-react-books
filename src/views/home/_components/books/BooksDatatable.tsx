import {
    Group,
    Title,
    Button,
    Card,
    Table,
    ActionIcon,
    Modal,
    Select,
    Stack,
    TextInput,
} from '@mantine/core'
import { useState, useEffect } from 'react'
import { TbPlus, TbTrash, TbPencil } from 'react-icons/tb'
import { getBooks, useGetBooks } from '../../../../api/books/getBooks'
import { addBook } from '../../../../api/books/addBook'
import { deleteBook } from '../../../../api/books/deleteBook'
import { editBook } from '../../../../api/books/editBook'
import { getUsers } from '../../../../api/users/getUsers'

export const BooksDatatable = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [bookToEdit, setBookToEdit] = useState(null)

    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [authorId, setAuthorId] = useState(null)

    const [openBook, setOpenBook] = useState(false)
    const [deleteBookOpen, setDeleteBookOpen] = useState(false)
    const [editBookOpen, setEditBookOpen] = useState(false)
    const [bookToDelete, setBookToDelete] = useState(null)

    const [users, setUsers] = useState([])

    const {
        data: books,
        refetch: refetchBooks,
        isLoading: isBookLoading,
    } = useGetBooks()

    useEffect(() => {
        getUsers().then((data) => setUsers(data))
    }, [])

    const handleAddBook = () => {
        setLoading(true)
        setError('')
        addBook({ title, genre, authorId: authorId })
            .then((data) => {
                // setBooks((prev) => [...prev, data])
                refetchBooks()
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
        editBook(bookToEdit.id, { title, genre, author_id: authorId })
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
        deleteBook(bookToDelete.id).then(() => {
            setBooks((prev) => prev.filter((b) => b.id !== bookToDelete.id))
            setDeleteBookOpen(false)
        })
    }

    if (!books || !users) {
        return <div>Loading...</div>
    }

    return (
        <>
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
                                            (u) => u.id === book.author_id
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
                                            onClick={() => handleEditBook(book)}
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
                        <Button onClick={() => setDeleteBookOpen(false)}>
                            Anuluj
                        </Button>
                        <Button color="red" onClick={confirmDeleteBook}>
                            Usuń
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    )
}
