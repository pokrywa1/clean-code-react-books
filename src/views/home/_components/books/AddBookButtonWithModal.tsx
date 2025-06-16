import { Button, Modal } from '@mantine/core'
import { useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { TbPlus } from 'react-icons/tb'
import { addBook } from '../../../../api/books/addBook'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TAddBook } from '../../../../types/book'
import { BooksEditFormFields } from './BooksEditButtonWithForm'

export const AddBookButtonWithModal = () => {
    const queryClient = useQueryClient()
    const [openBook, setOpenBook] = useState(false)

    const { mutate } = useMutation({
        mutationFn: addBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] })
            setOpenBook(false)
        },
    })

    const methods = useForm<TAddBook>()
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
            <Modal
                opened={openBook}
                onClose={() => setOpenBook(false)}
                title="Dodaj książkę"
            >
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <BooksEditFormFields />
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}
