import { createSignal, For } from 'solid-js'
import { Button } from '../../ui/button'
import { clsx } from '../../../../shared/lib/clsx'

export interface TimerProps {}

const categories = [
  { id: 'pomodoro-default', label: 'Pomodoro', checked: true },
  { id: 'pomodoro-short', label: 'Short break', checked: false },
  { id: 'pomodoro-long', label: 'Long break', checked: false },
]

export const Timer = (_props: TimerProps) => {
  const [tabs, updateTabs] = createSignal(categories)

  const handleChange = (id: string) => {
    updateTabs(() => tabs().map(tab => (tab.id === id ? { ...tab, checked: true } : { ...tab, checked: false })))
  }

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.1)' }} class="px-10 py-4">
      <ul class="flex flex-wrap text-sm font-medium text-center text-white mb-8">
        <For each={tabs()}>
          {({ id, label, checked }) => (
            <li class="p-0 mr-2 last:mr-0">
              <label
                for={id}
                classList={{
                  'inline-block p-4 rounded-t-lg': true,
                  'border-b-2 border-blue-600': checked,
                  'hover:border-b-2 hover:border-gray-300 cursor-pointer': !checked,
                }}>
                {label}
              </label>
              <input
                type="checkbox"
                id={id}
                name={`pomodoro-${id}`}
                class="sr-only"
                onChange={evt => handleChange(evt.target.id)}
                disabled={checked}
              />
            </li>
          )}
        </For>
      </ul>
      <div class="mb-3">
        <ProgressBar />
      </div>
      <div class="text-center">
        <Button
          customClass={clsx(
            'text-white uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4',
            'focus:ring-blue-300 font-medium rounded-lg',
            'text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-blue-600 focus:outline-none',
          )}
          label="start"
        />
      </div>
    </div>
  )
}

const ProgressBar = () => {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" stroke-width="12" />
      <circle class="percent fifty" cx="60" cy="60" r="54" fill="none" stroke="#f77a52" stroke-width="12" />
    </svg>
  )
}
