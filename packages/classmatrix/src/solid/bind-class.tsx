/* eslint-disable solid/reactivity */
import { createMemo, JSX, mergeProps, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { Classes, createMatrixClasses } from '../core'

const bindClass = <
  View extends keyof HTMLElementTagNameMap,
  Config extends {
    [Group in string]: {
      [Variant in string | number]: Classes
    }
  },
>(
  view: View,
  config: {
    baseClass: Classes
    default?: { [key in keyof Config]?: keyof Config[key] }
    variants: Config
  },
) => {
  const classFlat = (...classes: unknown[]) => classes.filter(Boolean).join(' ')

  return function <Attributes extends JSX.HTMLAttributes<HTMLElementTagNameMap[View]>>(
    props: Attributes & { [key in keyof Config]?: keyof Config[key] },
  ) {
    type ProvidedProps = Attributes & { [key in keyof Config]?: keyof Config[key] }

    const mergedConfig = mergeProps({ config, view }, props) as {
      config: {
        baseClass: Classes
        default?: { [key in keyof Config]?: keyof Config[key] }
        variants: Config
      }
      view: View
    } & ProvidedProps

    const extractVariantsProps = createMemo(() => {
      const flatList = []

      for (const prop in mergedConfig.config.variants) {
        flatList.push(prop)
      }

      return flatList
    })

    const [matrixClasses, variants, attributes] = splitProps(mergedConfig, ['config', 'view'], extractVariantsProps())

    const transformedClasses = createMemo(() => {
      const classes = createMatrixClasses<Config>({
        variants: matrixClasses.config.variants,
      })
      const configClasses = Object.assign({}, matrixClasses.config.default, { variants })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return classes.register({ ...configClasses })
    })

    return (
      <Dynamic
        {...attributes}
        component={'div'}
        class={classFlat(matrixClasses.config.baseClass, transformedClasses())}
      />
    )
  }
}

export { bindClass }
