import { Group, Title, Card, Table } from '@mantine/core'
import { useGetUsers } from '../../../../api/users/getUsers'

import { UserDeleteButtonWithModal } from './UserDeleteButtonWithModal'
import { UsersEditButtonWithForm } from './UsersEditButtonWithForm'
import { AddUserButtonWithModal } from './AddUserButtonWithModal'

export const UsersDatatable = () => {
    const { data: users } = useGetUsers()

    if (!users) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Group justify="space-between" mb={20}>
                <Title order={2}>Autorzy</Title>
                <AddUserButtonWithModal />
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
                                        <UsersEditButtonWithForm user={user} />
                                        <UserDeleteButtonWithModal
                                            userId={user.id}
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
