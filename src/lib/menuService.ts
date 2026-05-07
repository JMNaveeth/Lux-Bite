import { supabase } from './supabase';
import { MenuItem } from './menuData';

const MENU_COLLECTION = 'menu_items';

export interface MenuItemRow {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizers' | 'mains' | 'desserts' | 'chefs-selection';
  moods: ('romantic' | 'indulgent' | 'light' | 'adventurous')[];
  image: string;
  pairing?: string;
  dietary?: string[];
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

const mapMenuRowToMenuItem = (row: MenuItemRow): MenuItem => ({
  id: row.id,
  name: row.name,
  description: row.description,
  price: row.price,
  category: row.category,
  moods: row.moods,
  image: row.image,
  pairing: row.pairing,
  dietary: row.dietary,
  featured: row.featured ?? false,
});

// Get all menu items
export const getAllMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const { data, error } = await supabase
      .from(MENU_COLLECTION)
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }

    return (data as MenuItemRow[]).map(mapMenuRowToMenuItem);
  } catch (error) {
    console.error('Error in getAllMenuItems:', error);
    throw new Error('Failed to fetch menu items');
  }
};

// Get featured menu items
export const getFeaturedMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const { data, error } = await supabase
      .from(MENU_COLLECTION)
      .select('*')
      .eq('featured', true)
      .order('category', { ascending: true });

    if (error) {
      console.error('Error fetching featured items:', error);
      throw error;
    }

    return (data as MenuItemRow[]).map(mapMenuRowToMenuItem);
  } catch (error) {
    console.error('Error in getFeaturedMenuItems:', error);
    throw new Error('Failed to fetch featured items');
  }
};

// Get menu items by category
export const getMenuItemsByCategory = async (category: string): Promise<MenuItem[]> => {
  try {
    if (category === 'all') {
      return await getAllMenuItems();
    }

    const { data, error } = await supabase
      .from(MENU_COLLECTION)
      .select('*')
      .eq('category', category)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching items by category:', error);
      throw error;
    }

    return (data as MenuItemRow[]).map(mapMenuRowToMenuItem);
  } catch (error) {
    console.error('Error in getMenuItemsByCategory:', error);
    throw new Error('Failed to fetch menu items by category');
  }
};

// Get menu item by ID
export const getMenuItemById = async (itemId: string): Promise<MenuItem | null> => {
  try {
    const { data, error } = await supabase
      .from(MENU_COLLECTION)
      .select('*')
      .eq('id', itemId)
      .single();

    if (error) {
      console.error('Error fetching menu item:', error);
      return null;
    }

    return mapMenuRowToMenuItem(data as MenuItemRow);
  } catch (error) {
    console.error('Error in getMenuItemById:', error);
    return null;
  }
};

// Add menu item (admin)
export const addMenuItem = async (menuItem: Omit<MenuItem, 'id'>): Promise<string> => {
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from(MENU_COLLECTION)
      .insert({
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        category: menuItem.category,
        moods: menuItem.moods,
        image: menuItem.image,
        pairing: menuItem.pairing,
        dietary: menuItem.dietary,
        featured: menuItem.featured ?? false,
        created_at: now,
        updated_at: now,
      })
      .select('id')
      .single();

    if (error || !data) {
      throw error ?? new Error('Insert failed');
    }

    return data.id;
  } catch (error) {
    console.error('Error adding menu item:', error);
    throw new Error('Failed to add menu item');
  }
};

// Update menu item (admin)
export const updateMenuItem = async (itemId: string, updates: Partial<MenuItem>): Promise<void> => {
  try {
    const { error } = await supabase
      .from(MENU_COLLECTION)
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', itemId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw new Error('Failed to update menu item');
  }
};

// Delete menu item (admin)
export const deleteMenuItem = async (itemId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from(MENU_COLLECTION)
      .delete()
      .eq('id', itemId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw new Error('Failed to delete menu item');
  }
};

// Real-time listener for menu items
export const subscribeToMenuItems = (callback: (items: MenuItem[]) => void): (() => void) => {
  const fetchAndPublish = async () => {
    try {
      const items = await getAllMenuItems();
      callback(items);
    } catch (error) {
      console.error('Error in menu subscription:', error);
    }
  };

  fetchAndPublish();

  const channel = supabase
    .channel('menu-realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: MENU_COLLECTION },
      fetchAndPublish
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
