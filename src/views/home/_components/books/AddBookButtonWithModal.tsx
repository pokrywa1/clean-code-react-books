import { Button, Modal, Stack, TextInput, Select } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { TbPlus } from 'react-icons/tb'
import { addBook } from '../../../../api/books/addBook'
import { getUsers } from '../../../../api/users/getUsers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TAddBook } from '../../../../types/book'
import { TUser } from '../../../../types/user'

export const AddBookButtonWithModal = () => {
    const queryClient = useQueryClient()
    const [users, setUsers] = useState<TUser[]>([])
    const [openBook, setOpenBook] = useState(false)

    useEffect(() => {
        getUsers().then((data) => setUsers(data))
    }, [])

    const { mutate } = useMutation({
        mutationFn: addBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] })
            setOpenBook(false)
        },
    })

    const { handleSubmit, register, control } = useForm<TAddBook>()
    const onSubmit: SubmitHandler<TAddBook> = (data) => {
        mutate(data)
    }

    return (
        <>
            <Button leftSection={<TbPlus />} onClick={() => setOpenBook(true)}>
                Dodaj Książkę
            </Button>
            <Modal
                opened={openBook}
                onClose={() => setOpenBook(false)}
                title="Dodaj książkę"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TextInput label="Tytuł" {...register('title')} />
                        <TextInput label="Gatunek" {...register('genre')} />
                        <Controller
                            name="authorId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Autor"
                                    data={users.map((user) => ({
                                        value: user.id.toString(),
                                        label: user.name,
                                    }))}
                                    {...field}
                                />
                            )}
                        />
                        <Button type="submit">Dodaj</Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
