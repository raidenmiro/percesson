import anime from 'animejs'
import { createPlugin } from '../../../shared/lib/widget'

export const EaseOut = createPlugin<{ duration: [number, number]; loop: boolean }, HTMLHeadingElement>({
  creator: ({ element, options }) => {
    const instance = anime.timeline({ loop: options.loop })
    const [first, last] = options.duration

    return {
      onMount() {
        instance
          .add({
            targets: [element, '.letter'],
            opacity: [0, 1],
            easing: 'easeInOutQuad',
            duration: first,
            delay: (el, i) => 150 * (i + 1),
          })
          .add({
            targets: [element],
            opacity: 0,
            duration: last,
            easing: 'easeOutExpo',
            delay: 1000,
          })
      },
      unMount() {
        instance.pause()
      },
    }
  },
})
