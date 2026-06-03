import { Calculator } from '../src/calculator';

describe('Calculator', () => {
  let calc: Calculator;

  beforeEach(() => {
    calc = new Calculator();
  });

  // ── Basic operations (these PASS before the fix) ──────────────────────────

  test('should add two positive numbers', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(calc.subtract(10, 4)).toBe(6);
  });

  test('should multiply two numbers', () => {
    expect(calc.multiply(3, 4)).toBe(12);
  });

  // ── Division (these FAIL before DEMO-1 is fixed) ─────────────────────────

  test('should divide two valid numbers', () => {
    expect(calc.divide(10, 2)).toBe(5);
  });

  test('should throw an error when dividing by zero', () => {
    expect(() => calc.divide(10, 0)).toThrow(
      'Calculator.divide: Division by zero is not allowed. Received divisor: 0'
    );
  });

  test('should throw an error when dividing negative number by zero', () => {
    expect(() => calc.divide(-5, 0)).toThrow(
      'Calculator.divide: Division by zero is not allowed. Received divisor: 0'
    );
  });

  // ── Absolute value (these FAIL before DEMO-3 is fixed) ───────────────────

  test('should return the same value for a positive number', () => {
    expect(calc.absoluteValue(7)).toBe(7);
  });

  test('should return a positive value for a negative number', () => {
    expect(calc.absoluteValue(-5)).toBe(5);
  });

  test('should return zero for zero', () => {
    expect(calc.absoluteValue(0)).toBe(0);
  });
});
