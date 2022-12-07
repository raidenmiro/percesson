import { createViewWidget } from '../../shared/lib/widget'
import { clockWidget } from './model'

export const ClockFactory = createViewWidget({
  connector: clockWidget,
  plugins: [],
})

clockWidget.action.open()
