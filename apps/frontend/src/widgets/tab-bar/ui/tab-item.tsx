import { JSX } from 'solid-js'
import { clsx } from '../../../shared/lib/clsx'

export const TabItem = (props: { icon: JSX.Element; class?: string; link: string }) => {
  return (
    <a class={clsx(props.class)} draggable={false} href={props.link} target="_blank" rel="noopener">
      {props.icon}
    </a>
  )
}
