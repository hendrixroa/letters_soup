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
    const dataCase1 = parseToInputStruct('case_1x1.txt');
    const countCase1 = soupService.countOIEWord(dataCase1);
    console.log(countCase1);

    const dataCase2 = parseToInputStruct('case_1x10.txt');
    const countCase2 = soupService.countOIEWord(dataCase2);
    console.log(countCase2);

    const dataCase3 = parseToInputStruct('case_3x3.txt');
    const countCase3 = soupService.countOIEWord(dataCase3);
    console.log(countCase3);

    const dataCase4 = parseToInputStruct('case_5x5.txt');
    const countCase4 = soupService.countOIEWord(dataCase4);
    console.log(countCase4);

    const dataCase5 = parseToInputStruct('case_7x2.txt');
    const countCase5 = soupService.countOIEWord(dataCase5);
    console.log(countCase5);

    process.exit(0);
  } catch (e) {
    logService.error('error', e);
    process.exit(1);
  }
}
bootstrap();
