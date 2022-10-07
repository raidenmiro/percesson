import { createMemo, createSignal, For } from 'solid-js'
import { Figma, Github, Gmail, Telegram, Twitter } from './icons'
import { SetupTab } from './setup-tab'
import { TabItem } from './tab-item'

const tabsMap = [
  { id: 1, label: 'gmail', icon: <TabItem link="https://mail.google.com" icon={<Gmail />} /> },
  { id: 2, label: 'twitter', icon: <TabItem link="https://mail.google.com" icon={<Twitter />} /> },
  { id: 3, label: 'telegram', icon: <TabItem link="https://mail.google.com" icon={<Telegram />} /> },
  { id: 5, label: 'github', icon: <TabItem link="https://mail.google.com" icon={<Github />} /> },
  { id: 6, label: 'figma', icon: <TabItem link="https://mail.google.com" icon={<Figma />} /> },
  { id: 7, label: 'add_new', icon: <SetupTab /> },
] as const

export interface TabBarProps {
  showHint?: boolean
}

export const TabBar = (_props: TabBarProps) => {
  const [tabs, _updateTabs] = createSignal(tabsMap)

  const classes = createMemo(() => ({
    background: 'rgba(83, 83, 83, 0.25)',
    border: ' 2px solid rgba(255, 255, 255, 0.18)',
    'backdrop-filter': 'blur(13px)',
    '-webkit-backdrop-filter': 'blur(13px)',
    'border-radius': '16px',
  }))

  return (
    <div
      style={classes()}
      classList={{
        'w-auto h-16 mb-10': true,
        'flex justify-center absolute': true,
      }}>
      <ul class="w-full flex items-center justify-center px-3">
        <For each={tabs()}>
          {item => (
            <li
              style={
                item.label === 'add_new'
                  ? {
                      'padding-left': '15px',
                      'padding-right': '4px',
                      'border-left': '2px solid rgba(255, 255, 255, 0.4)',
                      'margin-left': '20px',
                    }
                  : {}
              }
              classList={{
                'flex items-center justify-center align-bottom pr-4 pl-1 duration-200': true,
                'hover:-translate-y-5 hover:scale-125 hover:mr-4 hover:ml-4': item.label !== 'add_new',
              }}>
              {item.icon}
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}
