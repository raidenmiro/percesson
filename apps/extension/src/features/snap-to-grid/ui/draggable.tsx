/* eslint-disable solid/reactivity */
import { createDraggable, Transformer } from '@thisbeyond/solid-dnd'
import { JSX, mergeProps } from 'solid-js'
import { useDndSnap } from '../hook'
import { getBounds, restrictToBoundingRect, snapToGrid } from '../lib'

export const MovementWidget = (_props: {
  children: JSX.Element
  id: string
  classesOnInside?: string
  gridSize?: number
}) => {
  const props = mergeProps({ classesOnInside: '', gridSize: 30 }, _props)

  const [state, { onDragStart, addTransformer }] = useDndSnap()
  const draggable = createDraggable(props.id)

  const snapToGridTransformer: Transformer = {
    id: 'snap-to-grid',
    order: 100,
    callback(transform) {
      return snapToGrid({
        transform,
        gridSize: props.gridSize,
      })
    },
  }

  const limitWindowTransformer: Transformer = {
    id: 'limit-window',
    order: 100,
    callback(transform) {
      const draggable = state.active.overlay ?? state.active.draggable

      if (!draggable) {
        return transform
      }

      return restrictToBoundingRect(transform, {
        elementRect: draggable.node.getBoundingClientRect(),
        boundsRect: getBounds(),
      })
    },
  }

  onDragStart(({ draggable }) => {
    addTransformer('draggables', draggable.id, snapToGridTransformer)
  })

  return (
    <div use:draggable classList={{ [props.classesOnInside]: draggable.isActiveDraggable }}>
      {props.children}
    </div>
  )
}
