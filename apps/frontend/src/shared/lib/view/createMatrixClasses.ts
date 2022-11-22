/* eslint-disable @typescript-eslint/no-explicit-any */

/*
  const classes = createMatrixClasses({
    variants: {
      color: {
        violet: 'bg-purple-600',
        gray: 'bg-gray-100',
      },
      size: {
        small: 'w-30 h-30',
        large: 'w-60 h-60'
      },
    },
  })

  interface Props extends ExtractMatrixParams<typeof classes> {
    label: string
  }

  const Button = (_props: Props & Attributes<HTMLButtonElement>) => {
    const [props, attr] = splitProps(_props, [...])

    return (
      <button class={classes.register({ color: props.color ?? 'gray', size: props.size ?? 'small' })} {...attr}>
        {props.label}
      </button>
    )
  }
 */

type ExtractMatrixParams<T extends ReturnType<typeof createMatrixClasses<any, any>>> = T['_output']
type Classes = string

const createMatrixClasses = <
  Config extends {
    [Group in string]: {
      [Variant in string]: Classes
    }
  },
  RequiredProps = { [Key in keyof Config]: keyof Config[Key] },
>(config: {
  variants: Config
}) => {
  let output!: RequiredProps
  const cache = new Map()

  function toString(value: unknown) {
    return JSON.stringify(value)
  }

  return {
    _output: output,
    register(options: { [Key in keyof Config]: keyof Config[Key] }) {
      const stringifyConfig = toString(options)

      if (cache.has(stringifyConfig)) {
        return cache.get(stringifyConfig)
      }

      const composeClasses = []

      for (const key in options) {
        const prop = options[key]

        if (key in config.variants) {
          const classes = config.variants[key]
          composeClasses.push(classes[prop])
        }
      }

      const classes = composeClasses.filter(Boolean).join(' ')
      cache.set(stringifyConfig, classes)

      return classes
    },
  }
}

export { type ExtractMatrixParams, createMatrixClasses }
