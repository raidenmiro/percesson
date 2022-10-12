import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { request } from '../../shared/lib/request'

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrent({ lat, lon, lang }: { lat: number; lon: number; lang?: string }) {
    return request(this.httpService, {
      url: `/weather`,
      method: 'GET',
      params: { lat, lon, lang },
    })
  }
}
