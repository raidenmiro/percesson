import { createSignal, For } from 'solid-js'
import { DockFactory } from '../../factory'
import { tabsMap } from './map'

export interface DockProps {
  showHint?: boolean
}

export const DockBase = (_props: DockProps) => {
  const [tabs, _updateTabs] = createSignal(tabsMap)

  const styles = () => ({
    background: 'rgba(83, 83, 83, 0.25)',
    border: ' 2px solid rgba(255, 255, 255, 0.18)',
    'backdrop-filter': 'blur(13px)',
    '-webkit-backdrop-filter': 'blur(13px)',
    'border-radius': '16px',
  })

  return (
    <DockFactory style={styles()} class="w-auto h-16 mb-10 flex justify-center absolute">
      <ul class="w-full flex items-center justify-center px-3">
        <For each={tabs()}>
          {item => (
            <li class="flex items-center justify-center align-bottom pr-4 pl-1 duration-200 hover:-translate-y-5 hover:scale-125 hover:mr-4 hover:ml-4">
              {item.icon}
            </li>
          )}
        </For>
      </ul>
    </DockFactory>
  )
}
