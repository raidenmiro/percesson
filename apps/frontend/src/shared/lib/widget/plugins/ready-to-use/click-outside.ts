/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Optional } from '../../../types'
import { createPlugin } from '../create-plugin'

type ListenersEvents = keyof WindowEventMap

export const OutsideClicked = createPlugin<
  { handler: () => void; events?: ListenersEvents[]; nodes?: HTMLElement[] },
  HTMLDivElement
>({
  creator: ({ options, element }) => {
    const DEFAULT_EVENTS: ListenersEvents[] = ['mousedown', 'touchstart']

    const { nodes, handler, events } = options
    const subscribes = events ?? DEFAULT_EVENTS

    let ref: Optional<<EventType extends keyof WindowEventMap>(evt: WindowEventMap[EventType]) => void> = null

    return {
      onMount() {
        const listener = <EventType extends keyof WindowEventMap>(evt: WindowEventMap[EventType]) => {
          if (Array.isArray(nodes)) {
            const hasIgnore = nodes.every(node => Boolean(node) && node.contains(evt.target as Node))

            if (!hasIgnore) {
              handler()
            }
          } else if (!element.contains(evt.target as Node)) {
            handler()
          }
        }

        subscribes.forEach(fn => element.addEventListener(fn, listener))

        ref = listener
      },
      unMount() {
        // @ts-expect-error
        if (ref) subscribes.forEach(fn => element.removeEventListener(fn))
      },
    }
  },
})
