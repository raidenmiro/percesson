import { useUnit } from 'effector-solid'
import { createEffect, createSignal, JSX, onCleanup, onMount, Setter, splitProps } from 'solid-js'
import { Dynamic, Portal, Show } from 'solid-js/web'
import { Optional } from '../types'
import { Widget } from './create-widget'
import type { Plugin, PluginCreator } from './plugins/create-plugin'

interface WidgetContentFC {
  isOpen: boolean
  set: Setter<Optional<HTMLElement>>
  component: JSX.Element
  as?: keyof HTMLElementTagNameMap
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: JSX.HTMLAttributes<any>
}

// TODO FIX
const WidgetContent = (_props: WidgetContentFC) => {
  return (
    <Show when={_props.isOpen} keyed={true}>
      {/* eslint-disable-next-line solid/reactivity */}
      <Dynamic ref={_props.set} component={_props.as ?? 'div'} {..._props.attributes}>
        {_props.component}
      </Dynamic>
    </Show>
  )
}

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
  extend,
}: {
  mountNode?: HTMLElement
  connector: Widget // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: Array<PluginCreator<any>>
  extend?: (widget: JSX.Element) => JSX.Element
}) => {
  return function (_props: Props<TagName, TElement>) {
    const [props, attributes] = splitProps(_props, ['children', 'as'])

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
        <Show when={isDefined(extend)} keyed={true}>
          {extend =>
            extend(
              <WidgetContent
                isOpen={isOpen()}
                attributes={attributes}
                set={setRef}
                component={props.children}
                as={props.as as keyof HTMLElementTagNameMap}
              />,
            )
          }
        </Show>
        <Show when={!isDefined(extend)} keyed={false}>
          <WidgetContent
            isOpen={isOpen()}
            attributes={attributes}
            set={setRef}
            component={props.children}
            as={props.as as keyof HTMLElementTagNameMap}
          />
        </Show>
      </Portal>
    )
  }
}

const isDefined = <T,>(value: T | undefined): T | false => (typeof value === 'undefined' ? false : value)
