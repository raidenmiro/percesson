import { createMemo, createSignal, onCleanup } from 'solid-js'
import { time } from '../../../shared/lib/time'
import { scheduler } from '../lib'

export const Electronic = (props: { showDetails?: boolean }) => {
  const getLocalNow = time.getNow('ru-RU')
  const [currentTime, updateTime] = createSignal(getLocalNow())

  const refresh = () => updateTime(getLocalNow())

  const formattedTime = createMemo(() => {
    const { hours, minutes, seconds } = currentTime()

    const main = `${hours}:${minutes}`
    const details = `${seconds}`

    return [main, props.showDetails && details].filter(Boolean).join(':')
  })

  const unSubscribe = scheduler(() => {
    refresh()
  })

  onCleanup(unSubscribe)

  return (
    <div class="p-0 select-none">
      <span style={{ 'font-size': '170px' }} class="font-bold text-black dark:text-white">
        {formattedTime()}
      </span>
    </div>
  )
}
