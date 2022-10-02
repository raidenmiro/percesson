import { createPlugin } from '../create-plugin'
import { DragGesture } from '@use-gesture/vanilla'
import anime from 'animejs'

export const Dnd = createPlugin<Record<string, never>, HTMLDivElement, DragGesture>({
  creator: setup => ({
    ref: null,
    onMount() {
      this.ref = new DragGesture(setup.element, ({ active, movement: [x, y] }) => {
        const computed = (value: number) => (active ? value : 0)

        anime({ targets: setup.element, translateX: computed(x), translateY: computed(y), duration: computed(1000) })
      })
    },
    unMount() {
      if (this.ref) this.ref.destroy()
    },
  }),
})
