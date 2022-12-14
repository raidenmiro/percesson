import { attach, createEvent, createStore, sample } from 'effector'
import { $apiInstance } from '../../shared/api'
import { createWidget } from '../../shared/lib/widget'

export const weatherWidget = createWidget()

export const loadWeatherByCoordsFx = attach({
  source: $apiInstance,
  async effect(api, config: { lon: number; lat: number; lang: string }) {
    const { data } = await api.weather.weatherControllerGetCurrent(config)

    return {
      weather: data,
    }
  },
})

export const loadWeatherByCityFx = attach({
  source: $apiInstance,
  async effect(api, { city }: { city: string }) {
    const { data } = await api.weather.weatherControllerGetCurrentByCity(city)

    return {
      weather: data,
    }
  },
})

export const cityChanged = createEvent<{ city: string }>()
export const $city = createStore('orsk').on(cityChanged, (_, { city }) => city)

sample({
  clock: weatherWidget.watch.opened,
  source: $city,
  filter: $city.map(city => city.length > 0),
  fn: city => ({ city }),
  target: loadWeatherByCityFx,
})
