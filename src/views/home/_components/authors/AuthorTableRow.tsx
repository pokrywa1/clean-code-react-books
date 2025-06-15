import { Table, Group } from '@mantine/core'
import { TAuthor } from '../../../../types/author'
import { AuthorsEditButtonWithForm } from './AuthorsEditButtonWithForm'
import { AuthorDeleteButtonWithModal } from './AuthorDeleteButtonWithModal'
import React from 'react'

interface AuthorTableRowProps {
    author: TAuthor
}

export const AuthorTableRow = React.memo(({ author }: AuthorTableRowProps) => {
    return (
        <Table.Tr>
            <Table.Td>{author.name}</Table.Td>
            <Table.Td>{author.email}</Table.Td>
            <Table.Td>
                <Group justify="flex-end">
                    <AuthorsEditButtonWithForm author={author} />
                    <AuthorDeleteButtonWithModal authorId={author.id} />
                </Group>
            </Table.Td>
        </Table.Tr>
    )
})
