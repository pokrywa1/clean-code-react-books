import { Group, Title, Card, Table, Stack } from '@mantine/core'
import { useGetBooks } from '../../../../api/books/getBooks'
import { AddBookButtonWithModal } from './AddBookButtonWithModal'
import { useState } from 'react'
import { PaginatedQuery } from '../../../../app/components/PaginatedQuery'
import { BooksTableRow } from './BooksTableRow'

export const BooksDatatable = () => {
    const [page, setPage] = useState(1)
    const booksQuery = useGetBooks({ page, limit: 10 })

    return (
        <Stack gap="md">
            <Group justify="space-between">
                <Title order={2}>Książki</Title>
                <AddBookButtonWithModal />
            </Group>
            <Card>
                <PaginatedQuery
                    query={booksQuery}
                    currentPage={page}
                    onPageChange={setPage}
                    render={(books) => (
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
                                {books.map((book) => (
                                    <BooksTableRow key={book.id} book={book} />
                                ))}
                            </Table.Tbody>
                        </Table>
                    )}
                />
            </Card>
        </Stack>
    )
}
