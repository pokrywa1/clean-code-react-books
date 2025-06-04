import {
    ActionIcon,
    Button,
    Modal,
    Stack,
    TextInput,
    Select,
} from '@mantine/core'
import { useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { TbPencil } from 'react-icons/tb'
import { editBook } from '../../../../api/books/editBook'
import { getAuthors } from '../../../../api/authors/getAuthors'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TBook, TEditBook } from '../../../../types/book'
import { TAuthor } from '../../../../types/author'

interface BooksEditButtonWithFormProps {
    book: TBook
}

export const BooksEditButtonWithForm = ({
    book,
}: BooksEditButtonWithFormProps) => {
    const queryClient = useQueryClient()
    const [authors, setAuthors] = useState<TAuthor[]>([])
    const [openEdit, setOpenEdit] = useState(false)

    useEffect(() => {
        getAuthors().then((data) => setAuthors(data))
    }, [])

    const { mutate } = useMutation({
        mutationFn: editBook(book.id),
        onSuccess: () => {
            setOpenEdit(false)
            queryClient.invalidateQueries({ queryKey: ['books'] })
        },
    })

    const { handleSubmit, control } = useForm<TEditBook>({
        defaultValues: {
            title: book.title,
            genre: book.genre,
            authorId: book.authorId.toString(),
        },
    })

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <TextInput label="Tytuł" {...field} />
                            )}
                        />

                        <Controller
                            name="genre"
                            control={control}
                            render={({ field }) => (
                                <TextInput label="Rodzaj" {...field} />
                            )}
                        />
                        <Controller
                            name="authorId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Autor"
                                    searchable
                                    placeholder="Wybierz autora"
                                    data={authors.map((author) => ({
                                        value: author.id.toString(),
                                        label: author.name,
                                    }))}
                                    {...field}
                                />
                            )}
                        />
                        <Button type="submit">Zapisz</Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
