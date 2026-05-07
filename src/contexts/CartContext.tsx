import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '@/lib/menuData';
import {
  getOrCreateCart,
  getCartItems,
  addCartItem,
  removeCartItem,
  updateCartItemQuantity,
  clearCart as clearCartDB,
  subscribeToCartItems,
} from '@/lib/cartService';

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize cart on component mount
  useEffect(() => {
    const initializeCart = async () => {
      try {
        setIsLoading(true);
        const id = await getOrCreateCart();
        setCartId(id);

        // Load initial cart items
        const items = await getCartItems(id);
        setCartItems(items);

        // Subscribe to real-time updates
        const unsubscribe = subscribeToCartItems(id, (updatedItems) => {
          setCartItems(updatedItems);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error initializing cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const cleanup = initializeCart().then((fn) => fn);

    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, []);

  const addToCart = async (item: MenuItem, quantity: number = 1) => {
    if (!cartId) return;

    try {
      const cartItem: CartItem = {
        ...item,
        quantity,
      };
      await addCartItem(cartId, cartItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!cartId) return;

    try {
      await removeCartItem(cartId, itemId);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!cartId) return;

    try {
      await updateCartItemQuantity(cartId, itemId, quantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!cartId) return;

    try {
      await clearCartDB(cartId);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
