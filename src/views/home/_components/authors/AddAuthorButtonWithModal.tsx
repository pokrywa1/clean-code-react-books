import { Button, Modal, Stack } from '@mantine/core'
import { useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { TbPlus } from 'react-icons/tb'
import { addAuthor, addAuthorSchema } from '../../../../api/authors/addAuthor'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TAddAuthor } from '../../../../types/author'
import { InputTextRHF } from '../../../../app/components/inputs/InputText'
import { notifyApiMessage } from '../../../../lib/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'

export const AddAuthorButtonWithModal = () => {
    const queryClient = useQueryClient()

    const [openAuthor, setOpenAuthor] = useState(false)

    const { mutate, isPending } = useMutation({
        mutationFn: addAuthor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authors'] })
            setOpenAuthor(false)
            notifyApiMessage.success('Author added successfully')
            methods.reset()
        },
        onError: () => {
            notifyApiMessage.error('Error adding author')
        },
    })

    const methods = useForm<TAddAuthor>({
        resolver: zodResolver(addAuthorSchema),
    })
    const onSubmit: SubmitHandler<TAddAuthor> = (data) => {
        mutate(data)
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
                        <Button loading={isPending} type="submit">
                            Zapisz
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </FormProvider>
    )
}
