import './application.css'
import { useUnit } from 'effector-solid'
import { onMount } from 'solid-js'
import { Backdrop } from '../entities/backdrop/ui/backdrop'
import { TabBar } from '../entities/tab-bar/ui/tab-bar'
import { $theme, subscribeThemeFx, ThemeProvider } from '../features/theme'

export const App = () => {
  const currentTheme = useUnit($theme)

  onMount(() => {
    subscribeThemeFx()
  })

  return (
    <ThemeProvider value={currentTheme()}>
      <Backdrop
        name="aw6tcJCIhbU"
        url={{
          small:
            'https://images.unsplash.com/photo-1620121692029-d088224ddc74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjc2NjF8MHwxfGFsbHx8fHx8fHx8fDE2NjUxNDI0MTY&ixlib=rb-1.2.1&q=80&w=400',
          regular:
            'https://images.unsplash.com/photo-1620121692029-d088224ddc74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjc2NjF8MHwxfGFsbHx8fHx8fHx8fDE2NjUxNDI0MTY&ixlib=rb-1.2.1&q=80&w=1080',
          raw: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixid=MnwzNjc2NjF8MHwxfGFsbHx8fHx8fHx8fDE2NjUxNDI0MTY&ixlib=rb-1.2.1',
        }}
      />
      <div class="flex items-end justify-center h-screen w-full">
        <TabBar />
      </div>
    </ThemeProvider>
  )
}
