import { Button, Modal, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TbPlus } from 'react-icons/tb'
import { addUser, TAddUser } from '../../../../api/users/addUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const AddUserButtonWithModal = () => {
    const queryClient = useQueryClient()

    const [openUser, setOpenUser] = useState(false)

    const { mutate } = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            setOpenUser(false)
        },
    })

    const { handleSubmit, register } = useForm<TAddUser>()
    const onSubmit: SubmitHandler<TAddUser> = (data) => {
        mutate(data)
    }
    return (
        <>
            <Button leftSection={<TbPlus />} onClick={() => setOpenUser(true)}>
                Dodaj Autora
            </Button>
            <Modal
                opened={openUser}
                onClose={() => setOpenUser(false)}
                title="Dodaj autora"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TextInput label="Imię" {...register('name')} />
                        <TextInput label="Email" {...register('email')} />

                        <Button type="submit">Dodaj</Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
