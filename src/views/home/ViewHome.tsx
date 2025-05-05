import { Box, Center, Container, Stack } from '@mantine/core'
import { UsersDatatable } from './components/UsersDatatable'
import { BooksDatatable } from './components/BooksDatatable'

export const ViewHome = () => {
  return (
    <Box component="main" mih="100vh">
      <Container mt="100px">
        <Center h="100%">
          <Stack>
            <UsersDatatable />
            <BooksDatatable />
          </Stack>
        </Center>
      </Container>
    </Box>
  )
}
