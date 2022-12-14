import { ApiProperty } from '@nestjs/swagger'

export class WeatherDto {
  @ApiProperty({ type: Number })
  lon: number

  @ApiProperty({ type: Number })
  lat: number

  @ApiProperty({ type: String })
  lang?: string
}
