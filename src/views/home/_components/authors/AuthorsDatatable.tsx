import { Group, Title, Card, Table } from '@mantine/core'
import { useGetAuthors } from '../../../../api/authors/getAuthors'
import { AddAuthorButtonWithModal } from './AddAuthorButtonWithModal'
import { AuthorTableRow } from './AuthorTableRow'

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
                            <AuthorTableRow key={author.id} author={author} />
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>
        </>
    )
}
