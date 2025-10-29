---
sidebar_position: 1
---

# Introduction to GitHub Actions CI/CD Pipeline

Automating your project workflows is one of the most powerful ways to ensure speed, consistency, and reliability in modern software development.  
With **GitHub Actions**, you can build a complete **Continuous Integration (CI)** and **Continuous Deployment (CD)** pipeline for your Node.js applications — enabling automatic testing, dependency verification, and deployment.

---

## 🚀 What is CI/CD?

**Continuous Integration (CI)** ensures that every new commit or pull request is automatically tested and verified before merging.  
**Continuous Deployment (CD)** takes it further by automatically deploying your application or documentation once the CI process succeeds.

Together, they eliminate manual steps, reduce human errors, and keep your application always ready for production.

---

## ⚙️ Setting Up the Workflow

GitHub Actions workflows are written in **YAML** files placed inside:

.github/workflows/

less
Copy code

Each workflow defines **when** and **how** your automation should run.

Below is the YAML code for a scheduled testing workflow.

---

## 🧾 Full Workflow Example

```yaml
name: schedule Automated Tests

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  run-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Run tests with logging
        run: |
          npm test -- --verbose > test-results.log 2>&1 || true

       - name: Upload test logs
        uses: actions/upload-artifact@v4
        with:
          name: daily-test-logs
          path: test-results.log

---

## 🧭 Understanding the Workflow (Breakpoint)

following sections break down the above YAML file into smaller parts for easier understanding.

---

## 🧩 Workflow Overview

```yaml
name: schedule Automated Tests


⏰ Trigger Conditions
yaml
Copy code
on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:
schedule — Runs automatically based on the cron syntax.

"0 0 * * *" means it runs every day at midnight (UTC).

workflow_dispatch — Allows manual triggering of the workflow from GitHub’s “Actions” tab.

⚙️ Job Configuration
yaml
Copy code
jobs:
  run-tests:
    runs-on: ubuntu-latest
jobs define what actions will be performed.

run-tests is the name of the job.

runs-on: ubuntu-latest specifies that it will execute on the latest version of Ubuntu Linux.

🔨 Steps Explained
Each step inside the job describes a single action in the testing process.

1. Checkout Repository
yaml
Copy code
- name: Checkout repository
  uses: actions/checkout@v3
This pulls your repository’s latest code into the runner so the workflow can access and test it.

2. Set Up Node.js
yaml
Copy code
- name: Set up Node.js
  uses: actions/setup-node@v3
  with:
    node-version: 20
This installs Node.js version 20, allowing the workflow to run JavaScript/TypeScript code and npm commands.

3. Install Dependencies
yaml
Copy code
- name: Install dependencies
  run: npm install
Installs all required packages defined in your package.json file.

4. Run Tests with Logging
yaml
Copy code
- name: Run tests with logging
  run: |
    npm test -- --verbose > test-results.log 2>&1 || true
Runs your test suite using npm test.

The --verbose flag provides detailed test output.

Output is redirected into a log file named test-results.log.

The || true ensures that the workflow continues even if tests fail (so logs can still be uploaded).

5. Upload Test Logs
yaml
Copy code
- name: Upload test logs
  uses: actions/upload-artifact@v4
  with:
    name: daily-test-logs
    path: test-results.log
Uploads the test log file as an artifact to GitHub.

You can later download it from the workflow’s summary page.

The artifact will be named daily-test-logs.