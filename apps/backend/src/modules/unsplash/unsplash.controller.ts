import { Controller, Get, Param } from '@nestjs/common'
import { UnsplashService } from './unsplash.service'

@Controller('/unsplash')
export class UnsplashController {
  constructor(private unsplashService: UnsplashService) {}

  @Get('/')
  async getRandom() {
    return this.unsplashService.getRandom()
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.unsplashService.findOne({ id })
  }
}
