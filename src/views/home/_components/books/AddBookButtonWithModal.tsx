import { Button, Modal, Select, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { TbPlus } from 'react-icons/tb'
import { addBook } from '../../../../api/books/addBook'
import { useGetAuthors } from '../../../../api/authors/getAuthors'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TAddBook } from '../../../../types/book'

export const AddBookButtonWithModal = () => {
    const queryClient = useQueryClient()
    const [openBook, setOpenBook] = useState(false)
    const { data: authors } = useGetAuthors()

    const { mutate } = useMutation({
        mutationFn: addBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] })
            setOpenBook(false)
        },
    })

    const { handleSubmit, control, reset } = useForm<TAddBook>()
    const onSubmit: SubmitHandler<TAddBook> = (data) => {
        mutate({
            ...data,
            authorId: data.authorId,
        })
        reset()
    }

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
                                    data={authors?.map((author) => ({
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
