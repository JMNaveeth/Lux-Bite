export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cash' | 'card';
export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id?: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id?: string;
  reservationNumber: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  createdAt: string;
}
