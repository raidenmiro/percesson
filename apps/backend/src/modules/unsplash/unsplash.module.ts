import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { UnsplashService } from './unsplash.service'
import { UnsplashController } from './unsplash.controller'
import { EnvModule, EnvService } from '../env'

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [EnvModule],
      useFactory: async (env: EnvService) => ({
        baseURL: env.unsplash.baseUrl,
        headers: { Authorization: `Client-ID ${env.unsplash.token}` },
      }),
      inject: [EnvService],
    }),
  ],
  providers: [UnsplashService],
  controllers: [UnsplashController],
})
export class UnsplashModule {}
