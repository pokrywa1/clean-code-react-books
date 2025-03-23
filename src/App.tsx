import '@mantine/core/styles.css'
import { ThemeProvider } from './misc/theme/ThemeProvider'
import { ViewHome } from './views/home/ViewHome'

export default function App() {
  return (
    <ThemeProvider>
      <ViewHome />
    </ThemeProvider>
  )
}
