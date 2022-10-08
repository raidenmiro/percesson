const getMilliseconds = () => {
  return (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000
}

export type CurrentTime = ReturnType<typeof getCurrentDetails>

const getCurrentDetails = () => {
  const milliseconds = getMilliseconds()
  const ceil = (time: number) => time * 360

  return {
    hours: ceil(((milliseconds / 3600) % 12) / 12),
    minutes: ceil(((milliseconds / 60) % 60) / 60),
    seconds: ceil((milliseconds % 60) / 60),
    milliseconds: ceil(milliseconds % 1),
  }
}

/**
 * const time = time.getCurrentDetails()
 *
 * const { hoursRotateCss } = time.applyToCss`rotate(${time})`
 */
export type Units = 'deg' | 'turn' | 'rad'
type TransformProperty = 'translate' | 'scale' | 'rotate' | 'skewX' | 'skewY'

const capitalize = (str: string) => str.replace(str[0], str[0].toUpperCase())
const replaceAllBrackets = (str: string) => str.replace(/[()]/g, '')

function applyToCss<Transform extends TransformProperty, Unit extends Units>(
  property: TemplateStringsArray,
  args: CurrentTime,
) {
  const [transform, unit = 'deg'] = property.slice(0, -1).map(replaceAllBrackets) as [Transform, Unit]

  type Literal = `${keyof CurrentTime}${Capitalize<Transform>}Css`

  const arrifyTime = Object.entries(args)
  const result = arrifyTime.reduce((plain, [key, value]) => {
    const keyLiteral = `${key}${capitalize(transform)}Css` as Literal

    return (plain[keyLiteral] = `${transform}(${(value * 360).toFixed(1)}${unit})`) // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as any)

  return result as Record<Literal, string>
}

const getNow =
  (locales: Intl.LocalesArgument) =>
  ({ fullHours = true, now = new Date() } = {}) => {
    const time = now.toLocaleTimeString(locales, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    const [h, m, s] = time.split(':')

    return {
      hours: h.slice(0, fullHours ? 2 : 1),
      minutes: m.slice(0, 2),
      seconds: s.slice(0, 2),
    }
  }

export const time = { getCurrentDetails, applyToCss, getNow }
