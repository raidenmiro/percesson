import { createViewWidget } from '../../shared/lib/widget'
import { dock } from './model'

export const DockFactory = createViewWidget({
  connector: dock,
  plugins: [],
})
