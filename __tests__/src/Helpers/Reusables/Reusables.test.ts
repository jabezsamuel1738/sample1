import { addition } from "../../../../src/Helpers/Utilities/Utilities";


describe("addition()", () => {

    describe("Valid inputs", () => {

        test("Should return the sum of two positive numbers", () => {
            expect(addition(1, 2)).toEqual(3);
        });

        test("Should return the sum when num1 is zero", () => {
            expect(addition(0, 2)).toEqual(2);
        });

        test("Should return zero when both numbers are zero", () => {
            expect(addition(0, 0)).toEqual(0);
        });
    });

    describe("Invalid inputs", () => {

        test("Should throw an error when num2 is negative", () => {
            expect(() => {
                addition(1, -2);
            }).toThrow("num1 or num2 cannot be negative");
        });

        test("Should throw an error when num1 is negative", () => {
            expect(() => {
                addition(-1, 2);
            }).toThrow("num1 or num2 cannot be negative");
        });

        test("Should throw an error when both num1 and num2 are negative", () => {
            expect(() => {
                addition(-1, -2);
            }).toThrow("num1 or num2 cannot be negative");
        });
    });

});