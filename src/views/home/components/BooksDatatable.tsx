import { Card } from '@mantine/core'
import { useUsers } from '../../../misc/hooks/useUser'
import { HomeDatatableBooksWithAddUserButton } from './HomeDatatableBooksWithAddUserButton'
import { useState } from 'react'
import { BookModal } from './BookModal'
import { useBooks } from '../../../misc/hooks/useBooks'

export const BooksDatatable = () => {
  const { users } = useUsers()
  const { books, error, handleAddBook, handleDeleteBook, handleEditBook, loading } = useBooks()

  const [modalState, setModalState] = useState({
    open: false,
    mode: '',
    book: null,
  })
  const openModal = (mode, book = null) => setModalState({ open: true, mode, book })
  const closeModal = () => setModalState({ open: false, mode: '', book: null })

  return (
    <>
      <Card w="100%" withBorder>
        <HomeDatatableBooksWithAddUserButton open={() => openModal('add')} />
        {users.length === 0 && <p>Brak książek</p>}
      </Card>
      <BookModal
        modalState={modalState}
        onClose={closeModal}
        onSubmit={modalState.mode === 'add' ? handleAddBook : handleEditBook}
        error={error}
      />
    </>
  )
}
