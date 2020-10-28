import { NestFactory } from '@nestjs/core';

import { FinderModule } from './finder.module';
import { LogService } from '@/services/log.service';
import { APPConfig } from '@/config/app.config';

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const app = await NestFactory.create(FinderModule, {
    logger: APPConfig.logLevel,
  });
  const logService = app.get(LogService);

  try {
    logService.info('Hello Soup!');

    process.exit(0);
  } catch (e) {
    logService.error('error', e);
    process.exit(1);
  }
}
bootstrap();
