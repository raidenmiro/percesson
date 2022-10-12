import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { EnvModule, EnvService } from '../env'
import { WeatherController } from './weather.controller'
import { WeatherService } from './weather.service'

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [EnvModule],
      useFactory: async (env: EnvService) => ({ baseURL: env.weather.baseUrl }),
      inject: [EnvService],
    }),
    EnvModule,
  ],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
