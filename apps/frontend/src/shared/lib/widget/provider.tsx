/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, JSX, onCleanup, onMount, useContext } from 'solid-js'
import { Widget } from './create-widget'

const widgetContext = createContext<Widget | null>(null)

export const useSource = () => {
  const widget = useContext(widgetContext)

  if (!widget) {
    throw new Error('widget instance not provided')
  }

  return widget
}

export const Provider = <TElement extends HTMLElement>(props: {
  children: JSX.Element
  widget: Widget
  ref: TElement
}) => {
  onMount(() => {
    props.widget.instance.addRef(props.ref)
  })

  onCleanup(() => {
    props.widget.instance.removeRef()
  })

  return <widgetContext.Provider value={props.widget}>{props.children}</widgetContext.Provider>
}

export const widget = {
  Provider,
  useSource,
}
