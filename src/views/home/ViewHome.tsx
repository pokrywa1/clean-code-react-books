import { Stack } from '@mantine/core'
import { AuthorsDatatable } from './_components/authors/AuthorsDatatable'
import { BooksDatatable } from './_components/books/BooksDatatable'

export const ViewHome = () => {
    return (
        <Stack>
            <AuthorsDatatable />
            <BooksDatatable />
        </Stack>
    )
}
