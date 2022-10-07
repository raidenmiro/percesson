import { JSX } from 'solid-js'

export const TabItem = (props: { icon: JSX.Element; class?: string; link: string }) => {
  return (
    <a class={`${props.class ?? ''}`} href={props.link} target="_blank" rel="noopener">
      {props.icon}
    </a>
  )
}
