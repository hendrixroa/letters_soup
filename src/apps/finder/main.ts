import { NestFactory } from '@nestjs/core';

import { FinderModule } from './finder.module';
import { APPConfig } from '@/config/app.config';
import { parseToInputStruct } from '@/shared/helpers';

import { LogService } from '@/services/log.service';
import { SoupService } from '@/services/soup.service';

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const app = await NestFactory.create(FinderModule, {
    logger: APPConfig.logLevel,
  });
  const logService = app.get(LogService);
  const soupService = app.get(SoupService);

  try {
    const data = parseToInputStruct('case_7x2.txt');
    const count = soupService.countOIEWord(data);
    console.log(count);

    process.exit(0);
  } catch (e) {
    logService.error('error', e);
    process.exit(1);
  }
}
bootstrap();
