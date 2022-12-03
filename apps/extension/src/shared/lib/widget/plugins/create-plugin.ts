export interface Plugin {
  onMount(): void
  unMount(): void
}

export interface PluginOptions<Config extends Record<string, unknown>, Purpose extends Element> {
  element: Purpose
  options: Config
}

export type PluginCreator<TPurpose extends Element> = (element: TPurpose) => Plugin

export const createPlugin = <TConfig extends Record<string, unknown>, TPurpose extends Element>(config: {
  creator: (setup: PluginOptions<TConfig, TPurpose>) => Plugin
}) => {
  return function (options: TConfig extends { [key in string]: never } ? void : TConfig) {
    return (element: TPurpose) => config.creator({ element, options: options as TConfig })
  }
}
