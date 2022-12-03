import { createStore } from 'effector'
import { Api } from './internal'

export const $apiInstance = createStore(
  new Api({
    baseUrl: 'http://localhost:3333',
  }),
)
