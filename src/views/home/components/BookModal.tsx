import { Button, Modal, Select, SimpleGrid, Stack, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useUsers } from '../../../misc/hooks/useUser'

export const BookModal = ({ modalState, onClose, onSubmit, error }) => {
  const { users } = useUsers()
  const [title, setTitle] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [genre, setGenre] = useState('')

  useEffect(() => {
    if (modalState.book) {
      setTitle(modalState.book.title)
      setAuthorId(modalState.book.authorId)
      setGenre(modalState.book.genre)
    } else {
      setTitle('')
      setAuthorId('')
      setGenre('')
    }
  }, [modalState])

  const handleSubmit = () => {
    const numericAuthorId = Number(authorId)

    if (isNaN(numericAuthorId)) {
      console.error('authorId musi być liczbą')
      return
    }

    onSubmit({ id: modalState.book?.id, title, authorId: numericAuthorId, genre })
    onClose()
  }
  console.log(users.map((user) => ({ value: user.id.toString(), label: user.name })))

  return (
    <Modal title="Książka" opened={modalState.open} onClose={onClose}>
      <Stack>
        <SimpleGrid cols={2}>
          <TextInput
            label="Tytuł"
            placeholder="Wpisz tytuł"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextInput
            label="Gatunek"
            placeholder="Wpisz gatunek"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <Select
            data={users.map((user) => ({ value: user.id.toString(), label: user.name }))}
            label="Autor"
            placeholder="Wpisz autora"
            value={authorId}
            onChange={(e) => {
              console.log(e)
              setAuthorId(e)
            }}
          />
        </SimpleGrid>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button onClick={handleSubmit}>Zapisz</Button>
      </Stack>
    </Modal>
  )
}
