# 🎬 Video Script — Kiro IDE: Hooks + MCP (GitHub & Jira) Demo

**Total runtime:** ~12–14 minutes  
**Before you start:** Complete all steps in `MCP_SETUP_GUIDE.md`

---

## Pre-recording checklist

- [ ] Kiro is open with `kiro-demo` project loaded
- [ ] Both MCP servers (GitHub + Jira) show as connected in the Kiro panel
- [ ] `npm test` shows 6 failing, 6 passing tests in the terminal
- [ ] Jira project `DEMO` is ready with no existing issues
- [ ] GitHub repo `kiro-demo` is on `main` branch with no open PRs
- [ ] Font size in Kiro is large enough for viewers to read (14–16px minimum)
- [ ] Browser is open on Jira (DEMO project) in a separate tab
- [ ] Browser is open on GitHub (kiro-demo repo) in a separate tab
- [ ] Screen resolution: 1920×1080 or higher
- [ ] Notifications silenced

---

## SCENE 1 — Introduction (0:00–0:40)

**[Camera on face or start with screen share]**

**SAY:**
> "Hey everyone. Today I'm going to show you something really exciting —
> Kiro, the AI IDE by Amazon, doing something that used to take a developer
> 20–30 minutes in under 2 minutes.
>
> We have a TypeScript project with real bugs in it. I've raised those bugs
> as Jira tickets. And I'm going to show Kiro automatically:
> read the Jira ticket, fix the code, run the tests, and push a pull request
> to GitHub — all triggered by me typing one line in the chat.
>
> Let me show you how it works."

---

## SCENE 2 — Tour the project (0:40–2:00)

**[Switch to Kiro screen share. Show the file explorer on the left.]**

**SAY:**
> "Here's our project — `kiro-demo`. It's a simple TypeScript library
> with two files in `src/`: a `Calculator` class and a `UserService` class."

**ACTION:** Click `src/calculator.ts` to open it.

**SAY:**
> "Look at this `divide` method. It takes two numbers and returns `a / b`.
> No guard. If you pass zero as the divisor, JavaScript silently returns Infinity.
> That's a bug. And this `absoluteValue` method — it returns `n` for both
> positive and negative, which is wrong."

**ACTION:** Click `src/userService.ts`.

**SAY:**
> "And here in `UserService`, `getUserEmail` accesses `user.email.toLowerCase()`
> — but email is optional. If a user has no email, this crashes with a
> `TypeError: Cannot read properties of undefined`. Classic."

**ACTION:** Click the `tests/` folder and show `calculator.test.ts`.

**SAY:**
> "The test suite already has tests for these bugs — they're currently failing
> because the code is broken. Let me show you."

**ACTION:** Open the integrated terminal in Kiro. Type:
```
npm test
```

**SAY:**
> "Six failing tests. These are the bugs. Now — I've already created Jira
> tickets for these. Let me show you the Kiro setup that makes the automation work."

---

## SCENE 3 — Show the Kiro panel: MCP, Hooks, Steering (2:00–4:30)

**[Click the Ghost icon (👻) in the left sidebar to open the Kiro panel]**

**SAY:**
> "This is the Kiro panel. It has four sections I want to walk you through."

### 3a — MCP Servers

**ACTION:** Expand the "MCP Servers" section.

**SAY:**
> "First — MCP. Model Context Protocol. This is how Kiro connects to
> external tools and services. I've connected two MCP servers."

**ACTION:** Click the pencil/edit icon to open `.kiro/settings/mcp.json`.

**SAY:**
> "This is the config file. I've set up the GitHub MCP — which lets Kiro
> create branches, push code, and open pull requests on my GitHub repo.
> And the Jira MCP — which lets Kiro read tickets, add comments, and
> update ticket status. Both are live right now."

### 3b — Agent Hooks

**ACTION:** Expand the "Agent Hooks" section. You should see 4 hooks.

**SAY:**
> "Second — Agent Hooks. This is Kiro's automation engine. Hooks are
> triggers that automatically run when specific events happen in the IDE.
> I've set up four hooks for this demo."

**ACTION:** Click the first hook — "Jira Ticket Auto-Solver".

**SAY:**
> "Hook one: a manual trigger. When I fire this, Kiro fetches a Jira
> ticket and fixes the code."

**ACTION:** Click the second hook — "Run Unit Tests on File Change".

**SAY:**
> "Hook two: whenever a TypeScript file in `src/` is saved,
> Kiro automatically runs the full test suite. No manual `npm test` needed."

**ACTION:** Click the third hook — "Push Fix to GitHub & Create PR".

**SAY:**
> "Hook three: when the Kiro agent finishes a task, it automatically
> creates a Git branch, commits the fix, pushes it, and opens a pull
> request on GitHub. Completely hands-free."

**ACTION:** Click the fourth hook — "Security Scan Before Write".

**SAY:**
> "And hook four: a safety net. Before Kiro writes any file, it scans
> for hardcoded secrets. If it finds an API key or token in the code,
> it blocks the write and warns me."

### 3c — Steering Files

**ACTION:** Expand the "Agent Steering" section (or open the `.kiro/steering/` folder).

**SAY:**
> "Third — Steering files. These are markdown files that tell Kiro
> how to behave on this specific project. I have three."

**ACTION:** Open `02-coding-standards.md`.

**SAY:**
> "This one defines the coding standards — things like always throwing
> descriptive errors, using early returns, naming conventions.
> When Kiro fixes a bug, it follows these rules automatically."

**ACTION:** Open `03-git-workflow.md`.

**SAY:**
> "And this one defines the Git workflow — branch naming format,
> commit message format using Conventional Commits, and PR template.
> So Kiro's PRs look exactly like a senior developer wrote them."

### 3d — Spec

**ACTION:** Open `.kiro/specs/jira-github-automation.md`.

**SAY:**
> "Finally — the Spec. This is a formal definition of the feature
> we're building. It uses EARS notation — a requirements format.
> It tells Kiro exactly what the expected behaviour is for every
> scenario in this automation pipeline."

---

## SCENE 4 — Raise the Jira ticket (4:30–6:00)

**[Switch to the browser tab with Jira open. DEMO project.]**

**SAY:**
> "Now let's set the stage. I'm going to create the Jira ticket
> that will drive the whole fix."

**ACTION:** Click **"Create"** or **"+ Create issue"** in Jira.

**Fill in the ticket with exactly this:**

- **Issue Type:** Bug
- **Summary:** `Calculator.divide() returns Infinity instead of throwing an error on division by zero`
- **Priority:** High
- **Description:**
```
## Bug Report

**Module:** src/calculator.ts
**Method:** Calculator.divide(a, b)

## Steps to reproduce
1. Create a Calculator instance
2. Call calculator.divide(10, 0)
3. Observe the return value

## Actual behaviour
Returns `Infinity` — JavaScript's silent result of dividing by zero.

## Expected behaviour
Should throw: `Calculator.divide: Division by zero is not allowed. Received divisor: 0`

## Additional context
The absoluteValue() method also has a bug — it returns `n` for negative numbers
instead of `-n`. Both methods need fixing.

## Acceptance criteria
- divide() throws an Error with the message above when b === 0
- absoluteValue() returns the correct positive value for negative inputs
- All existing tests continue to pass
- New tests cover the fixed edge cases
```

**ACTION:** Click **"Create"**. The ticket will be assigned an ID — e.g., `DEMO-1`.

**SAY:**
> "There's our Jira ticket — DEMO-1. A developer has reported the bug,
> written the expected behaviour, and set the acceptance criteria.
> Now watch what happens when I hand this to Kiro."

---

## SCENE 5 — Trigger Kiro to fix the bug (6:00–8:30)

**[Switch back to Kiro. Click the Kiro chat panel.]**

**SAY:**
> "I'm going to do the one thing a developer would do in real life —
> tell Kiro about the ticket."

**ACTION:** In the Kiro chat, type exactly:
```
Fix the bug described in Jira ticket DEMO-1. Use the Jira MCP to fetch
the full ticket details first, then fix the code in src/calculator.ts
so all tests pass.
```

**Press Enter.**

**SAY (while Kiro is working):**
> "Watch the top of the chat — you can see Kiro is calling the Jira MCP.
> It's fetching the ticket right now."

**[Pause and let Kiro work. Narrate what you see:]**

> "It's reading the ticket summary, the description, the acceptance criteria...
> Now it's opening the calculator file... analysing the `divide` method...
> and now it's writing the fix."

**[When Kiro edits `src/calculator.ts`, the fileEdited hook fires automatically]**

**SAY:**
> "And right there — that's hook two firing automatically.
> Kiro just saved the file, and the 'Run Unit Tests on File Change' hook
> triggered. Watch — it's running `npm test` in the background."

**[Wait for test results to appear]**

**SAY:**
> "Look at that — all tests are now passing. The divide-by-zero guard is
> fixed. The absoluteValue is fixed. Let me show you the actual code."

**ACTION:** Open `src/calculator.ts`.

**SAY:**
> "Here's what Kiro wrote. Notice — it followed our coding standards exactly.
> The error message matches the format from `02-coding-standards.md`.
> The guard clause is at the top. Early return pattern. Clean."

---

## SCENE 6 — Watch the agent stop hook push to GitHub (8:30–10:00)

**SAY:**
> "Now here's where it gets really impressive. Kiro has finished the task.
> The agent is about to stop — and that triggers hook three: the GitHub push hook."

**[Wait for the agentStop hook to fire]**

**SAY (narrating as it happens):**
> "Kiro is now creating a Git branch — you can see it following the naming
> convention from our steering file: `fix/DEMO-1-division-by-zero`.
> Now it's committing the changed files with a Conventional Commit message...
> pushing to GitHub... and creating the pull request."

**[When Kiro reports the PR URL in chat]**

**SAY:**
> "And there's the PR URL. Let me switch to GitHub."

**[Switch to GitHub browser tab. Refresh the repo page.]**

**ACTION:** Click on **"Pull requests"** tab.

**SAY:**
> "Here it is — a pull request created entirely by Kiro.
> Branch name, commit message, PR description — all following our Git
> workflow standards. Let me open it."

**ACTION:** Click the PR.

**SAY:**
> "Look at the description. It references DEMO-1, lists the files changed,
> and shows which tests now pass. A human reviewer just needs to check
> the code and click Merge. The developer didn't write a single line
> of Git command — Kiro handled everything."

---

## SCENE 7 — Check Jira (10:00–10:45)

**[Switch to Jira browser tab]**

**SAY:**
> "One more thing — go back to Jira and check ticket DEMO-1."

**ACTION:** Open ticket DEMO-1.

**SAY:**
> "Kiro added a comment to the ticket with the files it changed.
> And updated the status to 'In Review'. The whole paper trail is there —
> the developer, the PM, anyone can see exactly what happened."

---

## SCENE 8 — Second demo: file change hook live (10:45–12:30)

**SAY:**
> "Let me show you the second hook in isolation — the file change hook.
> I'll manually introduce a bug and watch the hook react."

**ACTION:** Open `src/userService.ts`.

**SAY:**
> "I'm going to deliberately break this method to show how the hook works."

**ACTION:** Change line:
```typescript
return user?.email?.toLowerCase() ?? '';
```
back to the broken version:
```typescript
return user!.email.toLowerCase();
```

**Save the file.**

**SAY:**
> "I just saved the file. Watch the chat panel."

**[The fileEdited hook fires automatically]**

**SAY:**
> "The hook fired instantly. Kiro is running `npm test` right now without
> me asking. And look — it caught the failure."

**[When Kiro reports the failing test]**

**SAY:**
> "It's telling me exactly which test failed, what the error is, and it's
> already proposing the fix. This is the hook working as a real-time
> quality gate — every time you save a file, you get instant feedback."

**ACTION:** Ask Kiro in chat:
```
Apply the fix you proposed.
```

**SAY:**
> "Kiro applies the fix, saves the file — and the hook fires again,
> running tests one more time to confirm everything is green."

---

## SCENE 9 — Show the steering files in action (12:30–13:15)

**SAY:**
> "I want to quickly highlight why the steering files matter.
> Every piece of code Kiro wrote in this demo — the error messages,
> the branch names, the commit messages, the PR format —
> all of that came from the steering files.
>
> Without them, Kiro would make reasonable guesses. With them,
> it behaves like a senior engineer who knows your team's conventions.
>
> The steering files are committed to the repo, which means every
> developer on the team gets the same Kiro behaviour. It's like
> a `.eslintrc` — but for AI behaviour."

---

## SCENE 10 — Outro (13:15–13:45)

**SAY:**
> "So to recap what we just saw:
>
> One — MCP servers give Kiro superpowers. GitHub MCP lets it create
> branches and PRs. Jira MCP lets it read tickets and update status.
>
> Two — Hooks automate the workflow. File change hook runs tests on
> every save. Agent stop hook pushes to GitHub when Kiro finishes.
> A security hook blocks secrets from being committed.
>
> Three — Steering files make Kiro behave like your team.
> Error formats, branch names, commit messages — all consistent.
>
> Four — Specs give Kiro a clear definition of done,
> so it knows exactly when a fix is complete.
>
> The whole thing — from Jira ticket to GitHub PR — took about 90 seconds.
> The developer's only job was to type one line.
>
> If you want the full repo with all these hooks, steering files,
> and specs, the link is in the description.
> Thanks for watching."

---

## Things to highlight if you have extra time

- Show the `.kiro/hooks/` folder and explain each JSON file
- Show the spec file and EARS notation
- Demonstrate the security scan hook by accidentally typing a fake token
  in a source file and watching Kiro block it
- Raise a second Jira ticket (DEMO-2) for the `userService.ts` bug and
  repeat the full flow to show it works consistently

---

## Jira Ticket Templates

### DEMO-1 (already shown above)
**Summary:** `Calculator.divide() returns Infinity instead of throwing an error on division by zero`

### DEMO-2 — For the second demo

- **Summary:** `UserService.getUserEmail() crashes with TypeError when user has no email`
- **Priority:** High
- **Description:**
```
## Bug Report

Module: src/userService.ts
Method: UserService.getUserEmail(id)

## Steps to reproduce
1. Create a UserService instance
2. Add a user without an email: { id: 1, name: 'Bob' }
3. Call service.getUserEmail(1)

## Actual behaviour
Throws: TypeError: Cannot read properties of undefined (reading 'toLowerCase')

## Expected behaviour
- If user exists but has no email: return empty string ''
- If user does not exist at all: throw Error('UserService.getUserEmail: User with ID <id> not found')

## Acceptance criteria
- getUserEmail returns '' when user has no email property
- getUserEmail throws descriptive error when user ID does not exist
- All existing tests continue to pass
```

---

## Prompts to use in Kiro chat

Copy these exactly during recording:

**To fix DEMO-1:**
```
Fix the bug described in Jira ticket DEMO-1. Use the Jira MCP to fetch
the full ticket details first, then fix the code in src/calculator.ts
so all tests pass.
```

**To fix DEMO-2:**
```
Fix the bug described in Jira ticket DEMO-2. Fetch it from Jira MCP,
fix src/userService.ts, confirm tests pass, and push a PR to GitHub.
```

**To demonstrate hooks manually:**
```
Show me which Agent Hooks are currently active in this project and
explain what each one does.
```

**To test MCP connectivity:**
```
Use the Jira MCP to list all open bugs in the DEMO project.
```

```
Use the GitHub MCP to list all open pull requests in my kiro-demo repository.
```
