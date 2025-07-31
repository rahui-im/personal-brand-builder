# GitHub Authentication Setup Guide

## Method 1: Personal Access Token (Recommended)

### Step 1: Create Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "Personal Brand Builder Access"
4. Select scopes:
   - ✅ repo (Full control of private repositories)
   - ✅ workflow (Update GitHub Action workflows)
5. Click "Generate token"
6. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

### Step 2: Configure Git to Use Token
```bash
# Option A: Add token to remote URL
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/personal-brand-builder.git

# Option B: Use Windows Credential Manager
git config --global credential.helper manager
# Git will prompt for username and token on first push
```

## Method 2: SSH Key (Advanced)

### Step 1: Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for default location
# Optionally add passphrase
```

### Step 2: Add SSH Key to GitHub
1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Go to GitHub → Settings → SSH and GPG keys
3. Click "New SSH key"
4. Paste your key and save

### Step 3: Update Remote URL
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/personal-brand-builder.git
```

## Method 3: GitHub CLI (If Available)

### Install GitHub CLI
```bash
# Windows (using Scoop)
scoop install gh

# Or download from: https://cli.github.com/
```

### Authenticate
```bash
gh auth login
# Follow interactive prompts
```

## Troubleshooting

### "Support for password authentication was removed"
This means you're using your password instead of a token. Use Method 1 above.

### "Permission denied (publickey)"
Your SSH key isn't set up correctly. Use Method 1 for simpler setup.

### Token Security Tips
- Never commit your token to the repository
- Use tokens with minimal required permissions
- Rotate tokens regularly
- Store tokens in a password manager

## Quick Test
After setup, test your authentication:
```bash
git remote -v  # Check your remote URL
git push -u origin main  # Push your code
```