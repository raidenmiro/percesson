import './application.css'
import { useUnit } from 'effector-solid'
import { onMount } from 'solid-js'
import { BackdropPhoto } from '../entities/backdrop/variants/backdrop-photo'
import { $theme, subscribeThemeFx, ThemeProvider } from '../features/theme'
import { Dock } from '../widgets/dock'
import { Pomodoro } from '../widgets/pomodoro'

export const App = () => {
  const currentTheme = useUnit($theme)

  onMount(() => {
    subscribeThemeFx()
  })

  return (
    <ThemeProvider value={currentTheme()}>
      {/* <BackdropPhoto /> */}
      <Pomodoro variant="primary" />
      <Dock variant="default" />
    </ThemeProvider>
  )
}
