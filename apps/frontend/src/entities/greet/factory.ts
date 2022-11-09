import { createViewWidget } from '../../shared/lib/widget'
import { greetWidget } from './model'
import { EaseOut } from './plugins/ease-out'

export const GreetFactory = createViewWidget({
  connector: greetWidget,
  plugins: [EaseOut({ duration: [2250, 1000], loop: false })],
})
