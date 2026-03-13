# Repository Synchronization Guide

This guide explains how to sync content between two GitHub repositories using the automated workflow.

## Overview

The `sync-repos.yml` workflow automatically synchronizes content from another repository (source) to this repository (upskillintech).

## Configuration Steps

### 1. Edit the Workflow File

Edit `.github/workflows/sync-repos.yml` and change line 32:

```yaml
repository: Amynwabu/SOURCE-REPO-NAME  # CHANGE THIS
```

Replace `SOURCE-REPO-NAME` with your source repository name.

Example:
```yaml
repository: Amynwabu/my-content-repo
```

### 2. Configure Sync Commands

Edit lines 37-49 to specify what to sync:

#### Option A: Sync Specific Folders

Uncomment and customize line 40:
```bash
rsync -av --delete source-repo/docs/ ./docs/
```

This syncs the `docs` folder from source repo to this repo.

#### Option B: Sync Specific Files

Uncomment and customize line 43:
```bash
cp source-repo/README.md ./README.md
```

#### Option C: Sync Entire Repository

**⚠️ Use with caution!** Uncomment line 46:
```bash
rsync -av --delete --exclude='.git' source-repo/ ./
```

### 3. Permissions for Private Repositories

If syncing from a private repository:

1. Go to Settings → Secrets and variables → Actions
2. Create a Personal Access Token (PAT):
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` scope
3. Add as secret: `PAT_TOKEN`
4. Update line 34 in workflow:
   ```yaml
   token: ${{ secrets.PAT_TOKEN }}
   ```

## How to Run

### Automatic (Scheduled)

The workflow runs automatically **every day at midnight (00:00 UTC)**.

### Manual Trigger

1. Go to Actions tab
2. Click "Sync with Another Repository" workflow
3. Click "Run workflow" button
4. Select branch (usually `main`)
5. Click "Run workflow"

### Trigger from Another Repo

You can trigger sync when the source repo updates:

1. In the source repository, go to Settings → Webhooks
2. Add webhook:
   - Payload URL: `https://api.github.com/repos/Amynwabu/upskillintech/dispatches`
   - Content type: `application/json`
   - Secret: (optional)
   - Events: "Just the push event"
3. Add workflow dispatch in source repo:
   ```yaml
   - name: Trigger sync
     run: |
       curl -X POST \
         -H "Accept: application/vnd.github+json" \
         -H "Authorization: token ${{ secrets.GITHUB_TOKEN }}" \
         https://api.github.com/repos/Amynwabu/upskillintech/dispatches \
         -d '{"event_type":"sync-request"}'
   ```

## Examples

### Example 1: Sync Only Blog Posts

```bash
rsync -av --delete source-repo/blog-articles/ ./blog-articles/
```

### Example 2: Sync Multiple Folders

```bash
rsync -av --delete source-repo/docs/ ./docs/
rsync -av --delete source-repo/images/ ./client/public/images/
rsync -av --delete source-repo/content/ ./content/
```

### Example 3: Sync with Exclusions

```bash
rsync -av --delete \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='dist' \
  source-repo/ ./
```

## Verification

After the workflow runs:

1. Go to Actions tab
2. Check the latest "Sync with Another Repository" run
3. Click on it to see details
4. Check the commit history for "Sync from source repository [automated]"

## Troubleshooting

### Workflow not running
- Check that the source repo name is correct
- Verify permissions (PAT token for private repos)
- Check Actions tab for error messages

### No changes detected
- Verify the sync commands are uncommented
- Check that source repo has content in specified paths
- Review the workflow logs

### Permission errors
- Ensure PAT token has `repo` scope
- Check that you have write access to this repository

## Two-Way Sync

For bidirectional sync, set up the same workflow in both repositories with opposite directions.

**⚠️ Warning**: Two-way sync can cause conflicts if both repos are modified simultaneously. Use with caution.
