import type { Optional } from '../../types'

export interface Plugin<Ref> {
  ref: Optional<Ref>
  onMount(): void
  unMount(): void
}

export interface PluginOptions<Config extends Record<string, unknown>, Purpose extends HTMLElement> {
  element: Purpose
  options: Config
}

export type PluginCreator = ReturnType<ReturnType<typeof createPlugin>>

export const createPlugin = <TConfig extends Record<string, unknown>, TPurpose extends HTMLElement, Ref>(config: {
  creator: (setup: PluginOptions<TConfig, TPurpose>) => Plugin<Ref>
}) => {
  return function (options: TConfig) {
    return (element: TPurpose) => config.creator({ element, options })
  }
}
