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

  // BUG (DEMO-1): No division-by-zero guard.
  // Returns Infinity when b = 0 instead of throwing an error.
  divide(a: number, b: number): number {
    return a / b;
  }

  // BUG (DEMO-3): Returns wrong result for negative numbers.
  // Should return -n for negative input, but returns n unchanged.
  absoluteValue(n: number): number {
    return n > 0 ? n : n;
  }
}
