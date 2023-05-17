declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside: <TElement extends HTMLElement>(el: TElement, accessor: () => void) => void
    }
  }
}

export {}
