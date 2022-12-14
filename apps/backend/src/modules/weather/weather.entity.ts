import { ApiProperty } from '@nestjs/swagger'
import { Coord, Main, Sys, Wind } from './types'

export class Weather {
  @ApiProperty({
    type: String,
  })
  id: string

  @ApiProperty({
    type: Coord,
    example: { lon: 10.99, lat: 44.34 },
  })
  coord: Coord

  @ApiProperty({
    type: String,
    example: 'stations',
  })
  base: string

  @ApiProperty({
    type: String,
    example: 10000,
  })
  visibility: number

  @ApiProperty({
    type: Wind,
    example: { speed: 0.62, deg: 349, gust: 1.18 },
  })
  wind: Wind

  @ApiProperty({ type: Object })
  rain: Record<string, number>

  @ApiProperty({ type: Object })
  clouds: Record<string, number>

  @ApiProperty({ type: Number })
  dt: number

  @ApiProperty({ type: Number })
  timezone: number

  @ApiProperty({ type: String })
  name: string

  @ApiProperty({ type: Main })
  main: Main

  @ApiProperty({ type: Sys })
  sys: Sys
}
