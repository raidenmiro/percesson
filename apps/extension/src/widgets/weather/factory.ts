import { createViewWidget } from '../../shared/lib/widget'
import { weatherWidget } from './model'

export const WeatherFactory = createViewWidget({
  connector: weatherWidget,
  plugins: [],
})
