import { JSX, splitProps } from 'solid-js'

export interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  label: string
  customClass?: string
}

export const Button = (_props: ButtonProps) => {
  const [props, attributes] = splitProps(_props, ['label', 'customClass'])

  return (
    <button class={props.customClass} {...attributes}>
      {props.label}
    </button>
  )
}
