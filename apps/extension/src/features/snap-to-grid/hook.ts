import { useDragDropContext } from '@thisbeyond/solid-dnd'

export const useDndSnap = () => {
  const state = useDragDropContext()

  if (!state) throw new Error('[solid-dnd] you must be use provider')

  return state
}
