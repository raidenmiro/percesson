import { component$, Slot } from '@builder.io/qwik'
import Header from '../widgets/header/header'

export default component$(() => {
  return (
    <>
      <main>
        <section>
          <Slot />
        </section>
      </main>
    </>
  )
})
