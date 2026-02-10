# ✅ Lux Bite - Quick Start Checklist

Print this and follow step-by-step!

---

## 🔥 FIREBASE SETUP (One-time only)

### Step 1: Create Firebase Account
- [ ] Go to: https://console.firebase.google.com
- [ ] Login with Google account
- [ ] Click "Add project"
- [ ] Name: `luxbite-restaurant`
- [ ] Click "Create project"

### Step 2: Enable Database
- [ ] In Firebase Console, click "Firestore Database"
- [ ] Click "Create database"
- [ ] Choose "Production mode"
- [ ] Select location: "asia-south1" (Mumbai)
- [ ] Click "Enable"

### Step 3: Enable Login System
- [ ] Click "Authentication"
- [ ] Click "Get started"
- [ ] Click "Email/Password"
- [ ] Toggle it ON
- [ ] Click "Save"

### Step 4: Create Admin Account
- [ ] In Authentication, click "Users" tab
- [ ] Click "Add user"
- [ ] Email: `admin@luxbite.com` (or your email)
- [ ] Password: (create strong password - SAVE IT!)
- [ ] Click "Add user"

### Step 5: Get Firebase Config
- [ ] In Firebase Console, click ⚙️ (settings) > Project settings
- [ ] Scroll to "Your apps"
- [ ] Click </> (Web icon)
- [ ] App nickname: `Lux Bite Web`
- [ ] Click "Register app"
- [ ] **COPY** the config values

### Step 6: Add Config to Website
- [ ] Open `.env.local` file in your project
- [ ] Paste the Firebase values:
  ```
  VITE_FIREBASE_API_KEY=...
  VITE_FIREBASE_AUTH_DOMAIN=...
  VITE_FIREBASE_PROJECT_ID=...
  VITE_FIREBASE_STORAGE_BUCKET=...
  VITE_FIREBASE_MESSAGING_SENDER_ID=...
  VITE_FIREBASE_APP_ID=...
  VITE_ADMIN_EMAIL=admin@luxbite.com
  ```
- [ ] Save the file

---

## 💻 LOCAL TESTING

### Run Website Locally
- [ ] Open Terminal/Command Prompt
- [ ] Navigate to project folder:
  ```bash
  cd "C:\Users\NAVEETH\Desktop\Work related\Projects (CV)\Lux Bite"
  ```
- [ ] Start server:
  ```bash
  npm run dev
  ```
- [ ] Open browser: http://localhost:8080

### Test Everything
- [ ] Browse menu
- [ ] Add items to cart
- [ ] Go to checkout
- [ ] Fill delivery details
- [ ] Place test order ✅
- [ ] Go to Reservations page
- [ ] Fill reservation form
- [ ] Submit reservation ✅
- [ ] Go to: http://localhost:8080/admin/login
- [ ] Login with admin credentials
- [ ] Check if order appears ✅
- [ ] Check if reservation appears ✅
- [ ] Update order status ✅

---

## 🚀 DEPLOY TO INTERNET

### Option A: Firebase Hosting (Recommended - FREE)

#### 1. Install Firebase Tools
```bash
npm install -g firebase-tools
```

#### 2. Login
```bash
firebase login
```
(Opens browser - login with Google)

#### 3. Initialize
```bash
firebase init hosting
```
Answer:
- Public directory? `dist`
- Single-page app? `Yes`
- Overwrite index.html? `No`

#### 4. Build Website
```bash
npm run build
```

#### 5. Deploy!
```bash
firebase deploy --only hosting
```

✅ **Your website is now LIVE!**

Your URL: `https://luxbite-restaurant.web.app`

---

## 📱 HOW TO USE ADMIN PANEL

### Daily Workflow

#### Morning:
1. Open: `https://your-website.com/admin/login`
2. Login with admin email and password
3. Check for new orders overnight

#### When New Order Arrives:
1. Order appears in "Pending" section automatically
2. Click **"Confirmed"** button → Customer knows order accepted
3. When kitchen starts cooking → Click **"Preparing"**
4. When food is ready → Click **"Ready"**
5. When driver picks up → Click **"Delivered"**

#### For Reservations:
1. New reservation appears in "Pending"
2. Check availability in restaurant
3. Click **"Confirmed"** if table available
4. Click **"Cancelled"** if no tables

---

## 🎯 HOW TO UPDATE MENU

### Change Prices or Items:

1. Open file: `src/lib/menuData.ts`
2. Find the dish you want to change:
   ```typescript
   {
     name: 'Lamprais',
     price: 1850,  // ← Change price here
     description: '...',  // ← Change description
   }
   ```
3. Save file
4. Rebuild and redeploy:
   ```bash
   npm run build
   firebase deploy
   ```

---

## 💡 TROUBLESHOOTING

### Problem: Orders not showing in admin panel
**Solution:**
1. Check if you're logged in as admin
2. Refresh the page (Ctrl + R)
3. Check Firebase Console → Firestore → orders collection

### Problem: Can't login to admin panel
**Solution:**
1. Double-check email and password
2. Make sure admin account exists in Firebase Authentication
3. Verify `VITE_ADMIN_EMAIL` in `.env.local` matches

### Problem: Website not loading after deployment
**Solution:**
1. Check Firebase Console → Hosting
2. Verify deployment completed successfully
3. Wait 5-10 minutes for DNS propagation

---

## 📞 EMERGENCY CONTACTS

### Firebase Issues:
- Console: https://console.firebase.google.com
- Status: https://status.firebase.google.com

### Hosting Issues:
- Check: Firebase Console → Hosting tab

---

## 🎉 SUCCESS CHECKLIST

After everything is set up:

- [ ] Website is live and accessible
- [ ] Customers can browse menu
- [ ] Customers can add items to cart
- [ ] Customers can place orders
- [ ] Customers can make reservations
- [ ] Admin can login to dashboard
- [ ] Admin can see orders in real-time
- [ ] Admin can update order status
- [ ] Admin can manage reservations
- [ ] Revenue tracking works

---

## 📝 DAILY CHECKLIST FOR STAFF

### Morning (9:00 AM):
- [ ] Login to admin panel
- [ ] Check overnight orders
- [ ] Confirm pending orders
- [ ] Check today's reservations

### During Business Hours:
- [ ] Check admin panel every 30 minutes
- [ ] Update order status as they progress
- [ ] Respond to reservation requests within 1 hour

### End of Day (10:00 PM):
- [ ] Mark completed orders as "Delivered"
- [ ] Mark completed reservations as "Completed"
- [ ] Note today's revenue
- [ ] Backup important data

---

## 🎊 CONGRATULATIONS!

Your restaurant is now fully digital and ready to accept online orders!

**Share your website:**
- Add link to Instagram bio
- Share on Facebook business page
- Print QR code for table tent cards
- Add to Google My Business

**Next Steps:**
1. Train staff on admin panel
2. Promote online ordering
3. Consider offering online-only discounts
4. Collect customer feedback

---

**Good luck with your business! 🍽️✨**

If you need help, refer to:
- FIREBASE_SETUP.md (detailed Firebase guide)
- DEPLOYMENT_GUIDE.md (detailed deployment guide)
- README.md (technical documentation)
