import { createEvent, createStore } from 'effector'
import { createWidget } from '../../shared/lib/widget'

export const greetWidget = createWidget()

export const textChanged = createEvent<string>()
export const $text = createStore('Good morning, set the mood!').on(textChanged, (_, text) => text)
