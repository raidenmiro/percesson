import { createEffect, createEvent, createStore, sample } from 'effector'
import { theme } from './constance'
import { Theme } from './type'

const DEFAULT_THEME = 'dark'

const themeChosen = createEvent<Theme>()
const $theme = createStore<Theme>(DEFAULT_THEME)

const subscribeThemeFx = createEffect(async () => {
  if (typeof window === 'undefined') throw new Error('not support')

  return null
})

const loadPreferenceFx = createEffect(async () => {
  const isDark = window.matchMedia(theme.match('dark')).matches

  return isDark ? 'dark' : 'light'
})

const watchPreferenceFx = createEffect(async () => {
  const darkTheme = theme.match('dark')

  window.matchMedia(darkTheme).addEventListener('change', evt => {
    themeChosen(evt.matches ? 'dark' : 'light')
  })
})

const attachThemeFx = createEffect<{ theme: Theme }, void>(async ({ theme }) => {
  const html = document.querySelector('html')

  if (!html) throw new Error('node not found')

  for (const classes of ['dark', 'light']) {
    html.classList.remove(classes)
  }

  html.classList.add(theme)
})

sample({ clock: subscribeThemeFx.doneData, target: watchPreferenceFx })

sample({
  clock: subscribeThemeFx.doneData,
  filter: $theme.map(theme => theme === DEFAULT_THEME),
  target: loadPreferenceFx,
})

sample({ clock: $theme, filter: Boolean, fn: theme => ({ theme }), target: attachThemeFx })

$theme.on(themeChosen, (_, theme) => theme).on(loadPreferenceFx.doneData, (_, theme) => theme)

export { $theme, subscribeThemeFx, themeChosen }
