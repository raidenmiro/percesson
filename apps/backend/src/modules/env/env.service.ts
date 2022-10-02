import { ConfigService } from '@nestjs/config'
import type { Env } from './types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  private getEnv<Key extends keyof Env>(env: Key): Env[Key] {
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
