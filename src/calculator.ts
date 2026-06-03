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

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error(
        `Calculator.divide: Division by zero is not allowed. Received divisor: 0`
      );
    }
    return a / b;
  }

  absoluteValue(n: number): number {
    return n < 0 ? -n : n;
  }
}
