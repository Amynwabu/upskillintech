# Deployment Guide

## Overview

This document outlines how to deploy UpskillinTech to production on Hostinger using GitHub Actions.

## Prerequisites

- Hostinger FTP/SFTP credentials
- GitHub repository access with admin permissions
- Node.js 18+ (for local testing)

## Setting Up GitHub Actions Secrets

The deployment workflow requires sensitive credentials to be stored as GitHub Secrets:

1. Go to your GitHub repository: `https://github.com/Amynwabu/upskillintech`
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Create the following secrets:
   - `HOSTINGER_SERVER`: Your Hostinger SFTP server address (e.g., `sftp.hostinger.com`)
   - `HOSTINGER_USERNAME`: Your Hostinger FTP/SFTP username
   - `HOSTINGER_PASSWORD`: Your Hostinger FTP/SFTP password
   - `VITE_API_URL`: Production API URL (e.g., `https://api.upskillintech.com`)

## Deployment Workflow

### Automatic Deployment

Every time you push to the `main` branch, the GitHub Actions workflow automatically:

1. **Builds** the application:
   - Installs dependencies using pnpm
   - Compiles TypeScript and React code
   - Optimizes assets for production

2. **Deploys** to Hostinger:
   - Uploads the compiled `dist/` folder to your Hostinger server
   - Overwrites previous deployment files

### Manual Deployment

To manually trigger a deployment:

1. Go to the **Actions** tab in your repository
2. Select the **Deploy to Hostinger** workflow
3. Click **Run workflow**
4. Select the `main` branch and click **Run workflow**

## Viewing Deployment Logs

1. Go to the **Actions** tab in your repository
2. Click on the latest workflow run
3. Click on the `deploy` job to view detailed logs

## Troubleshooting

### Deployment Fails Due to Credentials

- Verify that all secrets are correctly set in GitHub
- Ensure the SFTP credentials are correct
- Check if Hostinger's firewall is blocking connections

### Build Fails

- Check the build log for TypeScript or dependency errors
- Ensure all environment variables are set (see `.env.example`)
- Verify that pnpm is properly caching dependencies

### Website Not Updated After Deployment

- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Wait 1-2 minutes for the files to sync on the server
- Verify the files were uploaded to the correct directory on Hostinger

## Environment Variables for Production

Update the `VITE_API_URL` secret in GitHub Actions to point to your production API server.

## Rollback

To rollback to a previous version:

1. Go to the **Code** tab
2. Click on the **Commits** history
3. Find the commit you want to revert to
4. Click the three dots and select **Revert this commit**
5. Or manually push a previous version

## Security Considerations

- Never commit `.env` files or credentials to the repository
- Use GitHub Secrets for all sensitive information
- Regularly rotate your Hostinger FTP/SFTP credentials
- Review deployment logs for any unauthorized access attempts
