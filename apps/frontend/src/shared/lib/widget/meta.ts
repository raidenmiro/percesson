import { createEvent, createStore } from 'effector'

export const createRefMeta = () => {
  const removeRef = createEvent()
  const addRef = createEvent<HTMLElement>()

  const $ref = createStore<HTMLElement | null>(null)
    .on(addRef, (_, element) => element)
    .reset(removeRef)

  return {
    $ref,
    addRef,
    removeRef,
  }
}
