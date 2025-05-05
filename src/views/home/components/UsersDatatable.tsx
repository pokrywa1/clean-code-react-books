import { Box, Container, Center, Card, Group, Table, ActionIcon } from '@mantine/core'
import { useState } from 'react'
import { TbTrash, TbPencil } from 'react-icons/tb'
import { useUsers } from '../../../misc/hooks/useUser'
import { ConfirmModal } from './ConfirmModal'
import { HomeDatatableHeaderWithAddUserButton } from './HomeDatatableHeaderWithAddUserButton'
import { UserModal } from './UserModal'

export const UsersDatatable = () => {
  const { users, handleAddUser, handleEditUser, handleDeleteUser, error } = useUsers()

  const [modalState, setModalState] = useState({
    open: false,
    mode: '',
    user: null,
  })
  const openModal = (mode, user = null) => setModalState({ open: true, mode, user })
  const closeModal = () => setModalState({ open: false, mode: '', user: null })
  return (
    <>
      <Card w="100%" withBorder>
        <Group justify="space-between">
          <HomeDatatableHeaderWithAddUserButton open={() => openModal('add')} />
          {users.length === 0 && <p>Brak autorów</p>}
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Imię</Table.Th>
                <Table.Th>Nazwisko</Table.Th>
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
                      <ActionIcon
                        variant="outline"
                        color="red"
                        onClick={() => openModal('delete', user)}
                      >
                        <TbTrash />
                      </ActionIcon>
                      <ActionIcon variant="outline" onClick={() => openModal('edit', user)}>
                        <TbPencil />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Group>
      </Card>

      <UserModal
        modalState={modalState}
        onClose={closeModal}
        onSubmit={modalState.mode === 'add' ? handleAddUser : handleEditUser}
        error={error}
      />
      <ConfirmModal
        opened={modalState.mode === 'delete'}
        onClose={closeModal}
        onConfirm={() => {
          handleDeleteUser(modalState.user.id)
          closeModal()
        }}
      />
    </>
  )
}
