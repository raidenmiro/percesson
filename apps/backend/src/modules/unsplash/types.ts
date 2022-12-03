import { ApiProperty } from '@nestjs/swagger'

export class Location {
  @ApiProperty({ type: String })
  name: string

  @ApiProperty({ type: String })
  city: string

  @ApiProperty({ type: String })
  country: string
}

export class Author {
  @ApiProperty()
  id: string

  @ApiProperty({ type: String })
  username: string
}

export class Urls {
  @ApiProperty({ type: String })
  full: string

  @ApiProperty({ type: String })
  regular: string

  @ApiProperty({ type: String })
  small: string

  @ApiProperty({ type: String })
  thumb: string

  @ApiProperty({ type: String })
  raw: string
}

export class Links {
  @ApiProperty({ type: String })
  self: string

  @ApiProperty({ type: String })
  download: string
}
