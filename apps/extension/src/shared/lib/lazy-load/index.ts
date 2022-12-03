import { Component, lazy } from 'solid-js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyImport<T extends Component<any>, I extends { [K2 in K]: T }, K extends keyof I>(
  factory: () => Promise<I>,
  name: K,
): I {
  return Object.create({
    [name]: lazy(() => factory().then(module => ({ default: module[name] }))),
  })
}
