import { Module } from '@nestjs/common'
import { EnvModule } from '../env'
import { UnsplashModule } from '../unsplash'
import { WeatherModule } from '../weather'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [EnvModule, UnsplashModule, WeatherModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
