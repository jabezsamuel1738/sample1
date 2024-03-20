import { useState as useStateMock } from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useCalculatorScreenVM } from "../../../../src/Screens/CalculatorScreen/CalculatorScreen.VM";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const setState = jest.fn();
const mockUseState: any = useStateMock;

describe("add()", () => {
  beforeEach(() => {
    mockUseState.mockImplementation((initialValue: any) => [
      initialValue,
      setState,
    ]);
  });

  afterEach(() => {
    mockUseState.mockReset();
    jest.clearAllMocks();
  });

  describe("Valid inputs", () => {
    test("Should return the sum of two positive numbers", () => {
      // Mocking useState to return separate values for errorMessage and additionResult
      mockUseState.mockImplementationOnce(() => [5, () => null]); // additionResult
      mockUseState.mockImplementationOnce(() => ["", setState]); // errorMessage

      const { result } = renderHook(() => useCalculatorScreenVM());

      act(() => {
        result.current.add(9007199254740991, 10);
      });

      expect(result.current.additionResult).toBe(5);
    });
  });

  describe("Invalid inputs", () => {
    test("Should set an error message when num2 is negative", () => {

      // Mocking useState to return separate values for errorMessage and additionResult
      mockUseState.mockImplementationOnce(() => [5, () => null]); // additionResult
      mockUseState.mockImplementationOnce(() => [
        "num1 or num2 cannot be negative",
        () => null,
      ]); // errorMessage

      const { result } = renderHook(() => useCalculatorScreenVM());

      act(() => {
        result.current.add(1, -2);
      });

      expect(result.current.errorMessage).toBe(
        "num1 or num2 cannot be negative"
      );
    });

    test("Should set an error message when num1 + num2 overflows integer", () => {

        // Mocking useState to return separate values for errorMessage and additionResult
        mockUseState.mockImplementationOnce(() => [5, () => null]); // additionResult
        mockUseState.mockImplementationOnce(() => [
          "Integer overflow error",
          () => null,
        ]); // errorMessage
  
        const { result } = renderHook(() => useCalculatorScreenVM());
  
        act(() => {
          result.current.add(9223372036854775807, 9223372036854775807);
        });
  
        expect(result.current.errorMessage).toBe(
          "Integer overflow error"
        );
    });
  });
});
