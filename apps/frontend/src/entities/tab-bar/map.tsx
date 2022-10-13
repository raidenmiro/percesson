import { Figma, Github, Gmail, Telegram, Twitter } from './ui/icons'
import { SetupTab } from './ui/setup-tab'
import { TabItem } from './ui/tab-item'

export const tabsMap = [
  { id: 1, label: 'gmail', icon: <TabItem link="https://mail.google.com" icon={<Gmail />} /> },
  { id: 2, label: 'twitter', icon: <TabItem link="https://mail.google.com" icon={<Twitter />} /> },
  { id: 3, label: 'telegram', icon: <TabItem link="https://mail.google.com" icon={<Telegram />} /> },
  { id: 5, label: 'github', icon: <TabItem link="https://mail.google.com" icon={<Github />} /> },
  { id: 6, label: 'figma', icon: <TabItem link="https://mail.google.com" icon={<Figma />} /> },
  { id: 7, label: 'add_new', icon: <SetupTab /> },
] as const
