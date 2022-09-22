import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as env from 'env-var'
import { AppModule } from './app/app.module'

const logger = new Logger('Application')
const globalPrefix = 'api'

async function bootstrap() {
  const port = env.get('PORT').default(3333).asString()

  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(globalPrefix)

  await app.listen(port)
  logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
