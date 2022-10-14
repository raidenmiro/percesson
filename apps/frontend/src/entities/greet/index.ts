import { createVariants } from '../../shared/lib/variants'
import { Primary } from './variants/primary'

export const Greet = createVariants({
  variants: { primary: Primary },
})
