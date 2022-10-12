import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { EnvModule, EnvService } from '../env'
import { UnsplashController } from './unsplash.controller'
import { UnsplashService } from './unsplash.service'

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
