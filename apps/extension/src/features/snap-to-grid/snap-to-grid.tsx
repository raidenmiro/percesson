import { DragDropProvider, DragDropSensors } from '@thisbeyond/solid-dnd'
import { JSX, mergeProps } from 'solid-js'
import { Droppable } from './ui/droppable'
import { Grid } from './ui/grid'

export const SnapToGrid = (_props: {
  template: string
  gridSize?: number
  dragOverlay?: JSX.Element
  children: JSX.Element
}) => {
  const props = mergeProps({ gridSize: 30 }, _props)

  return (
    <DragDropProvider>
      <DragDropSensors />
      <Droppable id={props.template}>
        <Grid gridSize={props.gridSize} />
      </Droppable>
      {props.children}
    </DragDropProvider>
  )
}
