import '@mantine/core/styles.css'
import { Box, Container, MantineProvider } from '@mantine/core'
import { theme } from './theme'
import { ViewHome } from './views/home/ViewHome'

export default function App() {
    return (
        <MantineProvider theme={theme}>
            <Box component="main" mih={'100vh'} bg={'#f5f5f5'}>
                <Container pt={40}>
                    <ViewHome />
                </Container>
            </Box>
        </MantineProvider>
    )
}
