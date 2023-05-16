import { useUnit } from 'effector-solid'
import { onMount } from 'solid-js'
import { BackdropPhoto } from '../entities/backdrop/variants/backdrop-photo'
import { $theme, subscribeThemeFx, ThemeProvider } from '../features/theme'
import { Clock } from '../widgets/clock'
import { Greet } from '../widgets/greet'
import { Pomodoro } from '../widgets/pomodoro'
import './application.css'

export const App = () => {
  const currentTheme = useUnit($theme)

  onMount(() => {
    subscribeThemeFx()
  })

  return (
    <ThemeProvider value={currentTheme()}>
      <BackdropPhoto />
      <Pomodoro variant="primary" />
      <Clock variant="primary" />
      <Greet variant="primary" />
    </ThemeProvider>
  )
}
