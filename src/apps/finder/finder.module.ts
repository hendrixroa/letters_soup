import { Module } from '@nestjs/common';

// Services
import { LogService } from '@/services/log.service';

@Module({
  providers: [LogService],
})
export class FinderModule {}
