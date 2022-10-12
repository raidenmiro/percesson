import { Controller, Get, Query, UseInterceptors } from '@nestjs/common'
import { EnvService } from '../env'
import { WeatherDto } from './weather.dto'
import { WeatherInterceptor } from './weather.interceptor'
import { WeatherService } from './weather.service'

@Controller('/weather')
@UseInterceptors(WeatherInterceptor)
export class WeatherController {
  constructor(private weatherService: WeatherService, private envService: EnvService) {}

  @Get('/')
  async getCurrent(@Query() query: WeatherDto) {
    return this.weatherService.getCurrent(query)
  }
}
