import { Group, Title, Card, Table } from '@mantine/core'
import { useGetBooks } from '../../../../api/books/getBooks'
import { AddBookButtonWithModal } from './AddBookButtonWithModal'
import { BookTableRow } from './BookTableRow'
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
                            <Table.Th>Rodzaj</Table.Th>
                            <Table.Th>Autor</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {books.map((book: TBook) => (
                            <BookTableRow key={book.id} book={book} />
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>
        </>
    )
}
