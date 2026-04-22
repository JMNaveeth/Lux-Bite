import { supabase } from './supabase';
import { Order, OrderStatus } from '@/types/firebase';

const ORDERS_COLLECTION = 'orders';

type OrderRow = {
  id: string;
  order_number: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  items: Order['items'];
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: Order['paymentMethod'];
  status: OrderStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

const mapOrderRowToOrder = (row: OrderRow): Order => ({
  id: row.id,
  orderNumber: row.order_number,
  customerName: row.customer_name,
  email: row.email,
  phone: row.phone,
  address: row.address,
  items: row.items,
  subtotal: row.subtotal,
  deliveryFee: row.delivery_fee,
  total: row.total,
  paymentMethod: row.payment_method,
  status: row.status,
  notes: row.notes ?? undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// Generate unique order number
export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}${random}`;
};

// Create new order
export const createOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'status'>): Promise<string> => {
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from(ORDERS_COLLECTION)
      .insert({
        order_number: generateOrderNumber(),
        customer_name: orderData.customerName,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        items: orderData.items,
        subtotal: orderData.subtotal,
        delivery_fee: orderData.deliveryFee,
        total: orderData.total,
        payment_method: orderData.paymentMethod,
        status: 'pending',
        notes: orderData.notes ?? null,
        created_at: now,
        updated_at: now,
      })
      .select('id')
      .single();

    if (error || !data) {
      throw error ?? new Error('Insert returned no data');
    }

    return data.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

// Get all orders (for admin)
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from(ORDERS_COLLECTION)
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      throw error ?? new Error('No data returned');
    }

    return (data as OrderRow[]).map(mapOrderRowToOrder);
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};

// Get orders by status
export const getOrdersByStatus = async (status: OrderStatus): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from(ORDERS_COLLECTION)
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error || !data) {
      throw error ?? new Error('No data returned');
    }

    return (data as OrderRow[]).map(mapOrderRowToOrder);
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    throw new Error('Failed to fetch orders');
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
  try {
    const { error } = await supabase
      .from(ORDERS_COLLECTION)
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }
};

// Real-time listener for orders (for admin dashboard)
export const subscribeToOrders = (callback: (orders: Order[]) => void): (() => void) => {
  const fetchAndPublish = async () => {
    try {
      const orders = await getAllOrders();
      callback(orders);
    } catch (error) {
      console.error('Error in orders subscription:', error);
    }
  };

  fetchAndPublish();

  const channel = supabase
    .channel('orders-realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: ORDERS_COLLECTION },
      fetchAndPublish
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Get today's orders count
export const getTodayOrdersCount = async (): Promise<number> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count, error } = await supabase
      .from(ORDERS_COLLECTION)
      .select('id', { count: 'exact', head: true })
      .gte('created_at', today.toISOString());

    if (error) {
      throw error;
    }

    return count ?? 0;
  } catch (error) {
    console.error('Error fetching today\'s orders:', error);
    return 0;
  }
};

// Get today's revenue
export const getTodayRevenue = async (): Promise<number> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from(ORDERS_COLLECTION)
      .select('total')
      .gte('created_at', today.toISOString())
      .neq('status', 'cancelled');

    if (error || !data) {
      throw error ?? new Error('No data returned');
    }

    return data.reduce((sum, order) => sum + Number(order.total ?? 0), 0);
  } catch (error) {
    console.error('Error fetching today\'s revenue:', error);
    return 0;
  }
};
