export type Optional<T> = T | null

export const isDefined = <T>(value: T | null): value is T => Boolean(value)
