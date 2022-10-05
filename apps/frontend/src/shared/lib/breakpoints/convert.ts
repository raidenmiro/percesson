import { SchemaBreakpoints } from './schema'

export type MeasuringUnits = 'px' | 'rem'

const buildConvert = (measuringUnit: MeasuringUnits) => (size: number) => `${size}${measuringUnit}`

const units = {
  px: buildConvert('px'),
  rem: buildConvert('rem'),
  _: (unit: MeasuringUnits) => buildConvert(unit),
}

const all = <T extends SchemaBreakpoints>(breakpoints: T, fn: (size: number) => string) => {
  const arrify = Object.entries(breakpoints)

  return arrify.reduce(
    (acc, breakpoint) => {
      const [key, value] = breakpoint

      return {
        ...acc,
        [key]: Array.isArray(value) ? value.map(fn) : fn(value),
      }
    },
    {} as {
      [K in keyof T]: T[K] extends unknown[] ? string[] : string
    },
  )
}

export const convert = {
  units,
  all,
}
