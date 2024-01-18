import { operations } from "./operations";

describe('operations', () => {
    describe('getFixedNumber', () => {
        it('should return the fractional part rounded to two decimal places', () => {
            // Test cases
            expect(operations.getFixedNumber(5.6789)).toEqual(0.68);
            expect(operations.getFixedNumber(10)).toEqual(0);
            expect(operations.getFixedNumber(3.14159)).toEqual(0.14);
        });
    });

    describe('getRatedStar', () => {
        it('should convert a rating in the range of 0 to 10 to a 5-star rating system', () => {
            // Test cases
            expect(operations.getRatedStar(0)).toEqual(0);
            expect(operations.getRatedStar(5)).toEqual(2);
            expect(operations.getRatedStar(8.75)).toEqual(5);
        });

        it('should handle cases where the fractional part is less than 0.51', () => {
            // Test cases
            expect(operations.getRatedStar(3.49)).toEqual(1);
            expect(operations.getRatedStar(7.999)).toEqual(4);
        });

        it('should handle cases where the fractional part is greater than or equal to 0.51', () => {
            // Test cases
            expect(operations.getRatedStar(3.51)).toEqual(2);
            expect(operations.getRatedStar(8.5)).toEqual(4);
        });
    });
});
