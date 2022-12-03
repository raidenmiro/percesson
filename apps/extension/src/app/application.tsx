import './application.css'
import { useUnit } from 'effector-solid'
import { onMount } from 'solid-js'
import { BackdropPhoto } from '../entities/backdrop/variants/backdrop-photo'
import { $theme, subscribeThemeFx, ThemeProvider } from '../features/theme'

export const App = () => {
  const currentTheme = useUnit($theme)

  onMount(() => {
    subscribeThemeFx()
  })

  return (
    <ThemeProvider value={currentTheme()}>
      <BackdropPhoto />
    </ThemeProvider>
  )
}
