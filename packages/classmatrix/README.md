# Classmatix package

A tiny utility for create variants classes

## Features

- Declarative variation description
- Will get rid of mixing in classes
- the main thing is improvement DX when working with `tailwindcss`

## Installation

```sh
pnpm add classmatrix
```

## Api

### Example of creating a component in `solid-js`
 
- Create component

```tsx
const Button = bindClass('button', {
  baseClass: 'font-normal', // optional
  variants: {
    size: {
      small: 'px-5 py-2.5',
      large: 'px-9 py-3'
    },
    color: {
      primary: 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300',
      secondary: 'text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200'
    }
  },
  default: { size: 'small' }
})
```

- Use

```tsx
import { Button } from "./ui/button";
import { createSignal, createEffect } from "solid-js";

const Page = () => {
  const [count, setCount] = createSignal(0)

  createEffect(() => {
    console.log('count: %s', count())
  })
  
  return (
    <Button class="some-class" onClick={() => setCount(count() + 1)}>
      Click
    </Button>
  )
}
```

### Example with vanilla-js

```js
const { register } = createMatrixClass({
  variants: {
    size: {
      small: 'px-5 py-2.5',
      large: 'px-9 py-3'
    },
    color: {
      primary: 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300',
      secondary: 'text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200'
    }
  }
})

const classes = register({ size: 'small', primary: 'secondary' })

console.log(classes) // px-5 py-2.5 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200
```
