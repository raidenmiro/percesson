import { children, JSX, Match, splitProps, Switch } from 'solid-js'

/*
 * const Clock = createVariants(
 *  variants: {
 *    primary: WatchFace,
 *    secondary: AnotherWatch
 *  },
 *  otherwise: ()=> <div>not found</div>
 * )
 *
 * use:
 * <Clock variant="primary" />
 */

export const createVariants = <
  Key extends string,
  Props extends Record<string, unknown>,
  Cases extends Record<Key, (props: Props) => JSX.Element>,
>(config: {
  variants: Cases
  otherwise?: JSX.Element
}) => {
  return (props: Props & { variant: keyof Cases }) => {
    const [_, providedProps] = splitProps(props, ['variant'])

    const variantCase = () => config.variants[props.variant] as unknown as JSX.Element
    const Component = children(() => variantCase())

    return (
      <Switch fallback={config.otherwise}>
        <Match when={variantCase()} keyed={false}>
          <Component {...providedProps} />
        </Match>
      </Switch>
    )
  }
}
