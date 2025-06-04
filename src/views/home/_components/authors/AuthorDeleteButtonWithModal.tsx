import { ActionIcon, Button, Group, Modal, Stack } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { TbTrash } from 'react-icons/tb'
import { deleteAuthor } from '../../../../api/authors/deleteAuthor'

export const AuthorDeleteButtonWithModal = ({
    authorId,
}: {
    authorId: number
}) => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)

    const { mutate } = useMutation({
        mutationFn: deleteAuthor,
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ['authors'] })
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
                    <p>Czy na pewno chcesz usunąć tego autora?</p>
                    <Group justify="flex-end">
                        <Button variant="light" onClick={() => setOpen(false)}>
                            Anuluj
                        </Button>
                        <Button color="red" onClick={() => mutate(authorId)}>
                            Usuń
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    )
}
