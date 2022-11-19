import { isDefined, Optional } from '../../../types'
import { createPlugin } from '../create-plugin'

type ListenersEvents = keyof WindowEventMap

export const OutsideClicked = createPlugin<
  { handler: () => void; events?: ListenersEvents[]; nodes?: HTMLElement[] },
  HTMLDivElement
>({
  creator: setup => {
    const DEFAULT_EVENTS: ListenersEvents[] = ['mousedown', 'touchstart']

    const { nodes, handler, events } = setup.options
    const subscribes = events ?? DEFAULT_EVENTS

    let ref: Optional<<EventType extends keyof WindowEventMap>(evt: WindowEventMap[EventType]) => void> = null

    return {
      ref: null,
      onMount() {
        const listener = <EventType extends keyof WindowEventMap>(evt: WindowEventMap[EventType]) => {
          if (Array.isArray(nodes)) {
            const hasIgnore = nodes.every(node => Boolean(node) && node.contains(evt.target as Node))

            if (!hasIgnore) {
              handler()
            }
          } else if (!setup.element.contains(evt.target as Node)) {
            handler()
          }
        }

        subscribes.forEach(fn => setup.element.addEventListener(fn, listener))

        ref = listener
      },
      unMount() {
        if (isDefined(ref)) {
          const listener = ref

          subscribes.forEach(fn => setup.element.removeEventListener(fn, listener))
        }
      },
    }
  },
})
