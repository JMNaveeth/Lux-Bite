import { supabase } from './supabase';
import { CartItem } from '@/contexts/CartContext';

const CARTS_COLLECTION = 'carts';
const CART_ITEMS_COLLECTION = 'cart_items';

export interface CartRow {
  id: string;
  user_id: string | null;
  session_id: string;
  created_at: string;
  updated_at: string;
}

export interface CartItemRow {
  id: string;
  cart_id: string;
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  description: string;
  moods: string[];
  pairing?: string;
  dietary?: string[];
  created_at: string;
  updated_at: string;
}

// Generate or get session ID (stored in localStorage)
const getSessionId = (): string => {
  let sessionId = localStorage.getItem('luxe_bite_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('luxe_bite_session_id', sessionId);
  }
  return sessionId;
};

// Get or create cart for session
export const getOrCreateCart = async (): Promise<string> => {
  try {
    const sessionId = getSessionId();

    // Check if cart exists for this session
    const { data: existingCart, error: fetchError } = await supabase
      .from(CARTS_COLLECTION)
      .select('id')
      .eq('session_id', sessionId)
      .single();

    if (existingCart) {
      return existingCart.id;
    }

    // Create new cart if it doesn't exist
    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    const now = new Date().toISOString();
    const { data: newCart, error: createError } = await supabase
      .from(CARTS_COLLECTION)
      .insert({
        session_id: sessionId,
        user_id: null,
        created_at: now,
        updated_at: now,
      })
      .select('id')
      .single();

    if (createError || !newCart) {
      throw createError ?? new Error('Failed to create cart');
    }

    return newCart.id;
  } catch (error) {
    console.error('Error getting/creating cart:', error);
    throw new Error('Failed to get or create cart');
  }
};

// Get cart items
export const getCartItems = async (cartId: string): Promise<CartItem[]> => {
  try {
    const { data, error } = await supabase
      .from(CART_ITEMS_COLLECTION)
      .select('*')
      .eq('cart_id', cartId)
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    return (data as CartItemRow[]).map((row) => ({
      id: row.menu_item_id,
      name: row.name,
      description: row.description,
      price: row.price,
      category: row.category as any,
      moods: row.moods as any,
      image: row.image,
      pairing: row.pairing,
      dietary: row.dietary,
      quantity: row.quantity,
      featured: false,
    }));
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw new Error('Failed to fetch cart items');
  }
};

// Add item to cart
export const addCartItem = async (
  cartId: string,
  item: CartItem
): Promise<void> => {
  try {
    const now = new Date().toISOString();

    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from(CART_ITEMS_COLLECTION)
      .select('id, quantity')
      .eq('cart_id', cartId)
      .eq('menu_item_id', item.id)
      .single();

    if (existingItem) {
      // Update quantity
      await supabase
        .from(CART_ITEMS_COLLECTION)
        .update({
          quantity: existingItem.quantity + item.quantity,
          updated_at: now,
        })
        .eq('id', existingItem.id);
    } else {
      // Insert new item
      await supabase.from(CART_ITEMS_COLLECTION).insert({
        cart_id: cartId,
        menu_item_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category,
        description: item.description,
        moods: item.moods,
        pairing: item.pairing,
        dietary: item.dietary,
        created_at: now,
        updated_at: now,
      });
    }

    // Update cart timestamp
    await supabase
      .from(CARTS_COLLECTION)
      .update({ updated_at: now })
      .eq('id', cartId);
  } catch (error) {
    console.error('Error adding cart item:', error);
    throw new Error('Failed to add item to cart');
  }
};

// Remove item from cart
export const removeCartItem = async (cartId: string, itemId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from(CART_ITEMS_COLLECTION)
      .delete()
      .eq('cart_id', cartId)
      .eq('menu_item_id', itemId);

    if (error) {
      throw error;
    }

    // Update cart timestamp
    await supabase
      .from(CARTS_COLLECTION)
      .update({ updated_at: new Date().toISOString() })
      .eq('id', cartId);
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw new Error('Failed to remove item from cart');
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (
  cartId: string,
  itemId: string,
  quantity: number
): Promise<void> => {
  try {
    if (quantity <= 0) {
      await removeCartItem(cartId, itemId);
      return;
    }

    const { error } = await supabase
      .from(CART_ITEMS_COLLECTION)
      .update({
        quantity,
        updated_at: new Date().toISOString(),
      })
      .eq('cart_id', cartId)
      .eq('menu_item_id', itemId);

    if (error) {
      throw error;
    }

    // Update cart timestamp
    await supabase
      .from(CARTS_COLLECTION)
      .update({ updated_at: new Date().toISOString() })
      .eq('id', cartId);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw new Error('Failed to update cart item quantity');
  }
};

// Clear cart
export const clearCart = async (cartId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from(CART_ITEMS_COLLECTION)
      .delete()
      .eq('cart_id', cartId);

    if (error) {
      throw error;
    }

    // Update cart timestamp
    await supabase
      .from(CARTS_COLLECTION)
      .update({ updated_at: new Date().toISOString() })
      .eq('id', cartId);
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw new Error('Failed to clear cart');
  }
};

// Subscribe to cart items changes (real-time)
export const subscribeToCartItems = (
  cartId: string,
  callback: (items: CartItem[]) => void
): (() => void) => {
  const fetchAndPublish = async () => {
    try {
      const items = await getCartItems(cartId);
      callback(items);
    } catch (error) {
      console.error('Error in cart subscription:', error);
    }
  };

  fetchAndPublish();

  const channel = supabase
    .channel(`cart-${cartId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: CART_ITEMS_COLLECTION, filter: `cart_id=eq.${cartId}` },
      fetchAndPublish
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
