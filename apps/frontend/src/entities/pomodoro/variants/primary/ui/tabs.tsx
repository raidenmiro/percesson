import { createSignal, For } from 'solid-js'

const categories = [
  { id: 'pomodoro-default', label: 'Pomodoro', checked: true },
  { id: 'break-short', label: 'Short break', checked: false },
  { id: 'break-long', label: 'Long break', checked: false },
]

export const Tabs = () => {
  const [tabs, updateTabs] = createSignal(categories)

  const handleChange = (id: string) => {
    updateTabs(() => tabs().map(tab => (tab.id === id ? { ...tab, checked: true } : { ...tab, checked: false })))
  }

  return (
    <ul class="flex flex-wrap text-sm font-medium text-center text-white mb-8">
      <For each={tabs()}>
        {({ id, label, checked }) => (
          <li class="p-0 mr-2 last:mr-0">
            <label
              for={id}
              class="focus:ring-4 focus:ring-blue-300 inline-block p-4 rounded-t-lg'"
              classList={{
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
  )
}
