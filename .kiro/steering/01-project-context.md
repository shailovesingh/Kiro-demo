# Project context

## What this project is

This is **kiro-demo** — a TypeScript utility library that provides a `Calculator` class and a `UserService` class. It is used as a live demo project to showcase Kiro's agentic capabilities: automated bug fixing via Jira MCP, automated testing via hooks, and automated GitHub PR creation.

## Tech stack

- Language: TypeScript 5.x
- Runtime: Node.js 20+
- Testing: Jest with ts-jest
- Package manager: npm
- Source files: `src/`
- Test files: `tests/`
- Build output: `dist/` (not committed)

## Project structure

```
kiro-demo/
├── src/
│   ├── calculator.ts      # Calculator utility class
│   ├── userService.ts     # User management service
│   └── index.ts           # Public exports
├── tests/
│   ├── calculator.test.ts
│   └── userService.test.ts
└── .kiro/
    ├── hooks/             # Automated agent hooks
    ├── steering/          # Kiro behaviour guides (this folder)
    ├── specs/             # Feature specifications
    └── settings/          # MCP server configuration
```

## Connected MCP servers

- **GitHub MCP** — Kiro can create branches, push code, and open PRs automatically.
- **Jira MCP** — Kiro can read tickets, add comments, and update status automatically.

## Important rules

- Never modify files in `dist/` — that is build output only.
- Never hardcode secrets or tokens in source files.
- All bug fixes must have a corresponding test that would have caught the bug.
- The `main` branch is protected. All fixes go through a PR.
