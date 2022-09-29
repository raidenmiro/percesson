import { INestApplication, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const logger = new Logger('Application')
const globalPrefix = 'api'

function setupSwaggerDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Percesso-api')
    .setDescription('Sync your stuff')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(globalPrefix)

  setupSwaggerDocs(app)

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
