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
import { getUsers } from '../../../../api/users/getUsers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TBook, TEditBook } from '../../../../types/book'
import { TUser } from '../../../../types/user'

interface BooksEditButtonWithFormProps {
    book: TBook
}

export const BooksEditButtonWithForm = ({
    book,
}: BooksEditButtonWithFormProps) => {
    const queryClient = useQueryClient()
    const [users, setUsers] = useState<TUser[]>([])
    const [openEdit, setOpenEdit] = useState(false)

    useEffect(() => {
        getUsers().then((data) => setUsers(data))
    }, [])

    const { mutate } = useMutation({
        mutationFn: editBook(book.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] })
            setOpenEdit(false)
        },
    })

    const { handleSubmit, register, control } = useForm<TEditBook>({
        defaultValues: {
            title: book.title,
            genre: book.genre,
            authorId: book.authorId,
        },
    })

    const onSubmit: SubmitHandler<TEditBook> = (data) => {
        mutate(data)
    }

    const usersData = users.map((user) => ({
        value: user.id.toString(),
        label: user.name,
    }))

    return (
        <>
            <ActionIcon
                color="blue"
                variant="light"
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
                        <TextInput label="Tytuł" {...register('title')} />
                        <TextInput label="Gatunek" {...register('genre')} />
                        <Controller
                            name="authorId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Autor"
                                    data={usersData}
                                    value={field.value?.toString()}
                                    onChange={(value) =>
                                        field.onChange(
                                            value ? parseInt(value) : null
                                        )
                                    }
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
