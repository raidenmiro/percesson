export const clsx = (...args: unknown[]) => {
  return args.filter(Boolean).join(' ')
}
