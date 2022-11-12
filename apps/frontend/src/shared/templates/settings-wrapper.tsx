import { JSX } from 'solid-js'
import { Badge } from '../ui/badge'

export const SettingsWrapper = (props: { children: JSX.Element }) => {
  return (
    <Badge.Anchor customClass="max-w-md group">
      {props.children}
      <Badge.Notify
        as="button"
        customClass="transition-opacity duration-300 opacity-0 group-hover:opacity-100 p-1"
        baseColor="white"
        bgColor="orange"
        label={<SettingsSvg />}
      />
    </Badge.Anchor>
  )
}

const SettingsSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="var(--badge-color)"
      viewBox="0 0 24 24"
      stroke-width={1.5}
      stroke="currentColor"
      class="w-5 h-5">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
      />
    </svg>
  )
}
