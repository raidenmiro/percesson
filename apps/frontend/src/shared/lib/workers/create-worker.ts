import { attach, createEvent, createStore, sample } from 'effector'

export const createWorker = <Payload>(config: { url: URL }) => {
  const start = createEvent()
  const dispose = createEvent()

  const messageReceived = createEvent<MessageEvent<Payload>>()
  const messageErased = createEvent<ErrorEvent>()

  const $worker = createStore(new Worker(config.url))

  const sendFx = attach({
    source: $worker,
    async effect(worker, message) {
      worker.postMessage(message)
    },
  })

  const disposeFx = attach({
    source: $worker,
    async effect(worker) {
      worker.terminate()
    },
  })

  const listenerFx = attach({
    source: $worker,
    async effect(worker) {
      worker.addEventListener('message', messageReceived)
      worker.addEventListener('error', messageErased)
    },
  })

  sample({ clock: start, target: listenerFx })
  sample({ clock: dispose, target: disposeFx })

  return {
    sendFx,
    $worker,
    dispose,
    disposeFx,
    listenerFx,
    messageErased,
    messageReceived,
  }
}
