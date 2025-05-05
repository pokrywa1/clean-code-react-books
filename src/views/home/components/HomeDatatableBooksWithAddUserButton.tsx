import { Group, Title, Button } from '@mantine/core'
import { TbPlus } from 'react-icons/tb'

export const HomeDatatableBooksWithAddUserButton = ({ open }) => {
  return (
    <Group w={'100%'} justify="space-between">
      <Title order={1}>Książki</Title>
      <Button leftSection={<TbPlus />} onClick={open}>
        Dodaj Książke
      </Button>
    </Group>
  )
}
