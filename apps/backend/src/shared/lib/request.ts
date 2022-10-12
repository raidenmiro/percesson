import { HttpService } from '@nestjs/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { firstValueFrom, map, Observable } from 'rxjs'

const DEFAULT_METHOD = 'GET'

const toLowerCase = (char: string) => (char === char.toUpperCase() ? char.toLowerCase() : char)

export function request<Done, Fail>(httpService: HttpService, config: AxiosRequestConfig): Promise<Done | Fail> {
  const method = config.method ?? DEFAULT_METHOD
  const normalizeMethod = method.split('').map(toLowerCase).join('')

  const answer: Observable<AxiosResponse<Done, Fail>> = httpService[normalizeMethod](config.url, config)
  return firstValueFrom(answer.pipe(map(response => response.data)))
}
