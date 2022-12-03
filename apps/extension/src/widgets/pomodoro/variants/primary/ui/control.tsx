import { clsx } from '../../../../../shared/lib/clsx'
import { Button } from '../../../ui/button'

export const Control = (props: { ruined: boolean; onClick: ({ type }: { type: 'run' | 'stop' }) => unknown }) => {
  return (
    <Button
      label={props.ruined ? 'stop' : 'start'}
      customClass={clsx(
        'text-white uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4',
        'focus:ring-blue-300 font-medium rounded-lg',
        'text-sm w-full py-2.5 mr-2 focus:outline-none',
      )}
      onClick={() => props.onClick({ type: props.ruined ? 'stop' : 'run' })}
    />
  )
}
