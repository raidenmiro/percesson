import { DragGesture } from '@use-gesture/vanilla'
import anime from 'animejs'
import { Optional } from '../../shared/lib/types/index'
import { createPlugin, createViewWidget } from '../../shared/lib/widget'
import { $weather } from './model'

export const Dnd = createPlugin<{ duration: number }, HTMLDivElement>({
  creator: setup => {
    let ref: Optional<DragGesture> = null

    return {
      onMount() {
        const { duration } = setup.options

        ref = new DragGesture(setup.element, ({ active, movement: [x, y] }) => {
          const computed = (value: number) => (active ? value : 0)

          anime({
            targets: setup.element,
            translateX: computed(x),
            translateY: computed(y),
            duration: computed(duration),
          })
        })
      },
      unMount() {
        if (ref) ref.destroy()
      },
    }
  },
})

export const WeatherFactory = createViewWidget({
  connector: $weather,
  plugins: [],
})
