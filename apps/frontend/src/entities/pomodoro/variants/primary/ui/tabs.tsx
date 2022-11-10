import { useUnit } from 'effector-solid'
import { batch, createSignal, For } from 'solid-js'
import { currentVariantChanged, Variant } from '../../../model'

const categories = [
  { id: 'pomodoro-default', label: 'Pomodoro', type: 'DEFAULT', checked: true },
  { id: 'break-short', label: 'Short break', type: 'BREAK_SHORT', checked: false },
  { id: 'break-long', label: 'Long break', type: 'BREAK_LONG', checked: false },
]

export const Tabs = () => {
  const { changeVariant } = useUnit({ changeVariant: currentVariantChanged })
  const [tabs, updateTabs] = createSignal(categories)

  const handleChange = (id: string) => {
    batch(() => {
      const tabsList = tabs()
      const type = tabsList.find(tabs => tabs.id === id)?.type

      if (type) changeVariant({ type: type as Variant })

      updateTabs(() => {
        return tabsList.map(tab => (tab.id === id ? { ...tab, checked: true } : { ...tab, checked: false }))
      })
    })
  }

  return (
    <ul class="flex flex-wrap text-sm font-medium text-center text-white mb-8">
      <For each={tabs()}>
        {({ id, label, checked }) => (
          <li class="p-0 mr-2 last:mr-0">
            <button
              id={id}
              onClick={evt => handleChange(evt.target.id)}
              class="inline-block p-4 rounded-t-lg outline-none"
              classList={{
                'border-b-2 border-blue-600': checked,
                'hover:border-b-2 hover:border-gray-300 cursor-pointer': !checked,
              }}>
              {label}
            </button>
          </li>
        )}
      </For>
    </ul>
  )
}
