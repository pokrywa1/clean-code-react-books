import { Table, Group } from '@mantine/core'
import { TBook } from '../../../../types/book'
import { BooksEditButtonWithForm } from './BooksEditButtonWithForm'
import { BookDeleteButtonWithModal } from './BookDeleteButtonWithModal'
import React from 'react'

interface BookTableRowProps {
    book: TBook
}

export const BookTableRow = React.memo(({ book }: BookTableRowProps) => {
    return (
        <Table.Tr>
            <Table.Td>{book.title}</Table.Td>
            <Table.Td>{book.genre}</Table.Td>
            <Table.Td>{book.author?.name}</Table.Td>
            <Table.Td>
                <Group justify="flex-end">
                    <BooksEditButtonWithForm book={book} />
                    <BookDeleteButtonWithModal bookId={book.id} />
                </Group>
            </Table.Td>
        </Table.Tr>
    )
})
