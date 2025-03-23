import { MantineProvider } from '@mantine/core'
import { theme } from '../../theme'

export const ThemeProvider = ({ children }) => {
    return <MantineProvider theme={theme}>{children}</MantineProvider>
}
