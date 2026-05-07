-- =====================================================
-- LUXE BITE - Complete Supabase Database Setup
-- Run this entire script in Supabase SQL Editor
-- =====================================================


-- =====================================================
-- 1. MENU_ITEMS TABLE
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

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow authenticated users to insert menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow authenticated users to update menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow authenticated users to delete menu_items" ON menu_items;

CREATE POLICY "Allow public read on menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert menu_items" ON menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update menu_items" ON menu_items FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated users to delete menu_items" ON menu_items FOR DELETE USING (true);

CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_featured ON menu_items(featured);
CREATE INDEX IF NOT EXISTS idx_menu_items_created_at ON menu_items(created_at DESC);


-- =====================================================
-- 2. RESERVATIONS TABLE
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

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on reservations" ON reservations;
DROP POLICY IF EXISTS "Allow public insert on reservations" ON reservations;
DROP POLICY IF EXISTS "Allow public update on reservations" ON reservations;
DROP POLICY IF EXISTS "Allow public delete on reservations" ON reservations;

CREATE POLICY "Allow public read on reservations" ON reservations FOR SELECT USING (true);
CREATE POLICY "Allow public insert on reservations" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on reservations" ON reservations FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on reservations" ON reservations FOR DELETE USING (true);

CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reservations_reservation_number ON reservations(reservation_number);


-- =====================================================
-- 3. CARTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS carts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  session_id text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on carts" ON carts;
DROP POLICY IF EXISTS "Allow public insert on carts" ON carts;
DROP POLICY IF EXISTS "Allow public update on carts" ON carts;
DROP POLICY IF EXISTS "Allow public delete on carts" ON carts;

CREATE POLICY "Allow public read on carts" ON carts FOR SELECT USING (true);
CREATE POLICY "Allow public insert on carts" ON carts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on carts" ON carts FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on carts" ON carts FOR DELETE USING (true);

CREATE INDEX IF NOT EXISTS idx_carts_session_id ON carts(session_id);
CREATE INDEX IF NOT EXISTS idx_carts_created_at ON carts(created_at DESC);


-- =====================================================
-- 4. CART_ITEMS TABLE
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

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX IF NOT EXISTS idx_cart_items_cart_menu_unique ON cart_items(cart_id, menu_item_id);

DROP POLICY IF EXISTS "Allow public read on cart_items" ON cart_items;
DROP POLICY IF EXISTS "Allow public insert on cart_items" ON cart_items;
DROP POLICY IF EXISTS "Allow public update on cart_items" ON cart_items;
DROP POLICY IF EXISTS "Allow public delete on cart_items" ON cart_items;

CREATE POLICY "Allow public read on cart_items" ON cart_items FOR SELECT USING (true);
CREATE POLICY "Allow public insert on cart_items" ON cart_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on cart_items" ON cart_items FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on cart_items" ON cart_items FOR DELETE USING (true);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_created_at ON cart_items(created_at DESC);


-- =====================================================
-- 5. ORDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  items jsonb NOT NULL,
  subtotal numeric NOT NULL,
  delivery_fee numeric NOT NULL,
  total numeric NOT NULL,
  payment_method text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on orders" ON orders;
DROP POLICY IF EXISTS "Allow public insert on orders" ON orders;
DROP POLICY IF EXISTS "Allow public update on orders" ON orders;
DROP POLICY IF EXISTS "Allow public delete on orders" ON orders;

CREATE POLICY "Allow public read on orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert on orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on orders" ON orders FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on orders" ON orders FOR DELETE USING (true);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);


-- =====================================================
-- 6. SEED MENU DATA
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
-- 7. VERIFY ALL TABLES
-- =====================================================
SELECT 'menu_items'   AS table_name, COUNT(*) AS rows FROM menu_items
UNION ALL
SELECT 'reservations' AS table_name, COUNT(*) AS rows FROM reservations
UNION ALL
SELECT 'carts'        AS table_name, COUNT(*) AS rows FROM carts
UNION ALL
SELECT 'cart_items'   AS table_name, COUNT(*) AS rows FROM cart_items
UNION ALL
SELECT 'orders'       AS table_name, COUNT(*) AS rows FROM orders;