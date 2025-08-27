import { Table, Group } from '@mantine/core'
import { TBook } from '../../../../types/book'
import { BooksEditButtonWithForm } from './BookEditButtonWithForm'

import React from 'react'
import { BookDeleteButtonWithModal } from './BookDeleteButtonWithModal'

interface BooksTableRowProps {
    book: TBook
}

export const BooksTableRow = React.memo(({ book }: BooksTableRowProps) => {
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
