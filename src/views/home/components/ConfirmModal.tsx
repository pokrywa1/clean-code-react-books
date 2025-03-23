import { Modal, Button, Stack, Group } from '@mantine/core'

export const ConfirmModal = ({ opened, onClose, onConfirm }) => {
    return (
        <Modal title="Potwierdź" opened={opened} onClose={onClose}>
            <Stack>
                <p>Czy na pewno chcesz usunąć tego użytkownika?</p>
                <Group justify="flex-end">
                    <Button variant="outline" onClick={onClose}>
                        Anuluj
                    </Button>
                    <Button color="red" onClick={onConfirm}>
                        Usuń
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}
