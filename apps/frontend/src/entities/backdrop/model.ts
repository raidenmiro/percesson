import { attach, createEvent, createStore, sample } from 'effector'
import { $apiInstance } from '../../shared/api'
import type { Unsplash } from '../../shared/api/internal'
import { Optional } from '../../shared/lib/types'

export const loadRandomPhotoFx = attach({
  source: $apiInstance,
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
