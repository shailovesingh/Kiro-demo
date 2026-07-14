export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  // FIX (DEMO-1): Guard against division by zero.
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Calculator.divide: Division by zero is not allowed. Received divisor: 0');
    }
    return a / b;
  }

  // FIX (DEMO-3): Correctly return absolute value.
  absoluteValue(n: number): number {
    return n >= 0 ? n : -n;
  }
}
