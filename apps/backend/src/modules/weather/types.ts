import { ApiProperty } from '@nestjs/swagger'

export class Coord {
  @ApiProperty({ type: Number })
  lon: number

  @ApiProperty({ type: Number })
  lat: number
}

export class Wind {
  @ApiProperty({ type: Number })
  speed: number

  @ApiProperty({ type: Number })
  deg: number

  @ApiProperty({ type: Number })
  gust: number
}

export class Main {
  @ApiProperty({ type: Number })
  temp: number

  @ApiProperty({ type: Number })
  feels_like: number

  @ApiProperty({ type: Number })
  temp_min: number

  @ApiProperty({ type: Number })
  temp_max: number

  @ApiProperty({ type: Number })
  pressure: number

  @ApiProperty({ type: Number })
  humidity: number

  @ApiProperty({ type: Number })
  sea_level: number

  @ApiProperty({ type: Number })
  grnd_level: number
}

export class Sys {
  @ApiProperty({ type: Number })
  id: number

  @ApiProperty({ type: Number })
  type: number

  @ApiProperty({ type: String })
  country: string

  @ApiProperty({ type: Number })
  sunrise: number

  @ApiProperty({ type: Number })
  sunset: number

  @ApiProperty({ type: String })
  name: string
}
