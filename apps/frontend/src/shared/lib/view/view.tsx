import { JSX, mergeProps, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { clsx } from '../clsx'

type Layer = JSX.Element
type Attributes<TElement extends Element> = JSX.HTMLAttributes<TElement>
type ExtractElementByTag<Tag extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[Tag]

interface VariationLayer {
  variant: string
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

  return (
    <Dynamic class={clsx(attributes.class)} component={base.as} {...attributes}>
      {base.children}
    </Dynamic>
  )
}

const Item = <Tag extends keyof HTMLElementTagNameMap>(
  _props: { children: JSX.Element; as?: Tag } & Attributes<ExtractElementByTag<Tag>>,
) => {
  const props = mergeProps({ as: 'div' }, _props)
  const [base, attributes] = splitProps(props, ['children', 'as'])

  return (
    <Dynamic class={clsx(attributes.class)} component={base.as} {...attributes}>
      {base.children}
    </Dynamic>
  )
}

const View = {
  Root,
  Item,
}

export { type Layer, type VariationLayer, type VariationLayers, View }
