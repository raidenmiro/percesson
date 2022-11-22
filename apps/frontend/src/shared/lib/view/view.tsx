import { createMemo, JSX, mergeProps, splitProps } from 'solid-js'
import { Dynamic, Show } from 'solid-js/web'
import { clsx } from '../clsx'

type Layer = JSX.Element
type Attributes<TElement extends Element> = JSX.HTMLAttributes<TElement>
type ExtractElementByTag<Tag extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[Tag]

interface VariationLayer {
  name: string
  template: Layer
}

type VariationLayers = Array<VariationLayer>

interface ViewProps<Tag extends keyof HTMLElementTagNameMap, TVariation extends VariationLayer> {
  children: JSX.Element
  fallback?: Layer
  inject: TVariation[]
  current: string
  as?: Tag
}

const Root = <TVariation extends VariationLayer, Tag extends keyof HTMLElementTagNameMap = 'div'>(
  _props: ViewProps<Tag, TVariation> & Attributes<ExtractElementByTag<Tag>>,
) => {
  const props = mergeProps({ as: 'div' }, _props)
  const [base, attributes] = splitProps(props, ['children', 'as', 'current', 'inject', 'fallback'])

  const layout = createMemo(() => {
    for (const record of base.inject) {
      if (record.name === base.current) {
        return record.template
      }
    }

    return null
  })

  return (
    <Dynamic class={clsx(attributes.class)} component={base.as} {...attributes}>
      <Show when={layout() !== null} keyed={false}>
        <Dynamic component={layout()}>{base.children}</Dynamic>
      </Show>
    </Dynamic>
  )
}

const View = {
  Root,
}

export { type VariationLayers, View }
