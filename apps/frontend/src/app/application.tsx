import './application.css'
import { useUnit } from 'effector-solid'
import { onMount } from 'solid-js'
import { $theme, subscribeThemeFx, ThemeProvider } from '../features/theme'

export const App = () => {
  const currentTheme = useUnit($theme)

  onMount(() => {
    subscribeThemeFx()
  })

  return (
    <ThemeProvider value={currentTheme()}>
      <div>it's cool!</div>
    </ThemeProvider>
  )
}
