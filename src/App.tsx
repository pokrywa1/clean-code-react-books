import '@mantine/core/styles.css'
import {
    Box,
    Button,
    Card,
    Center,
    Container,
    Group,
    MantineProvider,
    Table,
    Title,
} from '@mantine/core'
import { theme } from './theme'
import { TbPlus } from 'react-icons/tb'
import { useEffect, useState } from 'react'

export default function App() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
                console.log(data)
            })
            .catch((error) => console.error('Error fetching users:', error))
    }, [])
    return (
        <MantineProvider theme={theme}>
            <Box component="main" mih={'100vh'}>
                <Container mt={'100px'}>
                    <Center h={'100%'}>
                        <Card w={'100%'} withBorder>
                            <Group justify="space-between">
                                <Title order={1}>Autorzy</Title>
                                <Button leftSection={<TbPlus />}>
                                    Dodaj Autora
                                </Button>
                                {users.length === 0 && <p>Brak autorów</p>}
                                <Table>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>Imię</Table.Th>
                                            <Table.Th>Nazwisko</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {users.map((user) => (
                                            <Table.Tr key={user.id}>
                                                <Table.Td>{user.name}</Table.Td>
                                                <Table.Td>
                                                    {user.email}
                                                </Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            </Group>
                        </Card>
                    </Center>
                </Container>
            </Box>
        </MantineProvider>
    )
}
