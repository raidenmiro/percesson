import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  getData(): { message: string } {
    return { message: 'Welcome to backend!' }
  }
}
