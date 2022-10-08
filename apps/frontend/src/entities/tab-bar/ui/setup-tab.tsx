/* eslint-disable @typescript-eslint/no-namespace */
import { createMemo, createSignal, onCleanup } from 'solid-js'
import { Plus } from '../../../shared/icons/plus'

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside: <TElement extends HTMLElement>(el: TElement, accessor: () => void) => void
    }
  }
}

export const clickOutside = <TElement extends HTMLElement>(el: TElement, accessor: () => () => void) => {
  const root = document.body // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = (evt: MouseEvent & { target: any }) => !el.contains(evt.target) && accessor()()

  root.addEventListener('click', onClick)
  onCleanup(() => document.body.removeEventListener('click', onClick))
}

export const SetupTab = (props: { onClick?(): void }) => {
  const [rotate, toggle] = createSignal(false)

  const classes = createMemo(() => ({
    'w-9 h-9 fill-white stroke-2': true,
    '-rotate-45': rotate(),
  }))

  return (
    <button
      type="button"
      use:clickOutside={() => toggle(false)}
      classList={{
        'relative w-12 h-12 transition-all': true,
        'flex items-center justify-center rounded-full': true,
        'bg-gradient-to-r from-cyan-600 to-blue-600': rotate(),
        'bg-gradient-to-r from-cyan-500 to-blue-500': !rotate(),
      }}
      onClick={() => {
        toggle(!rotate())
        props.onClick?.()
      }}>
      <Plus classList={classes()} style={{ transition: 'all 0.5s' }} />
    </button>
  )
}
