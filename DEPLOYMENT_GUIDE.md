# 🚀 Production Deployment Guide for Lux Bite

## Overview

This guide walks you through deploying your restaurant website to production with Firebase backend.

## Deployment Options

### Option 1: Firebase Hosting (Recommended - FREE)
### Option 2: Vercel (Alternative - FREE)
### Option 3: Netlify (Alternative - FREE)

---

## Option 1: Firebase Hosting (Recommended)

### Why Firebase Hosting?
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Automatic scaling
- ✅ Integrated with Firebase backend
- ✅ FREE for small businesses

### Step-by-Step Deployment

#### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### 2. Login to Firebase

```bash
firebase login
```

This opens a browser window - login with your Google account.

#### 3. Initialize Firebase Hosting

```bash
firebase init hosting
```

Answer the prompts:
- **What do you want to use as your public directory?** `dist`
- **Configure as a single-page app?** `Yes`
- **Set up automatic builds with GitHub?** `No` (for now)
- **Overwrite index.html?** `No`

#### 4. Build Your Project

```bash
npm run build
```

This creates a `dist` folder with production-ready files.

#### 5. Deploy to Firebase

```bash
firebase deploy --only hosting
```

🎉 Your site is now live at: `https://luxbite-restaurant.web.app`

#### 6. Set Up Custom Domain (Optional)

1. Go to Firebase Console > Hosting
2. Click **"Add custom domain"**
3. Enter your domain: `www.luxbite.lk`
4. Follow DNS configuration instructions
5. Domain will be active in 24-48 hours

---

## Option 2: Vercel Deployment

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy

```bash
vercel
```

Follow the prompts. Your site will be live at: `https://lux-bite.vercel.app`

### Step 4: Add Environment Variables

1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables
2. Add all variables from `.env.local` (without `VITE_` prefix in Vercel UI)

---

## Option 3: Netlify Deployment

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login

```bash
netlify login
```

### Step 3: Deploy

```bash
netlify deploy --prod
```

Build directory: `dist`

Your site will be live at: `https://lux-bite.netlify.app`

---

## Environment Variables for Production

### CRITICAL: Set Production Environment Variables

For **Firebase Hosting** (using GitHub Actions or CLI):

Create `.env.production`:
```env
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=luxbite-restaurant.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=luxbite-restaurant
VITE_FIREBASE_STORAGE_BUCKET=luxbite-restaurant.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_EMAIL=admin@luxbite.com
```

For **Vercel/Netlify**:
Add environment variables in their dashboard (same values as above).

---

## Pre-Deployment Checklist

- [ ] Firebase project created and configured
- [ ] Admin user created in Firebase Authentication
- [ ] Firestore security rules updated
- [ ] Environment variables configured
- [ ] Test orders and reservations working locally
- [ ] Admin panel accessible and functional
- [ ] Build succeeds without errors: `npm run build`
- [ ] All images optimized (use WebP format)
- [ ] Test on mobile devices

---

## Post-Deployment Tasks

### 1. Test Everything

- [ ] Place a real test order
- [ ] Create a test reservation
- [ ] Login to admin panel
- [ ] Update order status
- [ ] Confirm reservation

### 2. Set Up Monitoring

**Firebase Performance Monitoring:**
```bash
firebase init performance
```

**Google Analytics (Optional):**
1. Go to Firebase Console > Analytics
2. Enable Google Analytics
3. Analytics automatically connected!

### 3. Enable Email Notifications (Recommended)

Install Firebase Extensions:

```bash
firebase ext:install firebase/firestore-send-email
```

This allows sending email confirmations to customers when:
- Orders are placed
- Reservations are confirmed

Configuration:
- SMTP Server: Use Gmail or SendGrid
- Gmail: `smtp.gmail.com:587`
- SendGrid: `smtp.sendgrid.net:587`

### 4. Set Up Backup (Important!)

**Automatic Firestore Backups:**
1. Go to Firebase Console > Firestore Database
2. Click ".. ." menu > "Schedule a backup"
3. Choose frequency: Daily
4. Retention: 30 days

---

## Continuous Deployment with GitHub Actions

### Step 1: Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/luxbite-restaurant.git
git push -u origin main
```

### Step 2: Add GitHub Action for Auto-Deploy

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
          VITE_ADMIN_EMAIL: ${{ secrets.VITE_ADMIN_EMAIL }}
        
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: luxbite-restaurant
```

### Step 3: Add GitHub Secrets

1. Go to GitHub repo > Settings > Secrets and variables > Actions
2. Add all environment variables as secrets

Now every push to `main` automatically deploys!

---

## Performance Optimization

### 1. Enable Gzip Compression

Firebase Hosting does this automatically!

### 2. Optimize Images

Use WebP format:
```bash
npm install -g sharp-cli
sharp -i public/images/*.jpg -o public/images/*.webp
```

### 3. Lazy Loading

Already implemented in React with code splitting!

---

## Security Hardening

### 1. Update Firestore Rules (Production Mode)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             request.auth.token.email == "admin@luxbite.com";
    }
    
    // Orders - authenticated users can create, only admin can read/update
    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read, update: if isAdmin();
      allow delete: if false; // Never allow deletion
    }
    
    // Reservations - authenticated users can create, only admin can manage
    match /reservations/{reservationId} {
      allow create: if request.auth != null;
      allow read, update: if isAdmin();
      allow delete: if false; // Never allow deletion
    }
  }
}
```

### 2. Enable Firebase App Check

```bash
firebase init appcheck
```

Select: reCAPTCHA v3

### 3. Rate Limiting

Firebase automatically rate-limits abusive traffic!

---

## Cost Estimation

### Firebase Free Tier (Spark Plan):
- ✅ 10 GB Firestore storage
- ✅ 50,000 reads/day
- ✅ 20,000 writes/day
- ✅ 10 GB Hosting storage
- ✅ 360MB/day bandwidth
- ✅ FREE for small restaurants!

### When to Upgrade (Blaze Plan - Pay As You Go):
- 1000+ orders per month
- Need more than 50,000 reads/day
- Cost: ~$25-50/month for medium restaurant

---

## Monitoring & Analytics

### View Real-Time Data

**Firebase Console Dashboard shows:**
- Active users right now
- Orders per day/week/month
- Reservations statistics
- Error logs

### Set Up Alerts

1. Go to Firebase Console > Alerts
2. Enable:
   - Security rule violations
   - Spike in errors
   - Budget alerts

---

## Maintenance

### Daily Tasks:
- Check admin panel for new orders/reservations
- Respond to customer inquiries

### Weekly Tasks:
- Review order trends
- Check system health in Firebase Console
- Backup important data

### Monthly Tasks:
- Review Firebase usage (stayed within free tier?)
- Update menu items if needed
- Check for security updates: `npm audit`

---

## Troubleshooting Production Issues

### Issue: Orders not appearing in admin panel
**Solution:**
1. Check Firestore security rules
2. Verify admin email matches `.env` variable
3. Check browser console for errors

### Issue: "Failed to fetch" errors
**Solution:**
1. Check Firebase project ID in `.env`
2. Verify Firestore is enabled
3. Check network tab for API errors

### Issue: Slow loading
**Solution:**
1. Check Firebase Performance tab
2. Optimize images (convert to WebP)
3. Enable browser caching

---

## Support & Resources

- **Firebase Documentation**: https://firebase.google.com/docs
- **React Vite Documentation**: https://vitejs.dev
- **Framer Motion**: https://www.framer.com/motion

## Emergency Contacts

**Firebase Support:**
- Console: https://console.firebase.google.com
- Status: https://status.firebase.google.com

---

## Success! 🎉

Your restaurant website is now live and ready to accept orders!

**Admin Panel:** `https://your-domain.com/admin/login`
**Customer Site:** `https://your-domain.com`

**Next Steps:**
1. Share the website with customers
2. Train staff on using admin panel
3. Promote online ordering on social media
4. Consider adding WhatsApp integration for support

Good luck with your business! 🍽️✨
