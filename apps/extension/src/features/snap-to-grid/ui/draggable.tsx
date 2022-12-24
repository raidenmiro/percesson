import { createDraggable } from '@thisbeyond/solid-dnd'
import { JSX, mergeProps } from 'solid-js'

export const MovementWidget = (_props: {
  children: JSX.Element
  id: string
  classesOnInside?: string
  edit?: boolean
}) => {
  const props = mergeProps({ classesOnInside: '' }, _props)
  // eslint-disable-next-line solid/reactivity
  const draggable = createDraggable(props.id)

  return (
    <div
      use:draggable
      classList={{ [props.classesOnInside]: draggable.isActiveDraggable, 'cursor-move': props.edit ?? true }}>
      {props.children}
    </div>
  )
}
