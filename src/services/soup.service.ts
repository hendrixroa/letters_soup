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

  private getHorizontalWords(): string[] {
    const words = this.inputData.matrix.map((word: string[]) => {
      return word.join('');
    });

    console.log('horizontal: ', words);
    return words;
  }

  private getVerticalWords(): string[] {
    const lines = [];
    for (let j = 0; j < this.inputData.dimensionY; j++) {
      let line = '';
      for (let i = 0; i < this.inputData.dimensionX; i++) {
        line += this.inputData.matrix[i][j];
      }
      lines.push(line);
    }
    console.log('vertical: ', lines);

    return lines;
  }

  public max(a: number, b: number): number {
    return a > b ? a : b;
  }

  private getDiagonals(): string[] {
    const words = [];
    const maxValue = this.max(
      this.inputData.dimensionX,
      this.inputData.dimensionY,
    );
    console.log(maxValue);
    for (let i = 0; i < this.inputData.dimensionX; i = i + 2) {
      for (let j = 0; j < this.inputData.dimensionY; j++) {
        let word = '';

        for (let k = 0; k < maxValue; k++) {
          try {
            word += this.inputData.matrix[i + k][j + k]
              ? this.inputData.matrix[i + k][j + k].trim()
              : '';
          } catch (e) {
            // Ignoring
          }
        }

        if (word.length >= 3) {
          console.log('word: ', word);
          words.push(word);
        }
      }
      console.log('\n');
    }
    // console.log('diagonals: ', words);
    return words;
  }

  private getDiagonalsInverted(): string[] {
    const words = [];
    const maxValue = this.max(
      this.inputData.dimensionX,
      this.inputData.dimensionY,
    );
    for (let i = 0; i < this.inputData.dimensionX; i++) {
      for (let j = 0; j < this.inputData.dimensionY; j = j + 2) {
        let word = '';
        for (let k = 0; k < maxValue; k++) {
          try {
            word += this.inputData.matrix[i + k][j - k]
              ? this.inputData.matrix[i + k][j - k]
              : '';
          } catch (e) {
            // Ignoring
          }
        }
        if (word.length >= 3) {
          words.push(word);
        }
      }
    }
    console.log('diagonalsInverted: ', words);
    return words;
  }

  private countGivenWords(words: string[]): number {
    let counter = 0;
    const regFinder = new RegExp(TARGET, 'g');

    for (const word of words) {
      // console.log('word: ', word);

      const matches = word.match(regFinder);
      if (matches) {
        counter += matches.length;
      }

      const wordInverted = word.split('').reverse().join('');

      // console.log('wordInverted: ', wordInverted);

      const matchesInverted = wordInverted.match(regFinder);
      if (matchesInverted) {
        counter += matchesInverted.length;
      }
    }

    console.log('counter: ', counter);
    return counter;
  }

  public countOIEWord(input: InputStruct): number {
    this.inputData = input;
    let accumulator = 0;
    // accumulator += this.countGivenWords(this.getHorizontalWords());
    // accumulator += this.countGivenWords(this.getVerticalWords());
    accumulator += this.countGivenWords(this.getDiagonals());
    accumulator += this.countGivenWords(this.getDiagonalsInverted());

    return accumulator;
  }
}
