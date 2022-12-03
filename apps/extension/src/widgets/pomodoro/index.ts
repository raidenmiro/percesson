import { lazyImport } from '../../shared/lib/lazy-load'
import { createVariants } from '../../shared/lib/variants'

const { PrimaryTimer } = lazyImport(() => import('./variants/primary/timer'), 'PrimaryTimer')

export const Pomodoro = createVariants({
  variants: { primary: PrimaryTimer },
})
