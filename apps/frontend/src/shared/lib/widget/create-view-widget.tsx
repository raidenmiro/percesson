/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Widget } from './create-widget'
import { PluginCreator } from './plugins/create-plugin'
import { useUnit } from 'effector-solid'
import { Dynamic, Portal, Show } from 'solid-js/web'
import { createMemo, JSX, onCleanup, onMount } from 'solid-js'
import { Provider } from './provider'

export const createViewWidget = ({
  mountNode = document.body,
  source,
  plugins,
}: {
  mountNode?: HTMLElement
  source: Widget
  plugins: Array<PluginCreator>
}) => {
  return function ({ children }: { children: JSX.Element }) {
    const isOpen = useUnit(source.state.$isOpen)

    let ref: HTMLDivElement

    const lifecycle = createMemo(() => plugins.map(callback => callback(ref)))

    onMount(() => {
      lifecycle().forEach(callback => callback.onMount())
    })

    onCleanup(() => {
      lifecycle().forEach(callback => callback.unMount())
    })

    return (
      <Portal mount={mountNode}>
        <Show when={isOpen()} keyed={true}>
          <Provider widget={source} ref={ref!}>
            <Dynamic ref={ref!} component={children} />
          </Provider>
        </Show>
      </Portal>
    )
  }
}
