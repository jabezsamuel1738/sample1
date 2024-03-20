import { useState } from "react";

export const useCalculatorScreenVM = () => {
  const [additionResult, setAdditionResult] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const add = (num1: number, num2: number) => {
    try {
      if (num1 < 0 || num2 < 0) {
        setErrorMessage("num1 or num2 cannot be negative");
        return;
      }

      let sum = num1 + num2;
      if (sum > Number.MAX_SAFE_INTEGER) {
        throw new Error("Integer overflow error");
      }
      setAdditionResult(num1 + num2);
      return;
    } catch (error: any) {
      setErrorMessage(error.toString());
    }
  };

  return { add, additionResult, errorMessage };
};



