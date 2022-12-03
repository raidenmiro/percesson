import { lazyImport } from '../../shared/lib/lazy-load'
import { createVariants } from '../../shared/lib/variants'

const { Primary } = lazyImport(() => import('./variants/primary'), 'Primary')

export const Greet = createVariants({
  variants: { primary: Primary },
})
