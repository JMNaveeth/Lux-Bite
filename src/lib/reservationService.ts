import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  onSnapshot,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';
import { Reservation, ReservationStatus } from '@/types/firebase';

const RESERVATIONS_COLLECTION = 'reservations';

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
    const reservation: Omit<Reservation, 'id'> = {
      ...reservationData,
      reservationNumber: generateReservationNumber(),
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, RESERVATIONS_COLLECTION), reservation);
    return docRef.id;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw new Error('Failed to create reservation');
  }
};

// Get all reservations (for admin)
export const getAllReservations = async (): Promise<Reservation[]> => {
  try {
    const q = query(
      collection(db, RESERVATIONS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Reservation));
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw new Error('Failed to fetch reservations');
  }
};

// Get reservations by date
export const getReservationsByDate = async (date: string): Promise<Reservation[]> => {
  try {
    const q = query(
      collection(db, RESERVATIONS_COLLECTION),
      where('date', '==', date),
      orderBy('time', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Reservation));
  } catch (error) {
    console.error('Error fetching reservations by date:', error);
    throw new Error('Failed to fetch reservations');
  }
};

// Get reservations by status
export const getReservationsByStatus = async (status: ReservationStatus): Promise<Reservation[]> => {
  try {
    const q = query(
      collection(db, RESERVATIONS_COLLECTION),
      where('status', '==', status),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Reservation));
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
    const reservationRef = doc(db, RESERVATIONS_COLLECTION, reservationId);
    await updateDoc(reservationRef, {
      status,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating reservation status:', error);
    throw new Error('Failed to update reservation status');
  }
};

// Real-time listener for reservations (for admin dashboard)
export const subscribeToReservations = (callback: (reservations: Reservation[]) => void): (() => void) => {
  const q = query(
    collection(db, RESERVATIONS_COLLECTION),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const reservations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Reservation));
      callback(reservations);
    },
    (error) => {
      console.error('Error in reservations subscription:', error);
    }
  );

  return unsubscribe;
};

// Get today's reservations count
export const getTodayReservationsCount = async (): Promise<number> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const q = query(
      collection(db, RESERVATIONS_COLLECTION),
      where('date', '==', today)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error fetching today\'s reservations:', error);
    return 0;
  }
};

// Get upcoming reservations (next 7 days)
export const getUpcomingReservations = async (): Promise<Reservation[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const q = query(
      collection(db, RESERVATIONS_COLLECTION),
      where('date', '>=', today),
      where('status', 'in', ['pending', 'confirmed']),
      orderBy('date', 'asc'),
      orderBy('time', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Reservation));
  } catch (error) {
    console.error('Error fetching upcoming reservations:', error);
    throw new Error('Failed to fetch upcoming reservations');
  }
};
