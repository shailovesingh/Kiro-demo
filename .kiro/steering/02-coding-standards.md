# Coding standards

## TypeScript conventions

- Use `const` by default; only use `let` when reassignment is required. Never use `var`.
- Always annotate function return types explicitly — no implicit `any`.
- Use `interface` for object shapes, `type` for unions and aliases.
- Prefer `optional chaining` (`?.`) and `nullish coalescing` (`??`) over manual null checks.
- Use early returns to reduce nesting. Avoid `else` after a `return` or `throw`.

## Error handling

- **Always throw descriptive errors.** Never silently return `undefined`, `null`, or `Infinity` when an invalid operation is attempted.
- Error messages must explain **what went wrong** and **what value caused it**.
- Format: `throw new Error('<ClassName>.<methodName>: <description>. Received: <value>')`.
- Example: `throw new Error('Calculator.divide: Division by zero is not allowed. Received divisor: 0')`.

## Functions and methods

- Each function must do **one thing only**.
- Maximum function length: 30 lines. If longer, extract helper functions.
- Guard clauses come first — validate inputs at the top, throw early.
- Never return different types from the same function depending on a condition.

## Naming

- `camelCase` for variables and function names.
- `PascalCase` for class and interface names.
- `UPPER_SNAKE_CASE` for constants.
- Boolean variables/functions should be prefixed: `isValid`, `hasEmail`, `canDivide`.
- File names match the class name: `Calculator` lives in `calculator.ts`.

## Testing

- Every bug fix **must** include a test that would have caught the bug before it was fixed.
- Test names follow the pattern: `'should <expected behaviour> when <condition>'`.
- Tests are in `tests/` and mirror the `src/` structure.
- Use `describe` to group tests by class, `test` or `it` for individual cases.
- Aim for 80%+ coverage on all new code.

## Imports

- Use named exports, never default exports (except for `index.ts`).
- Group imports: external packages first, then internal modules, separated by a blank line.
