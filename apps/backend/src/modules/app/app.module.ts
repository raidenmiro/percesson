import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { EnvModule } from '../env'
import { UnsplashModule } from '../unsplash'

@Module({
  imports: [EnvModule, UnsplashModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
