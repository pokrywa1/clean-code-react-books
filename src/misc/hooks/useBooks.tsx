import { useEffect, useState } from 'react'
import { addBook } from '../../api/books.ts/addBook'
import { deleteBook } from '../../api/books.ts/deleteBook'
import { editBook } from '../../api/books.ts/editBook'
import { getBooks } from '../../api/books.ts/getBooks'

export const useBooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchBooks = async () => {
    try {
      const res = await getBooks()
      const data = await res.json()
      setBooks(data)
    } catch (err) {
      setError('Failed to fetch books')
    }
  }

  const handleAddBook = async (book) => {
    try {
      setLoading(true)
      const res = await addBook(book)
      if (!res.ok) throw new Error(await res.text())
      const newBook = await res.json()
      setBooks((prev) => [...prev, newBook])
    } catch (err) {
      setError(err.message || 'Error adding book')
    } finally {
      setLoading(false)
    }
  }

  const handleEditBook = async (updatedBook) => {
    try {
      setLoading(true)
      const res = await editBook(updatedBook)
      if (!res.ok) throw new Error(await res.text())
      const editedBook = await res.json()
      setBooks((prev) => prev.map((book) => (book.id === updatedBook.id ? editedBook : book)))
    } catch (err) {
      setError(err.message || 'Error editing book')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBook = async (bookId) => {
    try {
      setLoading(true)
      const res = await deleteBook({ id: bookId })
      if (!res.ok) throw new Error(await res.text())
      setBooks((prev) => prev.filter((book) => book.id !== bookId))
    } catch (err) {
      setError(err.message || 'Error deleting book')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return { books, loading, error, handleAddBook, handleEditBook, handleDeleteBook }
}
