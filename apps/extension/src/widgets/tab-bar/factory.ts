import { createViewWidget } from '../../shared/lib/widget'
import { tabBar } from './model'

export const TabBarFactory = createViewWidget({
  connector: tabBar,
  plugins: [],
})
