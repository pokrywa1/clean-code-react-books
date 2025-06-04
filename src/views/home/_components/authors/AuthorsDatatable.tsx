import { Group, Title, Card, Table } from '@mantine/core'
import { useGetAuthors } from '../../../../api/authors/getAuthors'

import { AuthorDeleteButtonWithModal } from './AuthorDeleteButtonWithModal'
import { AuthorsEditButtonWithForm } from './AuthorsEditButtonWithForm'
import { AddAuthorButtonWithModal } from './AddAuthorButtonWithModal'

export const AuthorsDatatable = () => {
    const { data: authors } = useGetAuthors()

    if (!authors) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Group justify="space-between" mb={20}>
                <Title order={2}>Autorzy</Title>
                <AddAuthorButtonWithModal />
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
                        {authors.map((author) => (
                            <Table.Tr key={author.id}>
                                <Table.Td>{author.name}</Table.Td>
                                <Table.Td>{author.email}</Table.Td>
                                <Table.Td>
                                    <Group justify="flex-end">
                                        <AuthorsEditButtonWithForm
                                            author={author}
                                        />
                                        <AuthorDeleteButtonWithModal
                                            authorId={author.id}
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
