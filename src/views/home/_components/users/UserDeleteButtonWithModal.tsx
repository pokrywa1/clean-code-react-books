import { ActionIcon, Button, Group, Modal, Stack } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { TbTrash } from 'react-icons/tb'
import { deleteUser } from '../../../../api/users/deleteUser'

export const UserDeleteButtonWithModal = ({ userId }: { userId: number }) => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)

    const { mutate } = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })

    return (
        <>
            <ActionIcon color="red" onClick={() => setOpen(true)}>
                <TbTrash />
            </ActionIcon>

            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title="Usuń autora"
            >
                <Stack>
                    <p>Czy na pewno chcesz usunąć autora?</p>
                    <Group justify="flex-end">
                        <Button onClick={() => setOpen(false)}>Anuluj</Button>
                        <Button color="red" onClick={() => mutate(userId)}>
                            Usuń
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    )
}
