import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return <div class="relative bg-white">Hello world!</div>
})

export const head: DocumentHead = {
  title: 'Percesson | main',
}
