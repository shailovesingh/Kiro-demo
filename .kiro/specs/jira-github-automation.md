# Spec: Jira-to-GitHub automated bug fix pipeline

## Overview

This spec defines the automated workflow that allows Kiro to take a Jira bug ticket, fix the underlying code issue, run the test suite, and create a GitHub pull request — all without manual developer intervention beyond the initial trigger.

---

## Requirements

### WHEN a developer triggers the Jira Ticket Auto-Solver hook with a ticket ID  
**THEN** the system shall fetch the full Jira ticket details using the Jira MCP  
**AND** the system shall display the ticket summary, description, and acceptance criteria to the developer before proceeding

### WHEN the ticket details have been fetched  
**THEN** the system shall analyse all files in `src/` to locate the root cause of the bug  
**AND** the system shall implement a fix that satisfies every acceptance criterion in the ticket

### WHEN a source file in `src/` is modified  
**THEN** the system shall automatically run the full unit test suite (`npm test`)  
**AND** if tests fail, the system shall report which test failed and propose a corrective change

### WHEN all tests pass after a fix  
**THEN** the system shall add a comment to the Jira ticket listing the files changed  
**AND** the system shall update the Jira ticket status to "In Review"

### WHEN the Kiro agent session ends after a code modification  
**THEN** the system shall create a new Git branch following the naming convention in `03-git-workflow.md`  
**AND** the system shall commit all changed files with a Conventional Commit message referencing the Jira ticket  
**AND** the system shall push the branch and open a pull request on GitHub targeting the `main` branch

### WHEN writing any file  
**THEN** the security scan hook shall inspect the content for hardcoded secrets  
**AND** if a secret is detected, the write shall be blocked and the developer notified

---

## Acceptance criteria (for this spec itself)

- [ ] Triggering the Jira hook with ticket `DEMO-1` causes Kiro to fetch the ticket and fix `src/calculator.ts`
- [ ] The `fileEdited` hook fires automatically after the fix and runs `npm test`
- [ ] All 6 tests in `calculator.test.ts` pass after the fix
- [ ] Kiro adds a comment to DEMO-1 in Jira
- [ ] The `agentStop` hook creates a branch `fix/DEMO-1-division-by-zero` and opens a PR on GitHub
- [ ] The PR description references DEMO-1 and lists the passing tests
- [ ] The second scenario (DEMO-2) works the same way for `src/userService.ts`

---

## Out of scope

- Merging the PR (always requires a human review)
- Modifying Jira epic or sprint settings
- Handling tickets with no clear code-level fix (e.g., design or process tickets)

---

## Design notes

The pipeline uses three Kiro hooks in sequence:

```
userTriggered          fileEdited           agentStop
     │                     │                    │
     ▼                     ▼                    ▼
Fetch Jira ticket  →  Run npm test  →  Create branch + PR
Fix the code          Report result      Update Jira status
```

All three hooks use `askAgent` so Kiro's AI understands context and can handle edge cases intelligently rather than running a rigid script.
