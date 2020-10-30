import { SoupService } from '../src/services/soup.service';

import { parseToInputStruct } from '../src/shared/helpers';

describe('Finder Soup', () => {
  const soupService = new SoupService();

  describe('Input Matrices', () => {
    it('should return an integer 0 given 1x1 with 0 OIE words', () => {
      const data1X1 = parseToInputStruct('case_1x1.txt');
      expect(soupService.countOIEWord(data1X1)).toEqual(0);
    });

    it('should return an integer 4 given 1x10 with 4 OIE words', () => {
      const data1X10 = parseToInputStruct('case_1x10.txt');
      expect(soupService.countOIEWord(data1X10)).toEqual(4);
    });

    it('should return an integer 3 given 3x3 with 3 OIE words', () => {
      const data3x3 = parseToInputStruct('case_3x3.txt');
      expect(soupService.countOIEWord(data3x3)).toEqual(3);
    });

    it('should return an integer 8 given 5x5 with 8 OIE words', () => {
      const data5x5 = parseToInputStruct('case_5x5.txt');
      expect(soupService.countOIEWord(data5x5)).toEqual(8);
    });

    it('should return an integer 3 given 7x2 with 3 OIE words', () => {
      const data7X2 = parseToInputStruct('case_7x2.txt');
      expect(soupService.countOIEWord(data7X2)).toEqual(3);
    });
  });
});
