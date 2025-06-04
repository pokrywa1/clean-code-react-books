import { Button, Modal, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TbPlus } from 'react-icons/tb'
import { addAuthor } from '../../../../api/authors/addAuthor'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TAddAuthor } from '../../../../types/author'

export const AddAuthorButtonWithModal = () => {
    const queryClient = useQueryClient()

    const [openAuthor, setOpenAuthor] = useState(false)

    const { mutate } = useMutation({
        mutationFn: addAuthor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authors'] })
            setOpenAuthor(false)
        },
    })

    const { handleSubmit, register, reset } = useForm<TAddAuthor>()
    const onSubmit: SubmitHandler<TAddAuthor> = (data) => {
        mutate(data)
        reset()
    }

    return (
        <>
            <Button
                onClick={() => setOpenAuthor(true)}
                leftSection={<TbPlus size={16} />}
            >
                Dodaj autora
            </Button>
            <Modal
                opened={openAuthor}
                onClose={() => setOpenAuthor(false)}
                title="Dodaj autora"
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
