import { useUnit } from 'effector-solid'
import { createEffect, createSignal, JSX, onCleanup, onMount, splitProps } from 'solid-js'
import { Dynamic, Portal, Show } from 'solid-js/web'
import { Optional } from '../types'
import { Widget } from './create-widget'
import type { Plugin, PluginCreator } from './plugins/create-plugin'

type Attributes<T> = JSX.HTMLAttributes<T> & { innerHTML?: string }
type PickElement<Tag> = { [Key in keyof Tag]: Pick<Tag, Key> }

interface Props<Tag extends HTMLElementTagNameMap, TElement = PickElement<Tag>> extends Attributes<TElement> {
  children?: JSX.Element
  as?: keyof Tag
  innerHTML?: string
}

export const createViewWidget = <TagName extends HTMLElementTagNameMap, TElement = PickElement<TagName>>({
  mountNode = document.body,
  connector,
  plugins,
}: {
  mountNode?: HTMLElement
  connector: Widget // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: Array<PluginCreator<any>>
}) => {
  return function (props: Props<TagName, TElement>) {
    const [rest, attr] = splitProps(props, ['children', 'as'])

    const isOpen = useUnit(connector.state.$isOpen)
    const [ref, setRef] = createSignal<Optional<HTMLElement>>(null)

    let pluginsList: Plugin[] = []

    createEffect(() => {
      const element = ref()

      if (element != null) {
        pluginsList = plugins.map(plugin => plugin(ref))
        connector.instance.addRef(element)
      }
    })

    onMount(() => {
      pluginsList.forEach(cb => cb.onMount())

      onCleanup(() => {
        pluginsList.forEach(cb => cb.unMount())
        connector.instance.removeRef()
      })
    })

    return (
      <Portal mount={mountNode}>
        <Show when={isOpen()} keyed={true}>
          <Dynamic ref={setRef} component={rest.as ?? 'div'} {...attr}>
            {rest.children}
          </Dynamic>
        </Show>
      </Portal>
    )
  }
}
