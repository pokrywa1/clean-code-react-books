import { Button, Modal } from '@mantine/core'
import { useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { TbPlus } from 'react-icons/tb'
import { addBook, addBookSchema } from '../../../../api/books/addBook'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TAddBook } from '../../../../types/book'
import { BookEditButtonWithForm } from './BookEditButtonWithForm'
import { notifyApiMessage } from '../../../../lib/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'

export const AddBookButtonWithModal = () => {
    const queryClient = useQueryClient()
    const [openBook, setOpenBook] = useState(false)
    const onClose = () => {
        methods.reset()
        setOpenBook(false)
    }

    const { mutate, isPending } = useMutation({
        mutationFn: addBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] })
            notifyApiMessage.success('Book added successfully')
            onClose()
        },
        onError: () => {
            notifyApiMessage.error('Error adding book')
        },
    })

    const methods = useForm<TAddBook>({
        resolver: zodResolver(addBookSchema),
    })
    const onSubmit: SubmitHandler<TAddBook> = (data) => {
        mutate({
            ...data,
            authorId: data.authorId,
        })
        reset()
    }

    const { handleSubmit, reset } = methods

    return (
        <>
            <Button
                onClick={() => setOpenBook(true)}
                leftSection={<TbPlus size={16} />}
            >
                Dodaj książkę
            </Button>
            <Modal opened={openBook} onClose={onClose} title="Dodaj książkę">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <BookEditButtonWithForm isLoading={isPending} />
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}
