import { Button, Group, Title } from '@mantine/core'
import { TbPlus } from 'react-icons/tb'

export const HomeDatatableHeaderWithAddUserButton = ({ open }) => {
    return (
        <Group w={'100%'} justify="space-between">
            <Title order={1}>Autorzy</Title>
            <Button leftSection={<TbPlus />} onClick={open}>
                Dodaj Autora
            </Button>
        </Group>
    )
}
