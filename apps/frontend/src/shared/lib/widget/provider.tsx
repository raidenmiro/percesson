/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, createContext, onCleanup, onMount, useContext } from 'solid-js'
import { Widget } from './create-widget'

const widgetContext = createContext<Widget | null>(null)

export const useSource = () => {
  const widget = useContext(widgetContext)

  if (!widget) {
    throw new Error('widget instance not provided')
  }

  return widget
}

export const Provider = (props: { children: Component; widget: Widget }) => {
  let ref: HTMLElement

  onMount(() => {
    props.widget.instance.addRef(ref)
  })

  onCleanup(() => {
    props.widget.instance.removeRef()
  })

  const Children = props.children

  return (
    <widgetContext.Provider value={props.widget}>
      <Children ref={ref!} />
    </widgetContext.Provider>
  )
}

export const widget = {
  Provider,
  useSource,
}
