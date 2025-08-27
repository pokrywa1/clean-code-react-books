import { api } from '../../lib/axios'
import { TAddBook, TBook } from '../../types/book'

export const addBook = (book: TAddBook): Promise<TBook> =>
    api
        .post('/books', {
            ...book,
            authorId: Number(book.authorId),
        })
        .then(({ data }) => data)
