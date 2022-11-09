import { createVariants } from '../../shared/lib/variants'
import { PrimaryTimer } from './variants/primary/timer'

export const Pomodoro = createVariants({
  variants: { primary: PrimaryTimer },
})
