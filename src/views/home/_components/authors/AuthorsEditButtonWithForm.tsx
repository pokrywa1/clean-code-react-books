import { useState } from 'react'
import { ActionIcon, Button, Modal, Stack, TextInput } from '@mantine/core'
import { TbPencil } from 'react-icons/tb'

import { editAuthor } from '../../../../api/authors/editAuthor'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TAuthor, TEditAuthor } from '../../../../types/author'

export const AuthorsEditButtonWithForm = ({ author }: { author: TAuthor }) => {
    const [opened, setOpened] = useState(false)

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: editAuthor(author.id),
        onSuccess: () => {
            setOpened(false)
            queryClient.invalidateQueries({ queryKey: ['authors'] })
        },
    })

    const { handleSubmit, register } = useForm<TEditAuthor>({
        defaultValues: {
            name: author.name,
            email: author.email,
        },
    })
    const onSubmit: SubmitHandler<TEditAuthor> = (data) => {
        mutate(data)
    }

    return (
        <>
            <ActionIcon
                variant="light"
                size="sm"
                onClick={() => setOpened(true)}
            >
                <TbPencil />
            </ActionIcon>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Edytuj autora"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TextInput label="Imię" {...register('name')} />
                        <TextInput label="Email" {...register('email')} />
                        <Button type="submit">Zapisz</Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
