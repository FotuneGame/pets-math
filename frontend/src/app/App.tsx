import { RouterProvider } from './router'
import './App.module.scss'
import { ThemeProvider } from './theme'



function App() {
  return (
    <ThemeProvider>
      <RouterProvider />
    </ThemeProvider>
  )
}

export default App
