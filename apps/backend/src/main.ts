import { INestApplication, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const logger = new Logger('Application')
const PORT = 3333

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

  setupSwaggerDocs(app)

  await app.listen(PORT)
  logger.log(`🚀 Application is running on: http://localhost:${PORT}`)
}

try {
  bootstrap().catch(err => {
    logger.error(err, err.stack)
  })
} catch (err) {
  logger.error(err, err.stack)
}
