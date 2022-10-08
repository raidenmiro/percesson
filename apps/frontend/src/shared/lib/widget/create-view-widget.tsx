import { useUnit } from 'effector-solid'
import { createEffect, createSignal, JSX, onCleanup, onMount, splitProps } from 'solid-js'
import { Dynamic, Portal, Show } from 'solid-js/web'
import { Optional } from '../types'
import { Widget } from './create-widget'
import type { Plugin, PluginCreator } from './plugins/create-plugin'

export const createViewWidget = <
  TagName extends HTMLElementTagNameMap,
  TElement = { [Key in keyof TagName]: Pick<TagName, Key> },
>({
  mountNode = document.body,
  tagName = 'div',
  connector,
  plugins,
}: {
  mountNode?: HTMLElement
  tagName?: keyof TagName
  connector: Widget // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: Array<PluginCreator<any>>
}) => {
  return function (props: { children: JSX.Element } & JSX.HTMLAttributes<TElement>) {
    const [rest, attr] = splitProps(props, ['children'])

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
          <Dynamic ref={setRef} component={tagName} {...attr}>
            {rest.children}
          </Dynamic>
        </Show>
      </Portal>
    )
  }
}
