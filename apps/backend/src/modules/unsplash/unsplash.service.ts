import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Observable } from 'rxjs'
import { AxiosResponse } from 'axios'

@Injectable()
export class UnsplashService {
  constructor(private readonly httpService: HttpService) {}

  getRandom(): Observable<AxiosResponse<{ stub: string }>> {
    return this.httpService.get('/photos/random')
  }

  findOne(where: { id: number }) {
    return this.httpService.get(where.id.toString())
  }
}
