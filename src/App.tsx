import '@mantine/core/styles.css'
import { Box, Container, MantineProvider } from '@mantine/core'
import { theme } from './theme'
import { ViewHome } from './views/home/ViewHome'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme}>
                <Box component="main" mih={'100vh'} bg={'#f5f5f5'}>
                    <Container pt={40}>
                        <ViewHome />
                    </Container>
                </Box>
            </MantineProvider>
        </QueryClientProvider>
    )
}
