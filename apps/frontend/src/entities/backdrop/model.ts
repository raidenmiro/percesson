import { attach, createEvent, createStore, sample } from 'effector'
import { Api, Unsplash } from '../../shared/api'
import { Optional } from '../../shared/lib/types'

export const $instance = createStore(
  new Api({
    baseUrl: 'http://localhost:3333',
  }),
)

export const loadRandomPhotoFx = attach({
  source: $instance,
  async effect(api) {
    const answer = await api.unsplash.unsplashControllerGetRandom()

    return answer.data
  },
})

export const started = createEvent()
export const reset = createEvent()

export const $photo = createStore<Optional<Unsplash>>(null)
  .on(loadRandomPhotoFx.doneData, (_, photoMeta) => photoMeta)
  .reset(reset)

sample({ clock: started, target: loadRandomPhotoFx })
