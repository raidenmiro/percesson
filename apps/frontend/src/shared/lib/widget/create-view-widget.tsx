/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useUnit } from 'effector-solid'
import { JSX, onCleanup, onMount, splitProps } from 'solid-js'
import { Dynamic, Portal, Show } from 'solid-js/web'
import { Widget } from './create-widget'
import { PluginCreator } from './plugins/create-plugin'

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

    let ref: HTMLElement

    onMount(() => {
      const lifecycle = plugins.map(plugin => plugin(ref))
      connector.instance.addRef(ref)

      lifecycle.forEach(cb => cb.onMount())

      onCleanup(() => {
        lifecycle.forEach(cb => cb.unMount())
        connector.instance.removeRef()
      })
    })

    return (
      <Portal mount={mountNode}>
        <Show when={isOpen()} keyed={true}>
          <Dynamic ref={ref!} component={tagName} {...attr}>
            {rest.children}
          </Dynamic>
        </Show>
      </Portal>
    )
  }
}
