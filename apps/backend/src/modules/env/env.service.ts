import { ConfigService } from '@nestjs/config'
import type { Env } from './types'

export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  private getEnv(env: keyof Env) {
    return this.configService.get(env, { infer: true })
  }

  get app() {
    return this.getEnv('app')
  }

  get db() {
    return this.getEnv('database')
  }

  get unsplash() {
    return this.getEnv('unsplash')
  }
}
