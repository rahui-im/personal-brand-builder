# GitHub Setup Instructions

## Quick Setup Commands

After creating your repository on GitHub, run these commands:

```bash
# 1. Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/personal-brand-builder.git

# 2. Rename branch to main (GitHub's default)
git branch -M main

# 3. Push your code to GitHub
git push -u origin main
```

## Alternative: Using Personal Access Token

If you get authentication errors:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with 'repo' permissions
3. Use this format for the remote URL:
   ```
   https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/personal-brand-builder.git
   ```

## Project Description for GitHub

**Title:** Personal Brand Builder - 희희락락

**Description:** 
A modern drag-and-drop website builder for creating stunning personal brand websites. Features a beautiful gradient design with Korean branding "희희락락" (joy and happiness).

**Topics/Tags:** 
- nextjs
- typescript
- tailwindcss
- website-builder
- drag-and-drop
- personal-branding
- korean
- responsive-design

## After Pushing

Your repository will be live at:
- Repository: `https://github.com/YOUR_USERNAME/personal-brand-builder`
- Can be deployed to Vercel: Connect your GitHub repo to Vercel for instant deployment