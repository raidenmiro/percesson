import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { EnvService } from '../env'
import { WeatherDto } from './weather.dto'
import { Weather } from './weather.entity'
import { WeatherInterceptor } from './weather.interceptor'
import { WeatherService } from './weather.service'

@Controller('/weather')
@UseInterceptors(WeatherInterceptor)
export class WeatherController {
  constructor(private weatherService: WeatherService, private envService: EnvService) {}

  @Get('/')
  @ApiOperation({ summary: 'get current weather by coords' })
  @ApiResponse({
    status: 200,
    type: Weather,
  })
  async getCurrent(@Query() query: WeatherDto) {
    return this.weatherService.getCurrent(query)
  }

  @ApiOperation({ summary: 'get current weather by city' })
  @ApiResponse({
    status: 200,
    type: Weather,
  })
  @Get('/:city')
  async getCurrentByCity(@Param('city') city: string) {
    return this.weatherService.getCurrentByCity({ city })
  }
}
