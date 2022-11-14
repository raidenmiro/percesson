import { lazyImport } from '../../shared/lib/lazy-load'
import { createVariants } from '../../shared/lib/variants'

const { WatchFace } = lazyImport(() => import('./variants/watch-face'), 'WatchFace')
const { Electronic } = lazyImport(() => import('./variants/electronic'), 'Electronic')

export const Clock = createVariants({
  variants: {
    primary: Electronic,
    secondary: WatchFace,
  },
  otherwise: () => <div>loading...</div>,
})
