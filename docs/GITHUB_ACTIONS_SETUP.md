# GitHub Actions Setup Guide

## Migration Complete ✅

Your UpskillinTech repository has been successfully configured for automated deployment from GitHub!

## What Was Done

### 1. GitHub Actions Workflows Created

Two workflow files have been created in `.github/workflows/`:

#### **deploy.yml** - Deployment Workflow
- Triggers automatically when you push to the `main` branch
- Builds the application using pnpm
- Deploys compiled files to Hostinger via SFTP
- Handles environment variable injection

#### **ci.yml** - Continuous Integration Workflow
- Runs on every push to `main` or `develop` branches
- Executes TypeScript type checking
- Runs code formatting checks
- Runs test suite
- Builds the application
- Helps catch errors before deployment

### 2. Configuration Files Created

- **.env.example** - Template showing all required environment variables
- **docs/DEPLOYMENT.md** - Comprehensive deployment guide
- **docs/GITHUB_ACTIONS_SETUP.md** - This file

## Next Steps: Set Up GitHub Secrets

To enable automatic deployment, you must add GitHub Secrets with your Hostinger credentials.

### Step 1: Access Repository Settings

1. Go to your repository: `https://github.com/Amynwabu/upskillintech`
2. Click **Settings** (top right)
3. In the left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add Required Secrets

Create these secrets by clicking **New repository secret**:

#### Required Secrets

1. **HOSTINGER_SERVER**
   - Value: Your Hostinger SFTP server address (e.g., `sftp.hostinger.com`)
   - Get this from: Hostinger control panel → FTP Accounts

2. **HOSTINGER_USERNAME**
   - Value: Your Hostinger FTP/SFTP username
   - Get this from: Hostinger control panel → FTP Accounts

3. **HOSTINGER_PASSWORD**
   - Value: Your Hostinger FTP/SFTP password
   - Get this from: Hostinger control panel → FTP Accounts

4. **VITE_API_URL** (Optional)
   - Value: Your production API URL (e.g., `https://api.upskillintech.com`)
   - Default: `http://localhost:3000` (won't work in production)

### Step 3: Verify Secrets

After adding secrets:
1. Go to Settings → Secrets and variables → Actions
2. You should see all 4 secrets listed (values are hidden for security)
3. Secrets are now available to GitHub Actions workflows

## How It Works

### Automatic Deployment Workflow

```
You push to main branch
        ↓
GitHub Actions triggered
        ↓
CI workflow runs (tests, type checking, linting)
        ↓
Build created (TypeScript compiled, React optimized)
        ↓
Deployment workflow runs (if CI passes)
        ↓
Files uploaded to Hostinger via SFTP
        ↓
Website updated with new version
```

## Testing the Setup

### Test Deployment

1. Make a small change to your code
2. Commit and push to `main`: `git push origin main`
3. Go to **Actions** tab in GitHub
4. Watch the workflow run in real-time
5. Check deployment logs for any errors

### Verify Production

After a successful deployment:
1. Wait 1-2 minutes for files to sync
2. Clear your browser cache (Ctrl+Shift+Delete)
3. Visit `https://upskillintech.com` to see updates

## Understanding the Workflow Files

### deploy.yml Structure
```yaml
name: Deploy to Hostinger
on:
  push:
    branches: [main]      # Triggers on main branch push
jobs:
  deploy:
    - Checkout code
    - Install Node.js 18
    - Install dependencies (pnpm)
    - Build app (pnpm build)
    - Upload to Hostinger (SFTP)
```

### ci.yml Structure
```yaml
name: CI - Build and Test
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
jobs:
  build:
    - Checkout code
    - Install Node.js 18
    - Type check (pnpm check)
    - Format check (pnpm format)
    - Run tests (pnpm test)
    - Build app (pnpm build)
```

## Troubleshooting

### Workflows Not Running

**Problem**: No workflows appear in the Actions tab
- **Solution**: Wait 2-3 minutes after pushing. GitHub sometimes has delays.

### Deployment Fails with "Connection refused"

**Problem**: SFTP connection cannot be established
- **Solution**:
  - Verify Hostinger credentials are correct
  - Check if Hostinger server supports SFTP (not just FTP)
  - Ensure IP is not blocked by Hostinger firewall

### Build Fails with "pnpm: command not found"

**Problem**: pnpm is not installed in the workflow
- **Solution**: The workflow installs pnpm automatically. Check the log for other dependency errors.

### Website Shows Old Version After Deployment

**Problem**: Changes don't appear after deployment
- **Solution**:
  - Clear browser cache completely
  - Wait 1-2 minutes for server to sync files
  - Check Hostinger file manager to verify new files are there

## Managing Deployments

### Manual Deployment Trigger

1. Go to **Actions** tab
2. Select **Deploy to Hostinger** workflow
3. Click **Run workflow** (right side)
4. Choose branch and click **Run workflow**

### Viewing Logs

1. Go to **Actions** tab
2. Click on a workflow run
3. Click on the `deploy` job to see detailed logs
4. Look for error messages or warnings

### Rollback to Previous Version

1. Go to **Code** tab → **Commits**
2. Find the commit you want to deploy
3. Click the commit hash
4. Look for a deploy button or manually trigger from Actions tab

## Security Best Practices

✅ **DO:**
- Store all credentials in GitHub Secrets (not in code)
- Regularly rotate Hostinger FTP password
- Review deployment logs for unusual activity
- Keep `.env` files out of version control

❌ **DON'T:**
- Commit passwords or API keys to the repository
- Share Hostinger credentials via email or chat
- Use weak passwords for FTP accounts
- Commit `.env` files

## Migration Notes

### From Manus to GitHub

You're transitioning from:
- **Manus** (Website builder) → **GitHub** (Version control)
- **Manual FTP uploads** → **Automated deployments**
- **Single source of truth**: Now your GitHub repository is the source

### Content Preservation

All your website content has been preserved:
- Images and assets in `client/public/` folder
- React components and styling in `client/src/`
- Backend logic in `server/` folder
- Database configuration in `drizzle/` folder

## Getting Help

If you encounter issues:

1. Check the **Actions** tab for workflow logs
2. Review **docs/DEPLOYMENT.md** for detailed guidance
3. Check GitHub's documentation: https://docs.github.com/en/actions
4. Review error messages in the workflow run details

## Next Milestone

Once secrets are configured and deployment is working:

1. Set up proper monitoring/alerting
2. Configure branch protection rules
3. Set up automated backups
4. Implement staging environment for testing
5. Consider adding additional workflows for performance testing
