# Branching Strategy & Git Workflow

## Overview
We follow a **Feature Branch Workflow**. The `main` branch is the source of truth and is always deployable. All changes are made in dedicated branches and merged into `main` via Pull Requests (PRs).

## Branches

### 1. Main Branch (`main`)
- **Purpose**: Production-ready code.
- **Protection**: Protected branch. Direct pushes are discouraged; use PRs.
- **Automation**: Pushes to `main` trigger deployment to Vercel/Netlify.

### 2. Feature Branches (`feat/`)
- **Purpose**: Developing new features or enhancements.
- **Naming Convention**: `feat/kebab-case-feature-name`
  - Example: `feat/hero-section`, `feat/contact-form`
- **Source**: Branch off `main`.
- **Merge**: Merge back into `main` via PR.

### 3. Bug Fix Branches (`fix/`)
- **Purpose**: Fixing bugs in the codebase.
- **Naming Convention**: `fix/kebab-case-bug-desc`
  - Example: `fix/mobile-menu-overlap`, `fix/typo-in-footer`
- **Source**: Branch off `main`.
- **Merge**: Merge back into `main` via PR.

### 4. Chore/Maintenance Branches (`chore/`)
- **Purpose**: Configuration changes, dependency updates, build scripts, etc.
- **Naming Convention**: `chore/task-description`
  - Example: `chore/update-dependencies`, `chore/setup-ci`

## Workflow Steps

1.  **Sync**: Ensure your local `main` is up to date.
    ```bash
    git checkout main
    git pull origin main
    ```
2.  **Branch**: Create a new branch for your task.
    ```bash
    git checkout -b feat/my-new-feature
    ```
3.  **Work**: Make changes, test locally.
4.  **Commit**: Use Conventional Commits (as per `rules.md`).
    ```bash
    git commit -m "feat: add responsive hero component"
    ```
5.  **Push**: Push the branch to remote.
    ```bash
    git push -u origin feat/my-new-feature
    ```
6.  **PR**: Create a Pull Request against `main`.
7.  **Review & Merge**: After approval, merge into `main`.

## Pull Request Guidelines
- **Title**: Clear and descriptive (e.g., "feat: Implement Service Showcase").
- **Description**: Briefly explain *what* changed and *why*.
- **Checks**: Ensure CI (build/lint) passes before merging.
