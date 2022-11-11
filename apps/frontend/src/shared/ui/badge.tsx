import { JSX, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { clsx } from '../lib/clsx'

const Anchor = (_props: { children: JSX.Element; customClass?: string } & JSX.HTMLAttributes<HTMLDivElement>) => {
  const [props, attributes] = splitProps(_props, ['customClass', 'children'])

  return (
    <div class={clsx('relative', props.customClass)} {...attributes}>
      {props.children}
    </div>
  )
}

const Notify = (props: {
  as?: keyof HTMLElementTagNameMap
  variant?: 'square' | 'circle'
  customClass?: string
  baseColor: string
  bgColor: string
  placement?: 'start-left' | 'start-right' | 'bottom-left' | 'bottom-right'
  label: string | JSX.Element
}) => {
  const getVariant = () => props.variant ?? 'circle'
  const getPosition = () => props.placement ?? 'start-right'

  const styles = () => ({
    '--badge-color': props.baseColor,
    'border-width': 1,
    color: 'var(--badge-color)',
    background: props.bgColor,
    'border-color': 'var(--badge-color)',
  })

  return (
    <Dynamic
      style={styles()}
      component={props.as ?? 'span'}
      class={clsx('inline-flex justify-center items-center font-bold absolute', props.customClass)}
      classList={{
        'rounded-full': getVariant() === 'circle',
        'rounded-sm': getVariant() === 'square',
        '-top-2 -right-2': getPosition() === 'start-right',
        '-top-2 -right-2 bottom-0': getPosition() === 'bottom-right',
        '-top-2 -left-2': getPosition() === 'start-left',
        '-top-2 -left-2 bottom-0': getPosition() === 'bottom-left',
      }}>
      {props.label}
    </Dynamic>
  )
}

export const Badge = {
  Anchor,
  Notify,
}
