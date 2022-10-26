import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Unsplash } from './unsplash.entity'
import { UnsplashService } from './unsplash.service'

@Controller('/unsplash')
export class UnsplashController {
  constructor(private unsplashService: UnsplashService) {}

  @Get('/')
  @ApiOperation({ summary: 'get random unsplash picture' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Unsplash,
  })
  async getRandom() {
    return this.unsplashService.getRandom()
  }

  @Get(':id')
  @ApiOperation({ summary: 'find photo by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Unsplash,
  })
  async findOne(@Param('id') id: number) {
    return this.unsplashService.findOne({ id })
  }
}
