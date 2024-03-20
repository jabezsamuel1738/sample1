export const addition = (num1: number, num2: number) => {
    if (num1 < 0 || num2 < 0) {
        throw new Error("num1 or num2 cannot be negative");
    }
    return num1 + num2;
};