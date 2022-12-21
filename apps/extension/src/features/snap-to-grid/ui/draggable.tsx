/* eslint-disable solid/reactivity */
import { createDraggable, Transformer } from '@thisbeyond/solid-dnd'
import { JSX, mergeProps } from 'solid-js'
import { useDndSnap } from '../hook'
import { getWindowClientRect, rectCache } from '../lib'
import { restrictToBoundingRect, snapToGrid } from '../modifiers'

export const MovementWidget = (_props: {
  children: JSX.Element
  id: string
  classesOnInside?: string
  gridSize?: number
}) => {
  const props = mergeProps({ classesOnInside: '', gridSize: 30 }, _props)

  const [state, { onDragStart, onDragMove, addTransformer }] = useDndSnap()
  const draggable = createDraggable(props.id)

  const getRectFromCache = rectCache()
  const windowRect = getWindowClientRect()

  const snapToGridTransformer: Transformer = {
    id: 'snap-to-grid',
    order: 300,
    callback(transform) {
      return snapToGrid({
        transform,
        gridSize: props.gridSize,
      })
    },
  }

  const limitWindowTransformer: Transformer = {
    id: 'limit-window',
    order: 200,
    callback(transform) {
      const draggable = state.active.overlay ?? state.active.draggable

      if (!draggable) {
        return transform
      }

      const node = draggable.node.childNodes.item(0)

      return restrictToBoundingRect(transform, {
        elementRect: getRectFromCache(node as HTMLElement, draggable.id),
        boundsRect: windowRect,
      })
    },
  }

  onDragStart(({ draggable }) => {
    addTransformer('draggables', draggable.id, snapToGridTransformer)
  })

  onDragMove(({ draggable }) => {
    addTransformer('draggables', draggable.id, limitWindowTransformer)
  })

  return (
    <div use:draggable classList={{ [props.classesOnInside]: draggable.isActiveDraggable }}>
      {props.children}
    </div>
  )
}
