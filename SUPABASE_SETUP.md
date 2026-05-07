# Supabase Setup Guide - Luxe Bite Database

This guide explains how to set up the required Supabase tables for storing all your data.

## Tables Required

### 1. Menu Items Table
Store all menu data in Supabase instead of hardcoded values.

```sql
-- Create menu_items table
CREATE TABLE menu_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL,
  category text NOT NULL CHECK (category IN ('appetizers', 'mains', 'desserts', 'chefs-selection')),
  moods text[] NOT NULL,
  image text NOT NULL,
  pairing text,
  dietary text[],
  featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read" ON menu_items
  FOR SELECT USING (true);

-- Create index for better query performance
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_featured ON menu_items(featured);
```

### 2. Carts Table
Manage shopping carts per session/user.

```sql
-- Create carts table
CREATE TABLE carts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  session_id text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Allow public access" ON carts
  FOR ALL USING (true);

-- Create index for session lookup
CREATE INDEX idx_carts_session_id ON carts(session_id);
```

### 3. Cart Items Table
Store items in each cart.

```sql
-- Create cart_items table
CREATE TABLE cart_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  cart_id uuid NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  menu_item_id text NOT NULL,
  name text NOT NULL,
  price integer NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  image text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  moods text[] NOT NULL,
  pairing text,
  dietary text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Allow public access" ON cart_items
  FOR ALL USING (true);

-- Create index for cart lookup
CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
```

## Migrating Menu Data to Supabase

### Option 1: Use SQL Insert (Recommended)
Copy the SQL below into the Supabase SQL Editor and run it:

```sql
-- Insert menu items
INSERT INTO menu_items (name, description, price, category, moods, image, pairing, dietary, featured) VALUES
('Vegetable Samosa', 'Crispy golden pastry filled with spiced potato, peas, and aromatic herbs, served with mint chutney', 450, 'appetizers', ARRAY['romantic', 'indulgent'], 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80', 'Ginger Lime Punch or Ceylon Black Tea', ARRAY['vegetarian'], true),
('Rice & Curry', 'A small plate of fragrant rice served with a flavorful curry of the day, perfect for sharing or as a light starter', 450, 'appetizers', ARRAY['light', 'adventurous'], 'rice&curry.jpg', 'Lime Juice or light Lager', ARRAY['gluten-free','vegetarian'], false),
('Soup', 'A warm and comforting soup made with seasonal vegetables and aromatic herbs, perfect for a light starter', 750, 'appetizers', ARRAY['indulgent', 'romantic'], 'soup.avif', 'Ceylon Tea or Ginger Beer', ARRAY['gluten-free'], false),
('Burger', 'Juicy beef patty with melted cheese, fresh lettuce, tomato, and our special sauce, served with crispy fries', 400, 'appetizers', ARRAY['romantic', 'adventurous'], 'burger.avif', 'Ceylon Tea or Passion Fruit Juice', ARRAY['gluten-free'], false),
('Lamprais', 'Traditional Dutch Burgher dish with rice, chicken curry, seeni sambol, ash plantain, brinjal moju, wrapped and slow-cooked in banana leaf', 1850, 'mains', ARRAY['indulgent', 'romantic'], 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', 'Ginger Beer or Ceylon Arrack', ARRAY['gluten-free'], true),
('Pizza', 'Wood-fired pizza with a thin, crispy crust topped with tomato sauce, mozzarella, and your choice of toppings like spicy sausage, caramelized onions, and fresh basil', 2850, 'mains', ARRAY['romantic', 'indulgent'], 'pizza.avif', 'Coconut Water or Lion Lager', ARRAY['gluten-free'], false),
('Thosai', 'Crispy fermented rice and lentil crepe served with a variety of chutneys and sambar - a South Indian classic with Sri Lankan flair', 450, 'mains', ARRAY['light', 'romantic'], 'those.avif', 'Fresh Lime Juice or Ginger Beer', ARRAY['vegetarian'], false),
('Salad', 'Fresh mixed greens with seasonal vegetables, topped with a light vinaigrette dressing', 1650, 'mains', ARRAY['adventurous', 'indulgent'], 'salad.avif', 'Arrack or Ceylon Tea', ARRAY['vegetarian'], false),
('Pol Rotti', 'Traditional Sri Lankan flatbread made with grated coconut and spices, served with spicy fish curry and a tangy sambol', 150, 'mains', ARRAY['light', 'adventurous'], 'pol rotti.jpg', 'Lime Juice or Woodapple Juice', ARRAY['gluten-free'], false),
('Brownie', 'Rich and fudgy chocolate brownie with a gooey center, topped with a scoop of vanilla ice cream', 750, 'desserts', ARRAY['indulgent', 'romantic'], 'brownie.avif', 'Woodapple Juice or Arrack', ARRAY['gluten-free'], true),
('Pancake', 'Fluffy pancakes served with maple syrup, fresh berries, and a dollop of whipped cream', 450, 'desserts', ARRAY['romantic', 'light'], 'pancake.avif', 'Ceylon Tea or Faluda', ARRAY['vegetarian', 'gluten-free'], false),
('Curd with Kithul Treacle', 'Buffalo curd topped with sweet palm jaggery syrup and cashew nuts - a traditional Sri Lankan favorite', 500, 'desserts', ARRAY['light', 'adventurous'], 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80', 'Jaggery Tea or King Coconut Water', ARRAY['vegetarian', 'gluten-free'], false),
('Sandwich', 'Gourmet sandwich with layers of marinated grilled chicken, fresh vegetables, and a zesty aioli sauce, served on artisanal bread', 450, 'chefs-selection', ARRAY['indulgent', 'adventurous'], 'sandwitch.avif', 'Beverage pairing available (+Rs 950)', NULL, true),
('Coffee', 'Rich and aromatic coffee brewed from premium Ceylon beans, served with a side of traditional Sri Lankan sweets for the perfect afternoon indulgence', 250, 'chefs-selection', ARRAY['adventurous', 'romantic'], 'cofee.avif', 'Premium Ceylon tea pairing included', NULL, false);
```

### Option 2: Manual Entry
1. Go to Supabase Dashboard → SQL Editor
2. Create the tables using the SQL above
3. Go to Table Editor → menu_items
4. Click "Insert" and manually add your menu items

## Component Changes Needed

### For Components Using Menu Items
If your components import `menuItems` directly, update them to use the new async functions:

**Before:**
```typescript
import { menuItems } from '@/lib/menuData';

export function Menu() {
  return (
    <div>
      {menuItems.map(item => (...))}
    </div>
  );
}
```

**After:**
```typescript
import { getMenuItems } from '@/lib/menuData';
import { useEffect, useState } from 'react';

export function Menu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getMenuItems().then(setItems);
  }, []);

  return (
    <div>
      {items.map(item => (...))}
    </div>
  );
}
```

### For Cart Components
Cart operations are now async. Update any components that use cart:

**Before:**
```typescript
const { addToCart } = useCart();

// Synchronous
addToCart(item, 1);
```

**After:**
```typescript
const { addToCart } = useCart();

// Async - now requires await
const handleAddToCart = async () => {
  try {
    await addToCart(item, 1);
  } catch (error) {
    console.error('Failed to add to cart', error);
  }
};
```

## Features Enabled

With these changes, your app now supports:

✅ **Real-time Updates** - Menu and cart changes sync across tabs/devices  
✅ **Persistent Storage** - Data survives page refreshes  
✅ **Admin Management** - Add/edit/delete menu items through admin dashboard  
✅ **Cart Sessions** - Each visitor gets a persistent cart session  
✅ **Scalability** - No file size limits  
✅ **Analytics** - Query cart and order data easily  

## Troubleshooting

### "Missing Supabase configuration"
- Make sure you set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your `.env.local`

### Menu items not showing
- Check that your `menu_items` table has data
- Verify RLS policies allow public read access
- Check browser console for errors

### Cart not persisting
- Ensure `VITE_SUPABASE_URL` and key are correct
- Check that `carts` and `cart_items` tables exist and have correct RLS policies

## Next Steps

1. Create the Supabase tables using the SQL scripts above
2. Update components that use menu items to handle async operations
3. Test the cart functionality by adding items
4. Set up admin dashboard to manage menu items
