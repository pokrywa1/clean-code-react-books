import { ActionIcon, Button, Group, Modal, Text } from '@mantine/core'
import { useState } from 'react'
import { TbTrash } from 'react-icons/tb'
import { deleteBook } from '../../../../api/books/deleteBook'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface BookDeleteButtonWithModalProps {
    bookId: string
}

export const BookDeleteButtonWithModal = ({
    bookId,
}: BookDeleteButtonWithModalProps) => {
    const queryClient = useQueryClient()
    const [openDelete, setOpenDelete] = useState(false)

    const { mutate } = useMutation({
        mutationFn: deleteBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] })
            setOpenDelete(false)
        },
    })

    const handleDelete = () => {
        mutate(bookId)
    }

    return (
        <>
            <ActionIcon
                color="red"
                variant="light"
                onClick={() => setOpenDelete(true)}
            >
                <TbTrash />
            </ActionIcon>
            <Modal
                opened={openDelete}
                onClose={() => setOpenDelete(false)}
                title="Usuń książkę"
            >
                <Text>Czy na pewno chcesz usunąć tę książkę?</Text>
                <Group justify="flex-end" mt="md">
                    <Button
                        variant="outline"
                        onClick={() => setOpenDelete(false)}
                    >
                        Anuluj
                    </Button>
                    <Button color="red" onClick={handleDelete}>
                        Usuń
                    </Button>
                </Group>
            </Modal>
        </>
    )
}
