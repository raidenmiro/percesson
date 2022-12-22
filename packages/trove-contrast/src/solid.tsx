/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cva, VariantProps } from 'class-variance-authority'
import { createMemo, JSX, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

export function buildCva<Tag extends keyof HTMLElementTagNameMap, Node = HTMLElementTagNameMap[Tag]>(
  tag: Tag,
  baseClass: string | string[],
  // @FIXME
  config: any,
) {
  const defaultCase =
    Object.keys(config).length > 0
      ? config
      : {
          variants: {},
        }

  const computedClass = cva(baseClass, defaultCase)

  function extractProps<T = string>(record: Record<string, Record<string, unknown>>): T[] {
    const list: string[] = []

    for (const key in record) {
      const variants = Object.keys(record[key])

      variants.forEach(variant => list.push(variant))
    }

    return list as T[]
  }

  const cvaProps = extractProps(config)

  return function <Attributes extends JSX.HTMLAttributes<Node>, Classes extends VariantProps<typeof computedClass>>(
    _props: Attributes & Classes,
  ) {
    // @FIXME
    const [schemaWithoutAttr, attr] = splitProps(_props, cvaProps as any)

    const classes = createMemo(() => computedClass(schemaWithoutAttr))

    return <Dynamic {...attr} class={classes()} component={tag as keyof HTMLElementTagNameMap} />
  }
}
