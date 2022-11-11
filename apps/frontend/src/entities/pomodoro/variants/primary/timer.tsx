import { useUnit } from 'effector-solid'
import { time } from '../../../../shared/lib/time'
import { Badge } from '../../../../shared/ui/badge'
import { PomodoroFactory } from '../../factory'
import { $timer, timerToggle } from '../../model'
import { PercentageChart } from '../../ui/percentage-chart'
import { Control } from './ui/control'
import { Tabs } from './ui/tabs'

export const PrimaryTimer = () => {
  const { timer, handleToggle } = useUnit({ timer: $timer, handleToggle: timerToggle })

  return (
    <PomodoroFactory class="absolute top-5 right-5 group">
      <Badge.Anchor style={{ background: 'rgba(255, 255, 255, 0.1)' }} customClass="px-10 py-4 max-w-md rounded-md">
        <Tabs />
        <div class="mb-3.5 flex justify-center">
          <PercentageChart
            percent={timer().percent}
            width={150}
            height={150}
            mainColor="hsl(44, 98%, 50%)"
            text={time.serialize(timer().time)}
          />
        </div>
        <div class="text-center">
          <Control ruined={timer().ruined} onClick={handleToggle} />
        </div>
        <Badge.Notify
          as="button"
          customClass="transition-opacity duration-300 opacity-0 group-hover:opacity-100 p-1"
          baseColor="white"
          bgColor="orange"
          label={<SettingsSvg />}
        />
      </Badge.Anchor>
    </PomodoroFactory>
  )
}

const SettingsSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="var(--badge-color)"
      viewBox="0 0 24 24"
      stroke-width={1.5}
      stroke="currentColor"
      class="w-5 h-5">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
      />
    </svg>
  )
}
