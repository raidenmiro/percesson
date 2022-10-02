import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

export function request<Done, Fail>(
  httpService: HttpService,
  config: AxiosRequestConfig,
): Promise<Done> | Promise<Fail> {
  const method = config.method
    .split('')
    .map(char => (char === char.toUpperCase() ? char.toLowerCase() : char))
    .join('')

  return firstValueFrom<AxiosResponse<Done>>(httpService[method](config.url))
    .then(res => res.data)
    .catch(error => error.data)
}
