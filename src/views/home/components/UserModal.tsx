import { Button, Modal, SimpleGrid, Stack, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'

export const UserModal = ({ modalState, onClose, onSubmit, error }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (modalState.user) {
            setName(modalState.user.name)
            setEmail(modalState.user.email)
        } else {
            setName('')
            setEmail('')
        }
    }, [modalState])

    const handleSubmit = () => {
        onSubmit({ id: modalState.user?.id, name, email })
        onClose()
    }

    return (
        <Modal title="Autor" opened={modalState.open} onClose={onClose}>
            <Stack>
                <SimpleGrid cols={2}>
                    <TextInput
                        label="Imię"
                        placeholder="Wpisz imię"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextInput
                        label="E-mail"
                        placeholder="Wpisz e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </SimpleGrid>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button onClick={handleSubmit}>Zapisz</Button>
            </Stack>
        </Modal>
    )
}
