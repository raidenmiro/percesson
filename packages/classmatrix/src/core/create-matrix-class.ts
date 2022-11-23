// eslint-disable-next-line prettier/prettier
type ExtractMatrixParams<T extends ReturnType<typeof createMatrixClasses<never, never>>> = T['_output']
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

export { type Classes, type ExtractMatrixParams, createMatrixClasses }
