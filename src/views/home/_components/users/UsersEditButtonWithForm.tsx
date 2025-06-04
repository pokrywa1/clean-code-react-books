import { useState } from 'react'
import { ActionIcon, Button, Modal, Stack, TextInput } from '@mantine/core'
import { TbPencil } from 'react-icons/tb'

import { editUser } from '../../../../api/users/editUser'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TUser, TEditUser } from '../../../../types/user'

export const UsersEditButtonWithForm = ({ user }: { user: TUser }) => {
    const [opened, setOpened] = useState(false)

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: editUser(user.id),
        onSuccess: () => {
            setOpened(false)
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })

    const { handleSubmit, register } = useForm<TEditUser>({
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    })
    const onSubmit: SubmitHandler<TEditUser> = (data) => {
        mutate(data)
    }

    return (
        <>
            <ActionIcon onClick={() => setOpened(true)}>
                <TbPencil />
            </ActionIcon>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Edytuj autora"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TextInput label="Imię" {...register('name')} />
                        <TextInput label="Email" {...register('email')} />

                        <Button type="submit">Zapisz</Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
