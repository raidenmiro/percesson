import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { request } from '../../shared/lib/request'
import { Unsplash } from './unsplash.entity'

@Injectable()
export class UnsplashService {
  constructor(private readonly httpService: HttpService) {}

  getRandom() {
    return request<Unsplash, { message: string }>(this.httpService, {
      url: '/photos/random',
      method: 'GET',
    })
  }

  findOne(where: { id: number }) {
    return request<Unsplash, { message: string }>(this.httpService, {
      url: `/photos/${where.id.toString()}`,
      method: 'GET',
    })
  }
}
