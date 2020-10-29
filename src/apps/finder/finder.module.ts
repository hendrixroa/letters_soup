import { Module } from '@nestjs/common';

// Services
import { LogService } from '@/services/log.service';
import { SoupService } from '@/services/soup.service';

@Module({
  providers: [LogService, SoupService],
})
export class FinderModule {}
