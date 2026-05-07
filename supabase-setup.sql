-- =====================================================
-- LUXE BITE - Supabase Database Setup
-- =====================================================
-- Run this entire script in Supabase SQL Editor to create all tables
-- and set up Row Level Security policies

-- =====================================================
-- 1. CREATE MENU_ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS menu_items (
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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read on menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow authenticated users to insert menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow authenticated users to update menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow authenticated users to delete menu_items" ON menu_items;

-- Create policy for public read access
CREATE POLICY "Allow public read on menu_items" ON menu_items
  FOR SELECT USING (true);

-- Create policy for admin write access (authenticated users with appropriate role)
CREATE POLICY "Allow authenticated users to insert menu_items" ON menu_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update menu_items" ON menu_items
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated users to delete menu_items" ON menu_items
  FOR DELETE USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_featured ON menu_items(featured);
CREATE INDEX IF NOT EXISTS idx_menu_items_created_at ON menu_items(created_at DESC);

-- =====================================================
-- 2. CREATE RESERVATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS reservations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  reservation_number text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date text NOT NULL,
  time text NOT NULL,
  guests integer NOT NULL,
  occasion text,
  special_requests text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow public access on reservations" ON reservations;

-- Create policy for public access
CREATE POLICY "Allow public access on reservations" ON reservations
  FOR ALL USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reservations_reservation_number ON reservations(reservation_number);

-- =====================================================
-- 3. CREATE CARTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS carts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  session_id text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow public access on carts" ON carts;

-- Create policy for public access
CREATE POLICY "Allow public access on carts" ON carts
  FOR ALL USING (true);

-- Create index for session lookup
CREATE INDEX IF NOT EXISTS idx_carts_session_id ON carts(session_id);
CREATE INDEX IF NOT EXISTS idx_carts_created_at ON carts(created_at DESC);

-- =====================================================
-- 4. CREATE CART_ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS cart_items (
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

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow public access on cart_items" ON cart_items;

-- Create policy for public access
CREATE POLICY "Allow public access on cart_items" ON cart_items
  FOR ALL USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_created_at ON cart_items(created_at DESC);

-- =====================================================
-- 5. INSERT MENU DATA
-- =====================================================
-- Appetizers
INSERT INTO menu_items (name, description, price, category, moods, image, pairing, dietary, featured) VALUES
('Vegetable Samosa', 'Crispy golden pastry filled with spiced potato, peas, and aromatic herbs, served with mint chutney', 450, 'appetizers', ARRAY['romantic', 'indulgent'], 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80', 'Ginger Lime Punch or Ceylon Black Tea', ARRAY['vegetarian'], true),
('Rice & Curry', 'A small plate of fragrant rice served with a flavorful curry of the day, perfect for sharing or as a light starter', 450, 'appetizers', ARRAY['light', 'adventurous'], 'rice&curry.jpg', 'Lime Juice or light Lager', ARRAY['gluten-free','vegetarian'], false),
('Soup', 'A warm and comforting soup made with seasonal vegetables and aromatic herbs, perfect for a light starter', 750, 'appetizers', ARRAY['indulgent', 'romantic'], 'soup.avif', 'Ceylon Tea or Ginger Beer', ARRAY['gluten-free'], false),
('Burger', 'Juicy beef patty with melted cheese, fresh lettuce, tomato, and our special sauce, served with crispy fries', 400, 'appetizers', ARRAY['romantic', 'adventurous'], 'burger.avif', 'Ceylon Tea or Passion Fruit Juice', ARRAY['gluten-free'], false)
ON CONFLICT DO NOTHING;

-- Mains
INSERT INTO menu_items (name, description, price, category, moods, image, pairing, dietary, featured) VALUES
('Lamprais', 'Traditional Dutch Burgher dish with rice, chicken curry, seeni sambol, ash plantain, brinjal moju, wrapped and slow-cooked in banana leaf', 1850, 'mains', ARRAY['indulgent', 'romantic'], 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', 'Ginger Beer or Ceylon Arrack', ARRAY['gluten-free'], true),
('Pizza', 'Wood-fired pizza with a thin, crispy crust topped with tomato sauce, mozzarella, and your choice of toppings like spicy sausage, caramelized onions, and fresh basil', 2850, 'mains', ARRAY['romantic', 'indulgent'], 'pizza.avif', 'Coconut Water or Lion Lager', ARRAY['gluten-free'], false),
('Thosai', 'Crispy fermented rice and lentil crepe served with a variety of chutneys and sambar - a South Indian classic with Sri Lankan flair', 450, 'mains', ARRAY['light', 'romantic'], 'those.avif', 'Fresh Lime Juice or Ginger Beer', ARRAY['vegetarian'], false),
('Salad', 'Fresh mixed greens with seasonal vegetables, topped with a light vinaigrette dressing', 1650, 'mains', ARRAY['adventurous', 'indulgent'], 'salad.avif', 'Arrack or Ceylon Tea', ARRAY['vegetarian'], false),
('Pol Rotti', 'Traditional Sri Lankan flatbread made with grated coconut and spices, served with spicy fish curry and a tangy sambol', 150, 'mains', ARRAY['light', 'adventurous'], 'pol rotti.jpg', 'Lime Juice or Woodapple Juice', ARRAY['gluten-free'], false)
ON CONFLICT DO NOTHING;

-- Desserts
INSERT INTO menu_items (name, description, price, category, moods, image, pairing, dietary, featured) VALUES
('Brownie', 'Rich and fudgy chocolate brownie with a gooey center, topped with a scoop of vanilla ice cream', 750, 'desserts', ARRAY['indulgent', 'romantic'], 'brownie.avif', 'Woodapple Juice or Arrack', ARRAY['gluten-free'], true),
('Pancake', 'Fluffy pancakes served with maple syrup, fresh berries, and a dollop of whipped cream', 450, 'desserts', ARRAY['romantic', 'light'], 'pancake.avif', 'Ceylon Tea or Faluda', ARRAY['vegetarian', 'gluten-free'], false),
('Curd with Kithul Treacle', 'Buffalo curd topped with sweet palm jaggery syrup and cashew nuts - a traditional Sri Lankan favorite', 500, 'desserts', ARRAY['light', 'adventurous'], 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80', 'Jaggery Tea or King Coconut Water', ARRAY['vegetarian', 'gluten-free'], false)
ON CONFLICT DO NOTHING;

-- Chef's Selection
INSERT INTO menu_items (name, description, price, category, moods, image, pairing, dietary, featured) VALUES
('Sandwich', 'Gourmet sandwich with layers of marinated grilled chicken, fresh vegetables, and a zesty aioli sauce, served on artisanal bread', 450, 'chefs-selection', ARRAY['indulgent', 'adventurous'], 'sandwitch.avif', 'Beverage pairing available (+Rs 950)', NULL, true),
('Coffee', 'Rich and aromatic coffee brewed from premium Ceylon beans, served with a side of traditional Sri Lankan sweets for the perfect afternoon indulgence', 250, 'chefs-selection', ARRAY['adventurous', 'romantic'], 'cofee.avif', 'Premium Ceylon tea pairing included', NULL, false)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 6. VERIFY TABLES WERE CREATED
-- =====================================================
-- Uncomment the queries below to verify tables exist:
-- SELECT COUNT(*) as menu_items_count FROM menu_items;
-- SELECT COUNT(*) as reservations_count FROM reservations;
-- SELECT COUNT(*) as carts_count FROM carts;
-- SELECT COUNT(*) as cart_items_count FROM cart_items;
