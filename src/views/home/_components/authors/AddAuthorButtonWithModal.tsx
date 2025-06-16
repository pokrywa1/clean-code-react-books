import { Button, Modal, Stack } from '@mantine/core'
import { useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { TbPlus } from 'react-icons/tb'
import { addAuthor } from '../../../../api/authors/addAuthor'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TAddAuthor } from '../../../../types/author'
import { InputTextRHF } from '../../../../app/components/inputs/InputText'

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

    const methods = useForm<TAddAuthor>()
    const onSubmit: SubmitHandler<TAddAuthor> = (data) => {
        mutate(data)
        methods.reset()
    }

    return (
        <FormProvider {...methods}>
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
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Stack>
                        <InputTextRHF label="Imię" name="name" />
                        <InputTextRHF label="Email" name="email" />
                        <Button type="submit">Zapisz</Button>
                    </Stack>
                </form>
            </Modal>
        </FormProvider>
    )
}
