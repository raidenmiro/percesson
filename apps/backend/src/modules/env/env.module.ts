import { Module } from '@nestjs/common'
import { validate } from './env.validation'
import { ConfigModule } from '@nestjs/config'
import { EnvService } from './env.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
