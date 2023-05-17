import { Figma, Github, Gmail, Telegram, Twitter } from '../icons'
import { DockItem } from './dock-item'

export const tabsMap = [
  { id: 1, label: 'gmail', icon: <DockItem link="https://mail.google.com" icon={<Gmail />} /> },
  { id: 2, label: 'twitter', icon: <DockItem link="https://mail.google.com" icon={<Twitter />} /> },
  { id: 3, label: 'telegram', icon: <DockItem link="https://mail.google.com" icon={<Telegram />} /> },
  { id: 5, label: 'github', icon: <DockItem link="https://mail.google.com" icon={<Github />} /> },
  { id: 6, label: 'figma', icon: <DockItem link="https://mail.google.com" icon={<Figma />} /> },
] as const
