import { createViewWidget } from '../../shared/lib/widget'
import { pomodoroWidget } from './model'

export const PomodoroFactory = createViewWidget({
  connector: pomodoroWidget,
  plugins: [],
})

pomodoroWidget.action.open()
