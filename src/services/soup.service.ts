import { Injectable } from '@nestjs/common';

import { LogService } from '@/services/log.service';

export interface InputStruct {
  dimensionX: number;
  dimensionY: number;
  matrix: string[][];
}

@Injectable()
export class SoupService {
  constructor(private logService: LogService) {}

  public countOIEWord(input: InputStruct): number {
    return 1;
  }
}
