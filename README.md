# kiro-demo

> A demo project showcasing **Kiro IDE** — Hooks, MCP (GitHub + Jira), Steering files, and Specs working together to automate the full bug-fix lifecycle.

---

## What this demo shows

| Feature | What it does in this project |
|---|---|
| **GitHub MCP** | Kiro creates branches, pushes commits, and opens PRs automatically |
| **Jira MCP** | Kiro reads tickets, updates status, and adds comments automatically |
| **Hook: userTriggered** | Fire once → Kiro reads Jira ticket and fixes the code |
| **Hook: fileEdited** | Every time a `.ts` file is saved → tests run automatically |
| **Hook: agentStop** | When Kiro finishes → branch + PR created on GitHub automatically |
| **Hook: preToolUse** | Before any file write → security scan for hardcoded secrets |
| **Steering files** | Guide Kiro's coding style, error formats, branch names, PR templates |
| **Spec** | Formal EARS-notation requirements for the automation pipeline |

---

## Project structure

```
kiro-demo/
├── .kiro/
│   ├── settings/
│   │   └── mcp.json                    ← GitHub + Jira MCP configuration
│   ├── hooks/
│   │   ├── 01-jira-ticket-solver.json  ← userTriggered: fetch ticket & fix code
│   │   ├── 02-test-on-file-change.json ← fileEdited: auto run npm test
│   │   ├── 03-push-to-github.json      ← agentStop: create branch + PR
│   │   └── 04-security-scan.json       ← preToolUse: block hardcoded secrets
│   ├── steering/
│   │   ├── 01-project-context.md       ← What this project is
│   │   ├── 02-coding-standards.md      ← TypeScript & error handling rules
│   │   └── 03-git-workflow.md          ← Branch names, commits, PR format
│   └── specs/
│       └── jira-github-automation.md   ← EARS-notation feature spec
├── src/
│   ├── calculator.ts     ← Has 2 intentional bugs (DEMO-1, DEMO-3)
│   ├── userService.ts    ← Has 1 intentional bug (DEMO-2)
│   └── index.ts
├── tests/
│   ├── calculator.test.ts   ← 6 tests currently FAILING
│   └── userService.test.ts  ← 3 tests currently FAILING
├── MCP_SETUP_GUIDE.md   ← Step-by-step MCP connection instructions
├── VIDEO_SCRIPT.md      ← Full recording script with timestamps
├── package.json
└── tsconfig.json
```

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run tests — you'll see 6 failures (expected before Kiro fixes them)
npm test

# 3. Follow MCP_SETUP_GUIDE.md to connect GitHub and Jira

# 4. Open in Kiro, tell it: "Fix the bug in Jira ticket DEMO-1"
```

---

## The demo flow

```
Developer types one line in Kiro chat
           │
           ▼
   [Hook 1 fires — userTriggered]
   Kiro reads Jira ticket via MCP
   Kiro analyses src/calculator.ts
   Kiro writes the fix
           │
           ▼
   [Hook 2 fires — fileEdited]
   npm test runs automatically
   All tests pass ✅
           │
           ▼
   [Hook 3 fires — agentStop]
   Kiro creates branch: fix/DEMO-1-division-by-zero
   Kiro commits with Conventional Commit message
   Kiro pushes to GitHub
   Kiro opens Pull Request
   Jira ticket updated to "In Review"
           │
           ▼
   Developer reviews PR and merges 🎉
```

---

## Intentional bugs (for the demo)

| File | Method | Bug | Ticket |
|---|---|---|---|
| `src/calculator.ts` | `divide(a, b)` | Returns `Infinity` when `b = 0` instead of throwing | DEMO-1 |
| `src/calculator.ts` | `absoluteValue(n)` | Returns `n` for negatives instead of `-n` | DEMO-3 |
| `src/userService.ts` | `getUserEmail(id)` | Crashes with `TypeError` when email is undefined | DEMO-2 |

---

## Documentation

- **`MCP_SETUP_GUIDE.md`** — How to get API tokens and connect GitHub + Jira MCPs to Kiro
- **`VIDEO_SCRIPT.md`** — Full scene-by-scene recording script with exact dialogue and actions
