import { createViewWidget } from '../../shared/lib/widget'
import { $weather } from './model'

export const WeatherFactory = createViewWidget({
  connector: $weather,
  plugins: [],
})
