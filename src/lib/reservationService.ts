import { supabase } from './supabase';
import { Reservation, ReservationStatus } from '@/types/firebase';

const RESERVATIONS_COLLECTION = 'reservations';

type ReservationRow = {
  id: string;
  reservation_number: string;
  customer_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string | null;
  special_requests: string | null;
  status: ReservationStatus;
  created_at: string;
  updated_at: string;
};

const mapReservationRowToReservation = (row: ReservationRow): Reservation => ({
  id: row.id,
  reservationNumber: row.reservation_number,
  customerName: row.customer_name,
  email: row.email,
  phone: row.phone,
  date: row.date,
  time: row.time,
  guests: row.guests,
  occasion: row.occasion ?? undefined,
  specialRequests: row.special_requests ?? undefined,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// Generate unique reservation number
export const generateReservationNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `RES-${timestamp}${random}`;
};

// Create new reservation
export const createReservation = async (
  reservationData: Omit<Reservation, 'id' | 'reservationNumber' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<string> => {
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from(RESERVATIONS_COLLECTION)
      .insert({
        reservation_number: generateReservationNumber(),
        customer_name: reservationData.customerName,
        email: reservationData.email,
        phone: reservationData.phone,
        date: reservationData.date,
        time: reservationData.time,
        guests: reservationData.guests,
        occasion: reservationData.occasion ?? null,
        special_requests: reservationData.specialRequests ?? null,
        status: 'pending',
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
    console.error('Error creating reservation:', error);
    throw new Error('Failed to create reservation');
  }
};

// Get all reservations (for admin)
export const getAllReservations = async (): Promise<Reservation[]> => {
  try {
    const { data, error } = await supabase
      .from(RESERVATIONS_COLLECTION)
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      throw error ?? new Error('No data returned');
    }

    return (data as ReservationRow[]).map(mapReservationRowToReservation);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw new Error('Failed to fetch reservations');
  }
};

// Get reservations by date
export const getReservationsByDate = async (date: string): Promise<Reservation[]> => {
  try {
    const { data, error } = await supabase
      .from(RESERVATIONS_COLLECTION)
      .select('*')
      .eq('date', date)
      .order('time', { ascending: true });

    if (error || !data) {
      throw error ?? new Error('No data returned');
    }

    return (data as ReservationRow[]).map(mapReservationRowToReservation);
  } catch (error) {
    console.error('Error fetching reservations by date:', error);
    throw new Error('Failed to fetch reservations');
  }
};

// Get reservations by status
export const getReservationsByStatus = async (status: ReservationStatus): Promise<Reservation[]> => {
  try {
    const { data, error } = await supabase
      .from(RESERVATIONS_COLLECTION)
      .select('*')
      .eq('status', status)
      .order('date', { ascending: true });

    if (error || !data) {
      throw error ?? new Error('No data returned');
    }

    return (data as ReservationRow[]).map(mapReservationRowToReservation);
  } catch (error) {
    console.error('Error fetching reservations by status:', error);
    throw new Error('Failed to fetch reservations');
  }
};

// Update reservation status
export const updateReservationStatus = async (
  reservationId: string,
  status: ReservationStatus
): Promise<void> => {
  try {
    const { error } = await supabase
      .from(RESERVATIONS_COLLECTION)
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', reservationId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error updating reservation status:', error);
    throw new Error('Failed to update reservation status');
  }
};

// Real-time listener for reservations (for admin dashboard)
export const subscribeToReservations = (callback: (reservations: Reservation[]) => void): (() => void) => {
  const fetchAndPublish = async () => {
    try {
      const reservations = await getAllReservations();
      callback(reservations);
    } catch (error) {
      console.error('Error in reservations subscription:', error);
    }
  };

  fetchAndPublish();

  const channel = supabase
    .channel('reservations-realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: RESERVATIONS_COLLECTION },
      fetchAndPublish
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Get today's reservations count
export const getTodayReservationsCount = async (): Promise<number> => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { count, error } = await supabase
      .from(RESERVATIONS_COLLECTION)
      .select('id', { count: 'exact', head: true })
      .eq('date', today);

    if (error) {
      throw error;
    }

    return count ?? 0;
  } catch (error) {
    console.error('Error fetching today\'s reservations:', error);
    return 0;
  }
};

// Get upcoming reservations (next 7 days)
export const getUpcomingReservations = async (): Promise<Reservation[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from(RESERVATIONS_COLLECTION)
      .select('*')
      .gte('date', today)
      .in('status', ['pending', 'confirmed'])
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error || !data) {
      throw error ?? new Error('No data returned');
    }

    return (data as ReservationRow[]).map(mapReservationRowToReservation);
  } catch (error) {
    console.error('Error fetching upcoming reservations:', error);
    throw new Error('Failed to fetch upcoming reservations');
  }
};
