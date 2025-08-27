import { ActionIcon, Button, Modal, Stack } from '@mantine/core'
import { useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { TbPencil } from 'react-icons/tb'
import { editBook, editBookSchema } from '../../../../api/books/editBook'
import { useGetAuthors } from '../../../../api/authors/getAuthors'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TBook, TEditBook } from '../../../../types/book'
import { InputSelectRHF } from '../../../../app/components/inputs/InputSelect'
import { InputTextRHF } from '../../../../app/components/inputs/InputText'
import { notifyApiMessage } from '../../../../lib/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { addBookSchema } from '../../../../api/books/addBook'

interface BooksEditButtonWithFormProps {
    book: TBook
}

export const BooksEditButtonWithForm = ({
    book,
}: BooksEditButtonWithFormProps) => {
    const queryClient = useQueryClient()
    const [openEdit, setOpenEdit] = useState(false)

    const { mutate } = useMutation({
        mutationFn: editBook(book.id),
        onSuccess: () => {
            setOpenEdit(false)
            queryClient.invalidateQueries({ queryKey: ['books'] })
            notifyApiMessage.success('Book edited successfully')
        },
        onError: () => {
            notifyApiMessage.error('Error editing book')
        },
    })

    const methods = useForm<TEditBook>({
        defaultValues: {
            title: book.title,
            genre: book.genre,
            authorId: book.authorId,
        },
        resolver: zodResolver(editBookSchema),
    })

    const { handleSubmit } = methods

    const onSubmit: SubmitHandler<TEditBook> = (data) => {
        mutate(data)
    }

    return (
        <>
            <ActionIcon
                variant="light"
                size="sm"
                onClick={() => setOpenEdit(true)}
            >
                <TbPencil />
            </ActionIcon>
            <Modal
                opened={openEdit}
                onClose={() => setOpenEdit(false)}
                title="Edytuj książkę"
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

export const BooksEditFormFields = () => {
    const { data: authors } = useGetAuthors()

    return (
        <Stack>
            <InputTextRHF label="Tytuł" name="title" />
            <InputTextRHF label="Gatunek" name="genre" />
            <InputSelectRHF
                name="authorId"
                label="Autor"
                data={
                    authors?.items.map((author) => ({
                        value: author.id.toString(),
                        label: author.name,
                    })) || []
                }
            />
            <Button type="submit">Zapisz</Button>
        </Stack>
    )
}
