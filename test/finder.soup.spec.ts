import { SoupService } from '@/services/soup.service';
import { LogService } from '@/services/log.service';

describe('Finder Soup', () => {
  const soupService = new SoupService(new LogService());
  describe('Input Matrices', () => {
    it('should return an integer 3 given 3x3 with 3 OIE words', () => {
      const case3Words = '';

      /*expect(
        soupService.countOIEWord(userId)
      ).toEqual(3)*/
    });
  });
});
