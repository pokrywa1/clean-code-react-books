import { Stack } from '@mantine/core'
import { UsersDatatable } from './_components/users/UsersDatatable'
import { BooksDatatable } from './_components/books/BooksDatatable'

export const ViewHome = () => {
    return (
        <Stack>
            <UsersDatatable />
            <BooksDatatable />
        </Stack>
    )
}
