import { INestApplication, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './modules/app/app.module'

const logger = new Logger('Application')
const PORT = 3333

function setupSwaggerDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Percesso-api')
    .setDescription('Sync your stuff')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  setupSwaggerDocs(app)

  await app.listen(PORT)
  logger.log(`🚀 Application is running on: http://localhost:${PORT}`)
}

try {
  bootstrap().catch(error => {
    logger.error(error, error.stack)
  })
} catch (error) {
  logger.error(error, error.stack)
}
