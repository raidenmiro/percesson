import { createContext, useContext } from 'solid-js'
import { Optional } from '../../../shared/lib/types'
import { Theme } from '../type'

const themeContext = createContext<Optional<Theme>>(null)

const useTheme = () => {
  const currentTheme = useContext(themeContext)

  if (!currentTheme) {
    throw new Error('theme not provided')
  }

  return currentTheme
}

const ThemeProvider = themeContext.Provider

export { ThemeProvider, useTheme }
