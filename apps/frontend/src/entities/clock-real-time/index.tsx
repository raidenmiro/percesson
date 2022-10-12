import { createVariants } from '../../shared/lib/variants'
import { Electronic } from './variants/electronic'
import { WatchFace } from './variants/watch-face'

export const Clock = createVariants({
  variants: {
    primary: Electronic,
    secondary: WatchFace,
  },
  otherwise: <div>Choice you best variant clock</div>,
})
