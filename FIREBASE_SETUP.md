# 🔥 Firebase Setup Guide for Lux Bite Restaurant

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `luxbite-restaurant`
4. Disable Google Analytics (optional for now)
5. Click **"Create project"**

## Step 2: Register Your Web App

1. In Firebase Console, click the **Web icon** (</>) to add a web app
2. App nickname: `Lux Bite Web`
3. **DO NOT** check "Firebase Hosting" (for now)
4. Click **"Register app"**
5. **COPY** the Firebase configuration object - you'll need this!

The config looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "luxbite-restaurant.firebaseapp.com",
  projectId: "luxbite-restaurant",
  storageBucket: "luxbite-restaurant.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 3: Enable Firestore Database

1. In Firebase Console, go to **"Build" > "Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll add security rules later)
4. Select location: **asia-south1** (Mumbai) or **asia-southeast1** (Singapore) - closest to Sri Lanka
5. Click **"Enable"**

## Step 4: Set Up Firestore Security Rules

1. In Firestore Database, click **"Rules"** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Orders collection - customers can create, admins can read/update
    match /orders/{orderId} {
      allow create: if request.auth != null || true; // Allow anonymous orders for now
      allow read, update: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Reservations collection - customers can create, admins can read/update
    match /reservations/{reservationId} {
      allow create: if request.auth != null || true; // Allow anonymous reservations for now
      allow read, update: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

3. Click **"Publish"**

## Step 5: Enable Authentication

1. Go to **"Build" > "Authentication"**
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Enable **"Email/Password"** provider
5. Click **"Save"**

## Step 6: Create Admin User

1. In Authentication, click **"Users"** tab
2. Click **"Add user"**
3. Email: `admin@luxbite.com` (or your email)
4. Password: Create a strong password (save it securely!)
5. Click **"Add user"**

## Step 7: Configure Environment Variables

1. Open the file `.env.local` in your project
2. Replace the placeholder values with your Firebase config:

```env
VITE_FIREBASE_API_KEY=AIzaSy...  (from firebaseConfig)
VITE_FIREBASE_AUTH_DOMAIN=luxbite-restaurant.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=luxbite-restaurant
VITE_FIREBASE_STORAGE_BUCKET=luxbite-restaurant.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

VITE_ADMIN_EMAIL=admin@luxbite.com  (the admin email you created)
```

3. **IMPORTANT**: Never commit `.env.local` to Git! It's already in `.gitignore`

## Step 8: Test the Connection

1. Restart your development server:
```bash
npm start
```

2. Open the browser and check the console for any Firebase connection errors

## Step 9: Firestore Collections Structure

Your database will automatically create these collections when first used:

### `orders` Collection
```
orders/
  └── {orderId}
      ├── orderNumber: "ORD-123456789"
      ├── customerName: "John Doe"
      ├── email: "john@example.com"
      ├── phone: "+94771234567"
      ├── address: "123 Main St, Colombo"
      ├── items: [{id, name, price, quantity, image}]
      ├── subtotal: 2900
      ├── deliveryFee: 200
      ├── total: 3100
      ├── paymentMethod: "cash" | "card"
      ├── status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
      ├── notes: "Extra spicy please"
      ├── createdAt: Timestamp
      └── updatedAt: Timestamp
```

### `reservations` Collection
```
reservations/
  └── {reservationId}
      ├── reservationNumber: "RES-123456789"
      ├── customerName: "Jane Smith"
      ├── email: "jane@example.com"
      ├── phone: "+94771234567"
      ├── date: "2026-02-15"
      ├── time: "7:00 PM"
      ├── guests: 4
      ├── occasion: "Anniversary"
      ├── specialRequests: "Window seat please"
      ├── status: "pending" | "confirmed" | "cancelled" | "completed"
      ├── createdAt: Timestamp
      └── updatedAt: Timestamp
```

## Step 10: Create Firestore Indexes (Optional but Recommended)

For better query performance, create these composite indexes:

1. Go to **"Firestore Database" > "Indexes"** tab
2. Click **"Create Index"**

**Index for Orders:**
- Collection: `orders`
- Fields:
  - `status` (Ascending)
  - `createdAt` (Descending)
- Query scope: Collection

**Index for Reservations:**
- Collection: `reservations`
- Fields:
  - `date` (Ascending)
  - `time` (Ascending)
- Query scope: Collection

## Security Best Practices

### For Production Deployment:

1. **Update Firestore Rules** to require authentication:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null && request.auth.token.admin == true;
    }
    
    match /reservations/{reservationId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

2. **Set up Firebase App Check** (prevents unauthorized access):
   - Go to **"Build" > "App Check"**
   - Register your domain
   - Enable reCAPTCHA v3

3. **Enable Email Verification** (optional):
   - Go to **"Authentication" > "Templates"**
   - Customize email templates

## Troubleshooting

### Error: "Firebase not configured"
- Check that `.env.local` exists and has correct values
- Restart development server after changing `.env.local`

### Error: "Permission denied"
- Check Firestore security rules
- Verify admin user is logged in for admin panel

### Error: "Firebase app already initialized"
- Clear browser cache
- Check that Firebase is only initialized once in `lib/firebase.ts`

## Next Steps

✅ Firebase configured successfully!

Now you can:
1. Place test orders from the website
2. Create test reservations
3. Login to admin panel at `/admin/login`
4. View and manage orders and reservations

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Getting Started](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
