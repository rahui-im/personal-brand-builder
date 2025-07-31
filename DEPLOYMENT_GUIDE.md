# 🚀 Deployment Guide - Personal Brand Builder

## 📦 Vercel Deployment (Recommended)

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/personal-brand-builder&env=NEXT_PUBLIC_APP_NAME&envDescription=Configure%20your%20app%20name&envLink=https://github.com/YOUR_USERNAME/personal-brand-builder%23environment-variables)

### Method 2: Vercel CLI

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Deploy to Production**
```bash
vercel --prod
```

### Method 3: GitHub Integration

1. **Push code to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com/new](https://vercel.com/new)
- Import your GitHub repository
- Configure project settings
- Deploy!

## ⚙️ Configuration

### Environment Variables

Create these in Vercel Dashboard → Settings → Environment Variables:

```env
# Required
NEXT_PUBLIC_APP_NAME="Personal Brand Builder - 희희락락"
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Custom Domain

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate auto-configured

## 🔧 Build Configuration

The project includes `vercel.json` with:
- Optimized for Korean region (Seoul - icn1)
- Security headers configured
- API routes with proper timeouts
- Build optimizations

## 📊 Performance Optimization

### Build Optimizations
- Image optimization with Next.js Image
- Font optimization with next/font
- Code splitting automatic
- API routes edge-compatible

### Monitoring
1. **Vercel Analytics**
   - Auto-enabled on deployment
   - Real User Metrics (RUM)
   - Web Vitals tracking

2. **Speed Insights**
   - Performance monitoring
   - Bundle size analysis
   - Loading time metrics

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
```bash
# Check locally first
npm run build
npm run start
```

2. **Environment Variables**
- Ensure all required vars are set
- Check for typos in variable names
- Restart deployment after changes

3. **API Routes Not Working**
- Check function logs in Vercel Dashboard
- Verify API route exports
- Check CORS settings if needed

### Debug Commands
```bash
# Check build output
vercel build

# List deployments
vercel ls

# Check logs
vercel logs
```

## 🔄 CI/CD with GitHub Actions

The project includes GitHub Actions for:
- Automatic testing on push
- Preview deployments for PRs
- Production deployment on main branch

### Required GitHub Secrets
Add these to your repository settings:
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

Get these from:
1. Vercel Dashboard → Settings → Tokens
2. Project Settings → General → Project ID
3. Team Settings → General → Team ID

## 📱 Post-Deployment

### 1. Test Your Deployment
- [ ] Homepage loads correctly
- [ ] "희희락락" displays properly
- [ ] Builder interface works
- [ ] Responsive on mobile
- [ ] API routes functioning

### 2. Setup Monitoring
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking
- [ ] Configure uptime monitoring

### 3. Optimize Performance
- [ ] Review bundle size
- [ ] Check Core Web Vitals
- [ ] Optimize images
- [ ] Enable caching

## 🎉 Success!

Your Personal Brand Builder is now live! Share your URL:
```
https://your-project.vercel.app
```

Or with custom domain:
```
https://your-domain.com
```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Performance Best Practices](https://web.dev/vitals/)

---

Need help? Open an issue on GitHub or check Vercel Support.