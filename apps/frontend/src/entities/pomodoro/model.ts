import { combine, createEffect, createEvent, createStore, sample, split } from 'effector'
import { spread } from 'patronum'
import { time } from '../../shared/lib/time'
import { createWidget } from '../../shared/lib/widget'
import { createWorker } from '../../shared/lib/workers/create-worker'
import { parseToSeconds } from './lib'

export interface Payload<TPayload> {
  event: 'INIT' | 'TICK' | 'STOP' | 'COMPLETED'
  payload: TPayload
}

type Variant = 'DEFAULT' | 'BREAK_SHORT' | 'BREAK_LONG'

interface Timer {
  hours?: number
  minutes: number
  seconds: number
}

const syncWithTimeFx = createEffect<{ title: Timer }, void>({
  handler: async ({ title }) => {
    document.title = `${time.serialize(title)} - Percesson`
  },
})

const showCompleteFx = createEffect({
  handler: async () => {
    document.title = 'Finished - Percesson'
  },
})

const pomodoroWidget = createWidget()
const worker = createWorker<Payload<{ time: number; percent: number; currentTime: number }>>({
  url: new URL('./worker.js', import.meta.url),
})

const timerToggle = createEvent<{ type: 'run' | 'stop' }>()
const timerReset = createEvent()

const { timerStarted, timerHalted } = split(timerToggle, {
  timerHalted: ({ type }) => type === 'stop',
  timerStarted: ({ type }) => type === 'run',
})

const $currentVariant = createStore<Variant>('DEFAULT')
const $timerAmount = createStore<number>(0)
const $currentTime = createStore<null | Timer>(null)
const $percent = createStore(100)
const $timerVariants = createStore({
  DEFAULT: { minutes: 25, seconds: 0 },
  BREAK_SHORT: { minutes: 5, seconds: 0 },
  BREAK_LONG: { minutes: 15, seconds: 0 },
})
const $timerRuined = createStore<boolean>(false)
  .on(timerStarted, () => true)
  .reset(timerHalted)

const $timer = combine(
  [$timerVariants, $timerRuined, $currentVariant, $timerAmount, $currentTime, $percent],
  ([variants, ruined, currentVariant, amount, currentTime, percent]) => {
    return {
      time: !currentTime ? variants[currentVariant] : currentTime,
      amount,
      ruined,
      percent,
    }
  },
)

sample({ clock: pomodoroWidget.watch.opened, target: worker.start })
sample({ clock: pomodoroWidget.watch.closed, target: worker.dispose })

const { initTimer, continueTimer } = split(sample({ clock: timerStarted, source: $currentTime }), {
  initTimer: time => time === null,
  continueTimer: time => time !== null,
})

sample({
  clock: initTimer,
  source: $timer,
  fn: timer => ({ event: 'INIT', maxTime: parseToSeconds(timer.time) }),
  target: worker.sendFx,
})

sample({
  clock: continueTimer,
  source: $timer,
  fn: timer => ({ event: 'START', initTime: parseToSeconds(timer.time) }),
  target: worker.sendFx,
})

sample({
  clock: timerHalted,
  fn: () => ({ event: 'STOP' }),
  target: worker.sendFx,
})

const { init, tick, stop, completed } = split(worker.messageReceived, {
  init: ({ data }) => data.event === 'INIT',
  tick: ({ data }) => data.event === 'TICK',
  stop: ({ data }) => data.event === 'STOP',
  completed: ({ data }) => data.event === 'COMPLETED',
})

sample({
  clock: init,
  source: $timer,
  fn: timer => ({ event: 'START', initTime: parseToSeconds(timer.time) }),
  target: worker.sendFx,
})

sample({
  clock: tick,
  fn: ({ data }) => ({
    percent: data.payload.percent,
    time: time.parseDuration(data.payload.time),
  }),
  target: spread({ targets: { percent: $percent, time: $currentTime } }),
})

sample({
  clock: tick,
  fn: ({ data }) => ({
    title: time.parseDuration(data.payload.time),
  }),
  target: syncWithTimeFx,
})

sample({ clock: completed, target: showCompleteFx })

$timerRuined.reset(stop)
$currentTime.reset(timerReset)

export { $timer, pomodoroWidget, timerReset, timerToggle }
