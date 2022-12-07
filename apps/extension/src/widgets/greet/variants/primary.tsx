/* eslint-disable solid/no-innerhtml */
import { useUnit } from 'effector-solid'
import { GreetFactory } from '../factory'
import { $text } from '../model'

export const Primary = () => {
  const text = useUnit($text)

  return (
    <GreetFactory
      as="h1"
      class="absolute bottom-96 left-5 text-white text-7xl"
      innerHTML={text()
        .split('')
        .map(letter => `<span class='letter'>${letter}</span>`)
        .join('')}
    />
  )
}
