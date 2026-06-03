# MCP Setup Guide — Connecting GitHub & Jira to Kiro

Follow these steps before you start recording your video.

---

## Prerequisites

Install these before anything else:

```bash
# Node.js 20+ (needed for GitHub MCP via npx)
node --version   # should be v20 or higher

# Python + uv (needed for Jira MCP via uvx)
pip install uv
uvx --version

# Verify npm is available
npm --version
```

---

## Step 1 — Get your GitHub Personal Access Token (PAT)

1. Go to **https://github.com/settings/tokens**
2. Click **"Generate new token"** → choose **"Fine-grained token"** (recommended) or classic
3. Set expiry to 30 days (or longer for the demo)
4. Required scopes/permissions:
   - `Contents` — Read and Write
   - `Pull requests` — Read and Write
   - `Metadata` — Read (auto-selected)
5. Click **"Generate token"** — copy it immediately, you won't see it again
6. Save it somewhere safe (e.g. a `.env` file that is NOT committed)

---

## Step 2 — Get your Jira API Token

1. Go to **https://id.atlassian.com/manage-profile/security/api-tokens**
2. Click **"Create API token"**
3. Label it `kiro-demo`
4. Click **"Create"** → copy the token
5. Note your Jira URL: `https://YOUR-ORG.atlassian.net`
6. Note your Atlassian account email address

---

## Step 3 — Create a Jira Project for the demo

1. In Jira, click **"Create project"**
2. Choose **"Scrum"** or **"Kanban"**
3. Name it: `Kiro Demo`
4. Project key: `DEMO`
5. Make sure you can create issues of type **Bug**

---

## Step 4 — Create a GitHub Repository

1. Go to **https://github.com/new**
2. Name it: `kiro-demo`
3. Make it **Public** (easier for the MCP to access)
4. Initialize with a `README.md`
5. Clone it locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/kiro-demo.git
   cd kiro-demo
   ```
6. Copy all files from this repo into the cloned folder
7. Push the initial commit:
   ```bash
   git add .
   git commit -m "chore: initial project setup with Kiro hooks and steering"
   git push origin main
   ```

---

## Step 5 — Open the project in Kiro

1. Download Kiro IDE from **https://kiro.dev**
2. Install and open it
3. Click **"Open Folder"** → select your `kiro-demo` folder
4. You should see the Kiro Ghost icon (👻) in the left activity bar

---

## Step 6 — Connect MCP servers in Kiro

### Method A — Edit mcp.json directly (recommended for video)

1. Click the **Ghost icon** (👻) in the left sidebar to open the Kiro panel
2. Find the **"MCP Servers"** section
3. Click the **pencil/edit icon** next to "MCP"
4. This opens `.kiro/settings/mcp.json`
5. Replace the placeholder values with your real tokens:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_YOUR_REAL_TOKEN_HERE"
      },
      "disabled": false
    },
    "jira": {
      "command": "uvx",
      "args": ["mcp-atlassian"],
      "env": {
        "JIRA_URL": "https://your-org.atlassian.net",
        "JIRA_USERNAME": "your-email@example.com",
        "JIRA_API_TOKEN": "YOUR_REAL_JIRA_TOKEN_HERE"
      },
      "disabled": false
    }
  }
}
```

6. Save the file — Kiro will auto-detect the servers and show them as connected

### Method B — Ask Kiro to add it

In the Kiro chat, type:
> "Add a GitHub MCP server using npx and the token ghp_xxxx"

Kiro will update `mcp.json` for you.

---

## Step 7 — Verify the connections

1. In the Kiro panel, the **MCP Servers** section should now show:
   - ✅ **github** — connected
   - ✅ **jira** — connected
2. In the Kiro chat, test with:
   > "Use the Jira MCP to list open issues in the DEMO project"
   
   Kiro should return a list of Jira issues.

3. Test GitHub:
   > "Use the GitHub MCP to list the branches in my kiro-demo repository"

---

## Step 8 — Verify hooks are loaded

1. In the Kiro panel, find the **"Agent Hooks"** section
2. You should see 4 hooks listed:
   - 🎫 Jira Ticket Auto-Solver
   - 🧪 Run Unit Tests on File Change
   - 🚀 Push Fix to GitHub & Create PR
   - 🔒 Security Scan Before Write
3. Make sure all are toggled **enabled**

---

## Step 9 — Install npm dependencies

In the Kiro terminal (or your external terminal):

```bash
cd kiro-demo
npm install
npm test   # should show FAILING tests — this is expected before Kiro fixes them
```

You should see something like:
```
FAIL tests/calculator.test.ts
  ● Calculator › should throw an error when dividing by zero
  ● Calculator › should return a positive value for a negative number

FAIL tests/userService.test.ts
  ● UserService › should return empty string when user has no email
  ● UserService › should throw a descriptive error when user is not found

Tests: 6 failed, 6 passed, 12 total
```

**This is perfect.** These failing tests are what Kiro will fix during the demo.

---

## You're ready to record! 🎬

Open `VIDEO_SCRIPT.md` for the full step-by-step recording script.
