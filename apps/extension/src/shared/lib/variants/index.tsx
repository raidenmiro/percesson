import { children, JSX, Match, Switch } from 'solid-js'

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
  Props extends Record<string, unknown>,
  Key extends string = string,
  Cases extends Record<Key, (props: Props) => JSX.Element> = Record<
    string,
    (props: Record<string, unknown>) => JSX.Element
  >,
>(config: {
  variants: Cases
  otherwise?: () => JSX.Element
}) => {
  return (_props: Props & { variant: keyof Cases }) => {
    const variantCase = () => config.variants[_props.variant] as unknown as JSX.Element
    const Component = children(() => variantCase())

    return (
      <Switch fallback={config.otherwise?.()}>
        <Match when={variantCase()} keyed={false}>
          <Component />
        </Match>
      </Switch>
    )
  }
}
