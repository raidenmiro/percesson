import { ApiProperty } from '@nestjs/swagger'
import { Coord, Meta, Wind } from './types'

export class Weather {
  @ApiProperty()
  id: string

  @ApiProperty({ example: { lon: 10.99, lat: 44.34 } })
  coord: Coord

  @ApiProperty({ example: 'stations' })
  base: string

  @ApiProperty({ example: 10000 })
  visibility: number

  @ApiProperty({ example: { speed: 0.62, deg: 349, gust: 1.18 } })
  wind: Wind

  rain: Record<string, number>

  clouds: Record<string, number>

  dt: number

  timezone: number

  name: string

  main: Meta
}
