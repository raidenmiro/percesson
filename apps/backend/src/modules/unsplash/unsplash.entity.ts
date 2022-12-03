import { ApiProperty } from '@nestjs/swagger'
import { Author, Links, Location, Urls } from './types'

export class Unsplash {
  @ApiProperty()
  id: string

  @ApiProperty({
    example: {
      created_at: '2016-05-03T11:00:28-04:00',
    },
  })
  created_at: string

  @ApiProperty({
    example: {
      updated_at: '2016-07-10T11:00:01-05:00',
    },
  })
  updated_at: string

  @ApiProperty({
    type: Urls,
    description: 'contains all dimensions',
    example: {
      raw: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
      full: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg',
      regular: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max',
      small: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max',
      thumb: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max',
    },
  })
  urls: { row: Urls }

  @ApiProperty({
    type: Author,
    description: 'author picture',
    example: {
      id: 'QPxL2MGqfrw',
      username: 'exampleuser',
    },
  })
  author: Author

  @ApiProperty({
    type: Location,
    description: 'the location of the created photo',
    example: {
      name: 'Montreal, Canada',
      city: 'Montreal',
      country: 'Canada',
    },
  })
  location: Location

  @ApiProperty({
    type: Links,
    description: 'meta information about photo',
    example: {
      self: 'https://api.unsplash.com/photos/Dwu85P9SOIk',
      download: 'https://unsplash.com/photos/Dwu85P9SOIk/download',
    },
  })
  links: Links
}
