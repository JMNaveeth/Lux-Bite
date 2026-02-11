# 🔐 Admin Dashboard Setup Guide

## Your Admin System is Already Built! 

Your Luxe Bite website has a professional admin panel at `/admin` where you can manage all orders and reservations in real-time.

---

## 📍 Access URLs

- **Admin Login**: `http://localhost:5173/admin/login`
- **Admin Dashboard**: `http://localhost:5173/admin`

---

## 🎯 How to Create Your First Admin Account

### Option 1: Using Firebase Console (Recommended)

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Select your project**: "Luxe Bite"
3. **Go to Authentication** → Click "Users" tab
4. **Click "Add user"**
   - Email: `admin@luxebite.com` (or your preferred email)
   - Password: Create a strong password
   - Click "Add user"

5. **Set Admin Role** (Important!):
   - Go to **Firestore Database**
   - Create a collection called `users`
   - Add a document with ID = the User UID from Authentication
   - Add field: `role` (string) = `admin`
   - Add field: `email` (string) = `admin@luxebite.com`

### Option 2: Programmatically (Alternative)

If you want to create admin users via code, you can use Firebase Admin SDK, but Option 1 is simpler for now.

---

## 📊 What You Can Do in Admin Dashboard

### **Orders Management** (`/admin` → Orders tab)

#### Real-Time Statistics Dashboard
- **Pending Orders**: New orders waiting for your confirmation
- **Preparing**: Orders currently being cooked
- **Ready**: Orders ready for pickup/delivery
- **Delivered**: Successfully completed orders
- **Total Revenue**: Today's earnings in Rs

#### Order Details View
Each order shows:
- 🔢 **Order Number**: Unique identifier (e.g., ORD-123456789)
- 👤 **Customer Info**: Name, phone, email
- 📍 **Delivery Address**: Full address
- 🍽️ **Items Ordered**: With images, quantities, and prices
- 💬 **Special Notes**: Customer requests or dietary needs
- 💰 **Payment Breakdown**: Subtotal + Delivery Fee = Total

#### Status Management
Update order status with one click:
```
Pending → Confirmed → Preparing → Ready → Delivered
      ↓
   Cancelled (if needed)
```

#### Filtering
- Click any status button to filter orders
- "All Orders" shows everything
- Each status filter shows count

---

### **Reservations Management** (`/admin` → Reservations tab)

View and manage table reservations:
- Customer name, email, phone
- Date, time, number of guests
- Special occasion (birthday, anniversary, etc.)
- Special requests or dietary needs
- Reservation status management

---

## 🔥 Key Features (Already Working!)

✅ **Real-time Updates**
   - Orders appear automatically when customers place them
   - No page refresh needed - uses Firebase real-time listeners

✅ **Status Updates**
   - Click any status button to update order
   - Customer receives confirmation
   - Changes appear instantly

✅ **Revenue Tracking**
   - Automatic calculation of daily revenue
   - Excludes cancelled orders
   - Shows in Rs currency

✅ **Order Filtering**
   - Filter by any status
   - See counts for each status
   - Quick overview of kitchen workflow

✅ **Responsive Design**
   - Works on desktop, tablet, and mobile
   - Sidebar navigation
   - Touch-friendly buttons

✅ **Secure Access**
   - Firebase Authentication
   - Admin role verification
   - Automatic logout functionality

---

## 📱 Mobile Admin Access

The dashboard is fully responsive:
- Tap hamburger menu (☰) on mobile to open sidebar
- View orders in card format
- Scroll horizontally for order details
- Full functionality on phone and tablet

---

## 🎨 Dashboard Features Breakdown

### Statistics Cards (Top Row)
```
┌─────────┬─────────┬─────────┬───────────┬──────────┐
│ Pending │Preparing│  Ready  │ Delivered │ Revenue  │
│    3    │    5    │    2    │    12     │ Rs 45,000│
└─────────┴─────────┴─────────┴───────────┴──────────┘
```

### Filter Buttons
```
[All Orders (22)] [Pending] [Confirmed] [Preparing] [Ready] [Delivered] [Cancelled]
```

### Order Card Layout
```
╔═══════════════════════════════════════════════════════╗
║ Order #ORD-123456789              [⏰ Pending]        ║
║ Feb 11, 2026 8:45 PM                                  ║
║─────────────────────────────────────────────────────  ║
║ Customer: John Doe                                    ║
║ Phone: +1 555-1234                                    ║
║ Address: 123 Main St, Apt 4B                          ║
║─────────────────────────────────────────────────────  ║
║ Items:                                                ║
║ 🍽️ Butter Lobster x2    Rs 3,700                     ║
║ 🍽️ Wagyu Steak x1       Rs 2,450                     ║
║─────────────────────────────────────────────────────  ║
║ Subtotal:              Rs 6,150                       ║
║ Delivery:              Rs 200                         ║
║ Total:                 Rs 6,350                       ║
║─────────────────────────────────────────────────────  ║
║ Notes: "No onions please"                             ║
║                                                       ║
║ Update Status:                                        ║
║ [Pending] [Confirmed] [Preparing]                     ║
║ [Ready] [Delivered] [Cancelled]                       ║
╚═══════════════════════════════════════════════════════╝
```

---

## 🔔 Real-World Workflow Example

### Morning Preparation
1. Login to `/admin/login`
2. Check **Pending Orders** count
3. Review each new order
4. Click **Confirmed** for orders you can fulfill

### During Service
1. As you start cooking, click **Preparing**
2. When food is ready, click **Ready**
3. After delivery/pickup, click **Delivered**
4. Monitor revenue in real-time

### Order Lifecycle
```
Customer places order
    ↓
(System) Status: Pending
    ↓
[Admin] Confirm order → Status: Confirmed
    ↓
[Admin] Start cooking → Status: Preparing
    ↓
[Admin] Food ready → Status: Ready
    ↓
[Admin] Delivered → Status: Delivered ✅
```

---

## 💡 Tips for Best Use

1. **Check orders regularly** - Orders appear in real-time
2. **Update status promptly** - Keeps customers informed
3. **Use filters** - Focus on pending/preparing orders during rush hours
4. **Check notes** - Always read special requests before preparing
5. **Monitor revenue** - Track daily earnings at a glance
6. **Mobile access** - Check orders on your phone while in kitchen

---

## 🆘 Troubleshooting

### Can't Login?
- Check email/password in Firebase Console → Authentication
- Verify admin role in Firestore → users collection
- Clear browser cache and try again

### Orders Not Appearing?
- Check Firebase Console → Firestore → `orders` collection
- Verify Firebase connection in browser console (F12)
- Ensure orderService is properly configured

### Status Not Updating?
- Check internet connection
- Verify Firebase permissions in Firestore rules
- Check browser console for errors

---

## 🚀 Next Steps (Optional Enhancements)

If you want to add more features in the future:

1. **Order Notifications**
   - Play sound when new order arrives
   - Browser push notifications
   - SMS alerts to kitchen staff

2. **Analytics Dashboard**
   - Daily/weekly/monthly revenue charts
   - Popular items tracking
   - Peak hours analysis

3. **Kitchen Display System**
   - Separate screen for kitchen staff
   - Only show Preparing/Ready status
   - Timer for each order

4. **Customer Communication**
   - Send SMS updates on status changes
   - Email confirmations
   - Estimated delivery time

5. **Print Receipts**
   - Print order tickets for kitchen
   - Customer receipts
   - End-of-day reports

---

## 📞 Admin Support

For any issues:
1. Check browser console (F12) for errors
2. Verify Firebase connection and rules
3. Review this guide's troubleshooting section

Your admin system is production-ready and follows industry best practices! 🎉

---

**Created for Luxe Bite Restaurant**  
*Professional Admin Dashboard - Powered by Firebase*
