/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEvent, createStore, Event, sample, Unit } from 'effector'
import { empty, not } from 'patronum'
import { createRefMeta } from './meta'

export type Widget = ReturnType<typeof createWidget>

export const createWidget = () => {
  const open = createEvent()
  const close = createEvent()
  const opened = createEvent()
  const closed = createEvent()

  const instance = createRefMeta()
  const $isOpen = createStore(false)
    .on(open, () => true)
    .on(close, () => false)

  sample({ source: open, target: opened })
  sample({ source: close, target: closed })

  interface Chain {
    openOn: Unit<any>
    beforeOpen: Event<any>
    cancelOn: Unit<any>
  }

  function chain(config: Chain) {
    const chainResolved = sample({
      clock: config.openOn,
      filter: not(empty(instance.$ref)),
    })

    const chainCancelled = sample({
      clock: config.cancelOn,
      filter: empty(instance.$ref),
    })

    sample({ clock: opened, target: config.beforeOpen })

    sample({ clock: chainResolved, target: open })
    sample({ clock: chainCancelled, target: close })
  }

  return {
    chain,
    instance,
    state: { $isOpen },
    action: { open, close },
    watch: { opened, closed },
  }
}
