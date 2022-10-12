import { HttpService } from '@nestjs/axios'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import axios from 'axios'
import { Observable } from 'rxjs'
import { EnvService } from '../env'

@Injectable()
export class WeatherInterceptor implements NestInterceptor {
  constructor(private readonly httpService: HttpService, private readonly envService: EnvService) {}

  intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    this.httpService.axiosRef.interceptors.request.use(req => {
      const token = this.envService.weather.key
      const url = axios.getUri(req)

      return {
        ...req,
        url: url.concat(`&appid=${token}`),
      }
    })

    return next.handle()
  }
}
