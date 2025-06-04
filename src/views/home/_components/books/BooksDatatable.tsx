import { Group, Title, Card, Table } from '@mantine/core'
import { useGetBooks } from '../../../../api/books/getBooks'
import { AddBookButtonWithModal } from './AddBookButtonWithModal'
import { BookDeleteButtonWithModal } from './BookDeleteButtonWithModal'
import { BooksEditButtonWithForm } from './BooksEditButtonWithForm'
import { TBook } from '../../../../types/book'

export const BooksDatatable = () => {
    const { data: books } = useGetBooks()

    if (!books) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Group justify="space-between" mb={20}>
                <Title order={2}>Książki</Title>
                <AddBookButtonWithModal />
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
                        {books.map((book: TBook) => (
                            <Table.Tr key={book.id}>
                                <Table.Td>{book.title}</Table.Td>
                                <Table.Td>{book.genre}</Table.Td>
                                <Table.Td>{book.author?.name}</Table.Td>
                                <Table.Td>
                                    <Group justify="flex-end">
                                        <BooksEditButtonWithForm book={book} />
                                        <BookDeleteButtonWithModal
                                            bookId={book.id}
                                        />
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>
        </>
    )
}
