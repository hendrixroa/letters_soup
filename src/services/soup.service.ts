import { Injectable } from '@nestjs/common';

import { LogService } from '@/services/log.service';

export interface InputStruct {
  dimensionX: number;
  dimensionY: number;
  matrix: string[][];
}

export const TARGET = 'OIE';

@Injectable()
export class SoupService {
  private inputData: InputStruct;

  constructor(private logService: LogService) {}

  /**
   * Find Occurrences from left to right using TARGET constant to find matches in regExp
   */
  private countLeftRight(): number {
    let counter = 0;
    const regFinder = new RegExp(TARGET, 'g');
    for (let i = 0; i < this.inputData.dimensionX; i++) {
      const line = this.inputData.matrix[i].join('');
      const occurrences = line.match(regFinder);
      if(occurrences) {
        counter += occurrences.length;
      }
    }
    return counter;
  }

  /**
   * Find Occurrences from right to left using TARGET constant reversed to find matches in regExp
   */
  private countRightLeft(): number {
    let counter = 0;
    const reversedTarget = [...TARGET].reverse().join('');
    const regFinder = new RegExp(reversedTarget, 'g');
    for (let i = 0; i < this.inputData.dimensionX; i++) {
      const line = this.inputData.matrix[i].join('');
      const occurrences = line.match(regFinder);
      if(occurrences) {
        counter += occurrences.length;
      }
    }
    return counter;
  }

  private countUpDown(): number {
    let counter = 0;
    const regFinder = new RegExp(TARGET, 'g');
    for (let j = 0; j < this.inputData.dimensionY; j++) {
      let line = '';
      for (let i = 0; i < this.inputData.dimensionX; i++) {
        line += this.inputData.matrix[i][j];
      }
      const occurrences = line.match(regFinder);
      if(occurrences) {
        counter += occurrences.length;
      }
    }
    return counter;
  }

  private countDownUp(): number {
    let counter = 0;
    const reversedTarget = [...TARGET].reverse().join('');
    const regFinder = new RegExp(reversedTarget, 'g');

    for (let j = 0; j < this.inputData.dimensionY; j++) {
      let line = '';
      for (let i = 0; i < this.inputData.dimensionX; i++) {
        line += this.inputData.matrix[i][j];
      }
      const occurrences = line.match(regFinder);
      if(occurrences) {
        counter += occurrences.length;
      }
    }
    return counter;
  }

  private countDiagonalLeftRight(): number {
    /*var arrAcc = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        var acc = '';
        for (let k = 0; k < 3; k++) {
          try {
            acc += rr2[i+k][j+k] ? rr2[i+k][j+k] : '';
          }catch (e) {
            // Ignoring
          }
        }
        arrAcc.push(acc);
      }
    }*/
  }

  private countDiagonalRightLeft(): number {

  }

  private countDiagonalInverseLeftRight(): number {

  }

  private countDiagonalInverseRightLeft(): number {

  }

  public countOIEWord(input: InputStruct): number {

    this.inputData = input;
    let accumulator = 0;
    accumulator += this.countLeftRight();
    accumulator += this.countRightLeft();
    accumulator += this.countUpDown();
    accumulator += this.countDownUp();
    accumulator += this.countDiagonalLeftRight()
    accumulator += this.countDiagonalRightLeft();
    accumulator += this.countDiagonalInverseLeftRight();
    accumulator += this.countDiagonalInverseRightLeft();

    return accumulator;
  }

}
