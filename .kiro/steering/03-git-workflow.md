# Git workflow

## Branch naming

All branches must follow this pattern:

```
<type>/<TICKET-ID>-<short-description-in-kebab-case>
```

| Type | When to use |
|------|-------------|
| `fix` | Bug fixes (most common from Jira bugs) |
| `feat` | New features |
| `refactor` | Code changes with no behaviour change |
| `test` | Adding or updating tests only |
| `docs` | Documentation changes only |

**Examples:**
- `fix/DEMO-1-division-by-zero`
- `fix/DEMO-2-null-email-crash`
- `feat/DEMO-5-add-percentage-method`

## Commit message format

Follow the **Conventional Commits** standard:

```
<type>(<scope>): <short description in present tense> — resolves <TICKET-ID>
```

- The short description must be **lowercase** and **no more than 72 characters**.
- Always reference the Jira ticket at the end.
- The scope is the file/module being changed (e.g., `calculator`, `userService`).

**Examples:**
- `fix(calculator): throw error on division by zero — resolves DEMO-1`
- `fix(userService): handle undefined email gracefully — resolves DEMO-2`
- `test(calculator): add edge case tests for absoluteValue — resolves DEMO-3`

## Pull request template

Every PR must include:

1. **What changed** — a 1–2 sentence summary of the fix.
2. **Why it changed** — link to the Jira ticket.
3. **Tests** — which tests now cover this case.
4. **How to test** — steps to manually verify the fix.

## Merge policy

- All PRs target the `main` branch.
- At least one passing test run is required before merge.
- No direct commits to `main` — all changes via PR.
- PRs created by Kiro must be reviewed by a human before merging.
