import { Transformer } from '@thisbeyond/solid-dnd'
import { useDndSnap } from '../hook'
import { getWindowClientRect, rectCache } from '../lib'
import { restrictToBoundingRect, snapToGrid } from '../modifiers'

export const ConstrainDrag = (props: { gridSize?: number }) => {
  const [state, { onDragStart, onDragMove, addTransformer }] = useDndSnap()

  const getRectFromCache = rectCache()
  const windowRect = getWindowClientRect()

  const snapToGridTransformer: Transformer = {
    id: 'snap-to-grid',
    order: 300,
    callback(transform) {
      return snapToGrid({
        transform,
        gridSize: props.gridSize ?? 30,
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

  return <></>
}
