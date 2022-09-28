import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'

const logger = new Logger('Application')
const globalPrefix = 'api'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(globalPrefix)

  await app.listen(3333)
  logger.log(`🚀 Application is running on: http://localhost:3333`)
}

try {
  bootstrap().catch(err => {
    logger.error(err, err.stack)
  })
} catch (err) {
  logger.error(err, err.stack)
}
