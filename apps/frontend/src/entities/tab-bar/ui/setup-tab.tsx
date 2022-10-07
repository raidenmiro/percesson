import { createMemo, createSignal } from 'solid-js'
import { Plus } from '../../../shared/icons/plus'

export const SetupTab = (props: { onClick?(): void }) => {
  const [rotate, toggle] = createSignal(false)

  const classes = createMemo(() => ({
    'w-9 h-9 fill-white stroke-2': true,
    '-rotate-45': rotate(),
  }))

  return (
    <button
      type="button"
      classList={{
        'relative w-12 h-12 transition-all': true,
        'flex items-center justify-center rounded-full': true,
        'bg-gradient-to-r from-cyan-600 to-blue-600': rotate(),
        'bg-gradient-to-r from-cyan-500 to-blue-500': !rotate(),
      }}
      onClick={() => {
        toggle(prev => !prev)
        props.onClick?.()
      }}>
      <Plus classList={classes()} style={{ transition: 'all 0.5s' }} />
    </button>
  )
}
