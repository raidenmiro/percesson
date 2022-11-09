import { createStore } from 'effector'
import { createWidget } from '../../shared/lib/widget'

export const greetWidget = createWidget()
export const $greetMessage = createStore('Welcome!')
