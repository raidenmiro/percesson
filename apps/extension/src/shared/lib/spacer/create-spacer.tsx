import { Dynamic } from 'solid-js/web'
import { normalizeWithUnit } from './utils'

/*
 *  const Spacer = createSpacer({
 *    node: 'span',
 *    config: {
 *      factor: 4,
 *      precision: 1,
 *      measuringUnit: 'px'
 *    },
 *  })
 *
 *  use:
 *  <Spacer h={3} /> // 12px
 * */
export interface SpacerConfig {
  factor: number
  measuringUnit: 'px' | 'rem'
}

export const createSpacer = <Tag extends keyof HTMLElementTagNameMap>({
  config,
  node,
}: {
  config: { factor?: number; precision?: number; divisor?: number; measuringUnit?: string }
  node?: Tag
}) => {
  const defaultConfig = {
    factor: 4,
    measuringUnit: 'px',
  }

  const settings = Object.assign(defaultConfig, config)
  const toFormat = normalizeWithUnit(settings.measuringUnit)
  const cache = new Map()

  const getNormalizedSpace = (spacing: number) => {
    if (cache.has(spacing)) {
      return cache.get(spacing)
    }

    const size = toFormat(settings.factor * spacing)
    cache.set(spacing, size)

    return size
  }

  return function (props: { h?: number; w?: number; inline?: boolean }) {
    const showWithInline = () => props.inline

    return (
      <Dynamic
        classList={{
          block: !showWithInline(),
          inline: showWithInline(),
        }}
        style={{
          width: getNormalizedSpace(props.w ?? 1),
          height: getNormalizedSpace(props.h ?? 1),
        }}
        component={node ?? 'div'}
      />
    )
  }
}
