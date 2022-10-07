import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { request } from '../../shared/lib/request'

@Injectable()
export class UnsplashService {
  constructor(private readonly httpService: HttpService) {}

  getRandom(): Promise<AxiosResponse<{ stub: string }>> {
    return request(this.httpService, {
      url: '/photos/random',
      method: 'GET',
    })
  }

  findOne(where: { id: number }) {
    return request(this.httpService, {
      url: `/photos/${where.id.toString()}`,
      method: 'GET',
    })
  }
}
