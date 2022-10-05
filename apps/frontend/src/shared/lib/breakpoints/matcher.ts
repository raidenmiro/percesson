type Size = string

export const breakpoint = {
  matcher: {
    up: (size: Size) => `(min-width: ${size})`,
    down: (size: Size) => `(max-width: ${size})`,
  },
}
