/* eslint-disable solid/reactivity */
import { createDroppable } from '@thisbeyond/solid-dnd'
import { createEffect } from 'effector'
import { createSignal, JSX, mergeProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { Optional } from '../../../shared/lib/types'

export const Droppable = (_props: { children: JSX.Element; id: string; classesDropAccept?: string }) => {
  const props = mergeProps(_props, { classesDropAccept: '' })

  const [ref, setRef] = createSignal<Optional<HTMLDivElement>>(null)
  const droppable = createDroppable(props.id)

  createEffect(() => {
    const element = ref()
    if (element) droppable(element)
  })

  return (
    <Dynamic
      component={props.children}
      ref={setRef}
      classList={{ [props.classesDropAccept]: droppable.isActiveDroppable }}
    />
  )
}
