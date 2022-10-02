import { useTheme } from '../../features/theme'
import { Theme } from '../../features/theme/type'
import { WeatherFactory } from './factory'
import { Cloudy } from './ui/cloudy'

export const WeatherWidget = () => {
  const theme = useTheme()
  return (
    <WeatherFactory
      class="ml-10 bg-white py-2 px-4 rounded-2xl shadow-lg dark:bg-black-300 cursor-pointer select-none"
      style={{ width: '155px', height: '155px' }}>
      <header class="flex">
        <Cloudy />
      </header>
      <div class="flex justify-end">
        <span class="font-bold dark:text-white" style={{ 'font-size': '48px' }}>
          18
        </span>
        <Grades theme={theme} />
      </div>
      <div class="text-md font-semibold text-gray-300 break-words">Los Angeles</div>
    </WeatherFactory>
  )
}

const Grades = (props: { theme: Theme }) => {
  const stroke = () => (props.theme === 'light' ? 'black' : 'white')

  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="4" stroke={stroke()} stroke-width="3" />
    </svg>
  )
}
