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
  const cartIdPromiseRef = React.useRef<Promise<string> | null>(null);
  const unsubscribeRef = React.useRef<(() => void) | null>(null);

  const ensureCartId = async (): Promise<string> => {
    if (cartId) {
      return cartId;
    }

    if (!cartIdPromiseRef.current) {
      cartIdPromiseRef.current = getOrCreateCart().then((id) => {
        setCartId(id);
        return id;
      });
    }

    return cartIdPromiseRef.current;
  };

  // Initialize cart on component mount
  useEffect(() => {
    const initializeCart = async () => {
      try {
        setIsLoading(true);
        const id = await getOrCreateCart();
        setCartId(id);
        cartIdPromiseRef.current = Promise.resolve(id);

        // Load initial cart items
        const items = await getCartItems(id);
        setCartItems(items);

        // Subscribe to real-time updates
        unsubscribeRef.current?.();
        unsubscribeRef.current = subscribeToCartItems(id, (updatedItems) => {
          setCartItems(updatedItems);
        });
      } catch (error) {
        console.error('Error initializing cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCart();

    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, []);

  const addToCart = async (item: MenuItem, quantity: number = 1) => {
    try {
      const resolvedCartId = await ensureCartId();
      const cartItem: CartItem = {
        ...item,
        quantity,
      };
      await addCartItem(resolvedCartId, cartItem);
      const updatedItems = await getCartItems(resolvedCartId);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const resolvedCartId = await ensureCartId();
      await removeCartItem(resolvedCartId, itemId);
      const updatedItems = await getCartItems(resolvedCartId);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const resolvedCartId = await ensureCartId();
      await updateCartItemQuantity(resolvedCartId, itemId, quantity);
      const updatedItems = await getCartItems(resolvedCartId);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const resolvedCartId = await ensureCartId();
      await clearCartDB(resolvedCartId);
      setCartItems([]);
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
