import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { request } from '../../shared/lib/request'
import { WeatherDto } from './weather.dto'

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrent({ lat, lon, lang }: WeatherDto) {
    return request(this.httpService, {
      url: `/weather`,
      method: 'GET',
      params: { lat, lon, lang },
    })
  }

  async getCurrentByCity({ city }: { city: string }) {
    return request(this.httpService, {
      url: `/weather`,
      method: 'GET',
      params: { q: city, units: 'metric' },
    })
  }
}
