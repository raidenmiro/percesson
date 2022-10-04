import type { Theme } from './type'

export const theme = {
  match: (theme: Theme) => `(prefers-color-scheme: ${theme})`,
}
