import { Group, Title, Card, Table, Stack } from '@mantine/core'
import { useGetAuthors } from '../../../../api/authors/getAuthors'
import { AddAuthorButtonWithModal } from './AddAuthorButtonWithModal'
import { AuthorTableRow } from './AuthorTableRow'
import { useState } from 'react'
import { PaginatedQuery } from '../../../../app/components/PaginatedQuery'
import { TAuthor } from '../../../../types/author'

export const AuthorsDatatable = () => {
    const [page, setPage] = useState(1)
    const authorsQuery = useGetAuthors({ page, limit: 10 })

    return (
        <Stack gap="md">
            <Group justify="space-between">
                <Title order={2}>Autorzy</Title>
                <AddAuthorButtonWithModal />
            </Group>
            <Card>
                <PaginatedQuery<TAuthor>
                    query={authorsQuery}
                    currentPage={page}
                    onPageChange={setPage}
                    render={(authors) => (
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Imię</Table.Th>
                                    <Table.Th>Email</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {authors.map((author) => (
                                    <AuthorTableRow
                                        key={author.id}
                                        author={author}
                                    />
                                ))}
                            </Table.Tbody>
                        </Table>
                    )}
                />
            </Card>
        </Stack>
    )
}
