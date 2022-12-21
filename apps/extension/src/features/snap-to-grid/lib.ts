export function rectCache<Node extends HTMLElement, ID extends string | number>() {
  const cache: Record<ID, DOMRect> = {} as Record<ID, DOMRect>

  return function (node: Node, id: ID) {
    if (id in cache) return cache[id]

    const rect = getClientRect(node, { ignoreTransform: true })
    cache[id] = rect

    return rect
  }
}

export function getWindowClientRect() {
  const width = window.innerWidth
  const height = window.innerHeight

  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height,
  }
}

export function getClientRect(element: Element, options: { ignoreTransform: boolean }): DOMRect {
  let rect: DOMRect = element.getBoundingClientRect()

  if (options.ignoreTransform) {
    const { getComputedStyle } = window
    const { transform, transformOrigin } = getComputedStyle(element)

    if (transform) {
      rect = inverseTransform(rect, transform, transformOrigin) as DOMRect
    }
  }

  const { top, left, width, height, bottom, right } = rect

  return {
    top,
    left,
    width,
    height,
    bottom,
    right,
  } as DOMRect
}

export function inverseTransform(rect: DOMRect, transform: string, transformOrigin: string) {
  const parsedTransform = parseTransform(transform)

  if (!parsedTransform) {
    return rect
  }

  const { scaleX, scaleY, x: translateX, y: translateY } = parsedTransform

  const x = rect.left - translateX - (1 - scaleX) * Number.parseFloat(transformOrigin)
  const y =
    rect.top - translateY - (1 - scaleY) * Number.parseFloat(transformOrigin.slice(transformOrigin.indexOf(' ') + 1))
  const w = scaleX ? rect.width / scaleX : rect.width
  const h = scaleY ? rect.height / scaleY : rect.height

  return {
    width: w,
    height: h,
    top: y,
    right: x + w,
    bottom: y + h,
    left: x,
  }
}

export function parseTransform(transform: string) {
  if (transform.startsWith('matrix3d(')) {
    const transformArray = transform.slice(9, -1).split(/, /)

    return {
      x: Number(transformArray[12]),
      y: Number(transformArray[13]),
      scaleX: Number(transformArray[0]),
      scaleY: Number(transformArray[5]),
    }
  }
  if (transform.startsWith('matrix(')) {
    const transformArray = transform.slice(7, -1).split(/, /)

    return {
      x: Number(transformArray[4]),
      y: Number(transformArray[5]),
      scaleX: Number(transformArray[0]),
      scaleY: Number(transformArray[3]),
    }
  }

  return null
}
