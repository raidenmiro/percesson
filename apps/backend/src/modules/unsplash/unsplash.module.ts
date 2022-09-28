import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { UnsplashService } from './unsplash.service'
import { UnsplashController } from './unsplash.controller'

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.unsplash.com/',
    }),
  ],
  providers: [UnsplashService],
  controllers: [UnsplashController],
})
export class UnsplashModule {}
