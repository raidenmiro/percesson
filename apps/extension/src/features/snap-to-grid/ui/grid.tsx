import { JSX, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { either } from '../../../shared/lib/either'

export const Grid = <Tag extends keyof HTMLElementTagNameMap, Node = HTMLElementTagNameMap[Tag]>(_props: {
  gridSize: number
  as?: Tag
  attributes?: JSX.HTMLAttributes<Node>
  highlight?: boolean
}) => {
  const [attributes, props] = splitProps(_props, ['attributes'])

  function styles() {
    return Object.assign(
      { '--gridSize': `${props.gridSize}px`, 'pointer-events': 'none' },
      either(
        Boolean(props.highlight),
        {
          'background-size': 'var(--grid-size) var(--grid-size)',
        },
        {},
      ),
    )
  }

  return (
    <Dynamic
      class="fixed top-0 left-0 w-full h-full -z-20"
      component={props.as ?? 'div'}
      classList={{ 'border-2 border-indigo-600': props.highlight }}
      style={styles()}
      {...attributes}
    />
  )
}
