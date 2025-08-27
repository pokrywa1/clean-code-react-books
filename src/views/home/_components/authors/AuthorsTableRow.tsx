import { Table, Group } from '@mantine/core'
import { TAuthor } from '../../../../types/author'
import { AuthorEditButtonWithForm } from './AuthorEditButtonWithForm'
import { AuthorDeleteButtonWithModal } from './AuthorDeleteButtonWithModal'
import React from 'react'

interface AuthorTableRowProps {
    author: TAuthor
}

export const AuthorsTableRow = React.memo(({ author }: AuthorTableRowProps) => {
    return (
        <Table.Tr>
            <Table.Td>{author.name}</Table.Td>
            <Table.Td>{author.email}</Table.Td>
            <Table.Td>
                <Group justify="flex-end">
                    <AuthorEditButtonWithForm author={author} />
                    <AuthorDeleteButtonWithModal authorId={author.id} />
                </Group>
            </Table.Td>
        </Table.Tr>
    )
})
