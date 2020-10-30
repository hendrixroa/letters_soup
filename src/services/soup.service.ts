import { Injectable } from '@nestjs/common';

export interface InputStruct {
  dimensionX: number;
  dimensionY: number;
  matrix: string[][];
}

export const TARGET = 'OIE';

@Injectable()
export class SoupService {
  private inputData: InputStruct;

  private getHorizontalWords(): string[] {
    const words = this.inputData.matrix.map((word: string[]) => {
      return word.join('');
    });
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

    return lines;
  }

  public max(a: number, b: number): number {
    return a > b ? a : b;
  }

  private getDiagonals(): string[] {
    const positionsMarked = [];
    const words = [];
    const maxValue = this.max(
      this.inputData.dimensionX,
      this.inputData.dimensionY,
    );

    for (let i = 0; i < this.inputData.dimensionX; i = i + 2) {
      for (let j = 0; j < this.inputData.dimensionY; j++) {
        let word = '';

        if (!positionsMarked.find((pos) => pos === `${i}${j}`)) {
          for (let k = 0; k < maxValue; k++) {
            try {
              word += this.inputData.matrix[i + k][j + k]
                ? this.inputData.matrix[i + k][j + k].trim()
                : '';
              positionsMarked.push(`${i + k}${j + k}`);
            } catch (e) {
              // Ignoring
            }
          }
        }

        if (word.length >= 3) {
          words.push(word);
        }
      }
    }
    return words;
  }

  private getDiagonalsInverted(): string[] {
    const positionsMarked = [];
    const words = [];
    const maxValue = this.max(
      this.inputData.dimensionX,
      this.inputData.dimensionY,
    );
    for (let i = 0; i < this.inputData.dimensionX; i = i + 2) {
      for (let j = 0; j < this.inputData.dimensionY; j++) {
        let word = '';
        if (!positionsMarked.find((pos) => pos === `${i}${j}`)) {
          for (let k = 0; k < maxValue; k++) {
            try {
              word += this.inputData.matrix[i + k][j - k]
                ? this.inputData.matrix[i + k][j - k].trim()
                : '';
              positionsMarked.push(`${i + k}${j - k}`);
            } catch (e) {
              // Ignoring
            }
          }
        }

        if (word.length >= 3) {
          words.push(word);
        }
      }
    }
    return words;
  }

  private countGivenWords(words: string[]): number {
    let counter = 0;
    const regFinder = new RegExp(TARGET, 'g');

    for (const word of words) {
      const matches = word.match(regFinder);
      if (matches) {
        counter += matches.length;
      }

      const wordInverted = word.split('').reverse().join('');

      const matchesInverted = wordInverted.match(regFinder);
      if (matchesInverted) {
        counter += matchesInverted.length;
      }
    }
    return counter;
  }

  public countOIEWord(input: InputStruct): number {
    if (input.dimensionY === 1 && input.dimensionY === 1) {
      // Weird case
      return 0;
    }

    this.inputData = input;
    let accumulator = 0;

    accumulator += this.countGivenWords(this.getHorizontalWords());
    accumulator += this.countGivenWords(this.getVerticalWords());
    accumulator += this.countGivenWords(this.getDiagonals());
    accumulator += this.countGivenWords(this.getDiagonalsInverted());

    return accumulator;
  }
}
