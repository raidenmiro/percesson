/* eslint-disable solid/no-innerhtml */
import { GreetFactory } from '../factory'

export const Primary = (props: { text?: string }) => {
  const text = () =>
    props.text ??
    ''
      .split('')
      .map(letter => `<span class='letter'>${letter}</span>`)
      .join('')

  return <GreetFactory as="h1" class="absolute top-5 text-white text-7xl relative" innerHTML={text()} />
}
