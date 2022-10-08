const createScheduler = (config: {
  loop?: boolean
  execute: (callback: FrameRequestCallback) => number
  cancelCb: (handle: number) => void
  work: () => unknown
}) => {
  const { cancelCb, execute, work, loop = true } = config

  let tickId: number

  const runner = (): void => {
    if (loop) tick()
    work()
  }

  const tick = () => {
    tickId = execute(runner)
  }

  tick()

  return () => cancelCb(tickId)
}

export const scheduler = (work: () => unknown) => {
  return createScheduler({
    work,
    cancelCb: cancelAnimationFrame,
    execute: requestAnimationFrame,
  })
}
