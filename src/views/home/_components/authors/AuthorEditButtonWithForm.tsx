import { useState } from 'react'
import { ActionIcon, Button, Modal, Stack, TextInput } from '@mantine/core'
import { TbPencil } from 'react-icons/tb'

import {
    editAuthor,
    editAuthorSchema,
} from '../../../../api/authors/editAuthor'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TAuthor, TEditAuthor } from '../../../../types/author'
import { notifyApiMessage } from '../../../../lib/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputTextRHF } from '../../../../app/components/inputs/InputText'

export const AuthorEditButtonWithForm = ({ author }: { author: TAuthor }) => {
    const [opened, setOpened] = useState(false)
    const onClose = () => {
        setOpened(false)
        methods.reset()
    }

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: editAuthor(author.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authors'] })
            notifyApiMessage.success('Author edited successfully')
            onClose()
        },
        onError: () => {
            notifyApiMessage.error('Error editing author')
        },
    })

    const methods = useForm<TEditAuthor>({
        defaultValues: {
            name: author.name,
            email: author.email,
        },
        resolver: zodResolver(editAuthorSchema),
    })
    const onSubmit: SubmitHandler<TEditAuthor> = (data) => {
        mutate(data)
    }

    return (
        <FormProvider {...methods}>
            <ActionIcon
                variant="light"
                size="sm"
                onClick={() => setOpened(true)}
            >
                <TbPencil />
            </ActionIcon>
            <Modal opened={opened} onClose={onClose} title="Edytuj autora">
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
