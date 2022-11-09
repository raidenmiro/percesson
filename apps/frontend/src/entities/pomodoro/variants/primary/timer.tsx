import { useUnit } from 'effector-solid'
import { time } from '../../../../shared/lib/time'
import { PomodoroFactory } from '../../factory'
import { $timer, timerToggle } from '../../model'
import { PercentageChart } from '../../ui/percentage-chart'
import { Control } from './ui/control'
import { Tabs } from './ui/tabs'

export const PrimaryTimer = () => {
  const { timer, handleToggle } = useUnit({ timer: $timer, handleToggle: timerToggle })

  return (
    <PomodoroFactory
      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      class="absolute top-5 right-5 px-10 py-4 max-w-md rounded-md">
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
    </PomodoroFactory>
  )
}
