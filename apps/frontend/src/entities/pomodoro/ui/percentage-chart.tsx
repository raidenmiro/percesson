export interface PercentageChartProps {
  width: number
  height: number
  percent?: number
  mainColor?: string
  background?: string
  text: string
}

export const PercentageChart = (props: PercentageChartProps) => {
  const style = () => ({
    display: 'block',
    margin: '10px auto',
    'max-width': '50%',
    'max-height': '250px',
    '--main-color': props.mainColor ?? '#4CC790',
    '--background': props.background ?? '#eee',
  })

  return (
    <svg viewBox="0 0 36 36" stroke="var(--main-color)" style={style()}>
      <path
        stroke="var(--background)"
        style={{ fill: 'none', 'stroke-width': '3.8' }}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        style={{
          fill: 'none',
          'stroke-width': '2.8',
          'stroke-linecap': 'round',
        }}
        stroke-dasharray={`${props.percent ?? 0}, 100`}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text style={{ 'text-anchor': 'middle', font: 'italic 8px sans-serif' }} fill="#666" x="18" y="20.35">
        {props.text}
      </text>
    </svg>
  )
}
