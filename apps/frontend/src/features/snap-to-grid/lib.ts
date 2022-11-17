import { Transformer } from '@thisbeyond/solid-dnd'

export function snapToGrid({
  transform,
  gridSize,
}: {
  transform: ReturnType<Transformer['callback']>
  gridSize: number
}) {
  return {
    x: Math.ceil(transform.x / gridSize) * gridSize,
    y: Math.ceil(transform.y / gridSize) * gridSize,
  }
}

export function getBounds() {
  const { innerHeight, innerWidth } = window

  return {
    top: 0,
    left: 0,
    right: innerWidth,
    bottom: innerHeight,
    width: innerWidth,
    height: innerHeight,
  }
}

export function restrictToBoundingRect(
  transform: ReturnType<Transformer['callback']>,
  config: { elementRect: DOMRect; boundsRect: Omit<DOMRect, 'x' | 'y' | 'toJSON'> },
) {
  const { elementRect: rect, boundsRect: boundingRect } = config
  const currentPosition = { ...transform }

  if (rect.top + transform.y <= boundingRect.top) {
    currentPosition.y = boundingRect.top - rect.top
  } else if (rect.bottom + transform.y >= boundingRect.top + boundingRect.height) {
    currentPosition.y = boundingRect.top + boundingRect.height - rect.bottom
  }

  if (rect.left + transform.x <= boundingRect.left) {
    currentPosition.x = boundingRect.left - rect.left
  } else if (rect.right + transform.x >= boundingRect.left + boundingRect.width) {
    currentPosition.x = boundingRect.left + boundingRect.width - rect.right
  }

  return currentPosition
}
