import { readFileSync } from 'fs';
import { InputStruct } from '@/services/soup.service';

export const errorFormatFile = 'The file has not the right format';

export const parseToInputStruct = (nameFile: string): InputStruct => {
  const fileContent = readFileSync(
    `${process.cwd()}/data/${nameFile}`,
  ).toString();
  const contentSplit = fileContent.split('\n');

  const dimensions = contentSplit[0]
    .split(' ')
    .map((dimension) => Number(dimension.trim()));

  console.log('dimensions: ', dimensions);

  const isValidDimensions = dimensions.some((dimension) => {
    return typeof dimension == 'number' || dimension >= 1 || dimension <= 100;
  });

  if (!isValidDimensions) {
    throw new Error(errorFormatFile);
  }

  const matrix: string[][] = [];

  for (const arr of [...Array(dimensions[0]).keys()]) {
    matrix.push(Array.from({ length: dimensions[1] }, (v, i) => ''));
  }

  let counter = 0;
  for (let i = 0; i < dimensions[0]; i++) {
    const line: string[] = contentSplit[counter + 1]
      .split('')
      .map((item) => item.trim());
    for (let j = 0; j < dimensions[1]; j++) {
      matrix[i][j] = line[j];
    }
    counter = counter + 1;
  }
  return {
    dimensionX: dimensions[0],
    dimensionY: dimensions[1],
    matrix,
  };
};
