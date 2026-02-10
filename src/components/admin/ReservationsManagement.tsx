import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Calendar, Users, Phone, Mail } from 'lucide-react';
import { Reservation, ReservationStatus } from '@/types/firebase';
import { subscribeToReservations, updateReservationStatus } from '@/lib/reservationService';
import { useToast } from '@/hooks/use-toast';

const statusConfig = {
  pending: { label: 'Pending', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'text-green-500', bgColor: 'bg-green-500/10', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-500', bgColor: 'bg-red-500/10', icon: XCircle },
  completed: { label: 'Completed', color: 'text-blue-500', bgColor: 'bg-blue-500/10', icon: CheckCircle },
};

export const ReservationsManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<ReservationStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = subscribeToReservations((newReservations) => {
      setReservations(newReservations);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (reservationId: string, newStatus: ReservationStatus) => {
    try {
      await updateReservationStatus(reservationId, newStatus);
      toast({
        title: 'Status updated',
        description: `Reservation status changed to ${statusConfig[newStatus].label}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update reservation status',
        variant: 'destructive',
      });
    }
  };

  const filteredReservations = filter === 'all' 
    ? reservations 
    : reservations.filter(res => res.status === filter);

  const getStatusStats = () => {
    const today = new Date().toISOString().split('T')[0];
    return {
      pending: reservations.filter(r => r.status === 'pending').length,
      confirmed: reservations.filter(r => r.status === 'confirmed').length,
      today: reservations.filter(r => r.date === today && r.status !== 'cancelled').length,
      total: reservations.filter(r => r.status !== 'cancelled').length,
    };
  };

  const stats = getStatusStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          className="bg-card rounded-lg border border-border/50 p-4"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Clock className="text-yellow-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-card rounded-lg border border-border/50 p-4"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Confirmed</p>
              <p className="text-2xl font-bold text-foreground">{stats.confirmed}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-card rounded-lg border border-border/50 p-4"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Calendar className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-2xl font-bold text-foreground">{stats.today}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-card rounded-lg border border-border/50 p-4"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Active</p>
              <p className="text-2xl font-bold text-primary">{stats.total}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'all'
              ? 'bg-primary text-black'
              : 'bg-card text-muted-foreground border border-border/50 hover:border-primary/50'
          }`}
        >
          All Reservations ({reservations.length})
        </button>
        {Object.entries(statusConfig).map(([status, config]) => (
          <button
            key={status}
            onClick={() => setFilter(status as ReservationStatus)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === status
                ? `${config.bgColor} ${config.color}`
                : 'bg-card text-muted-foreground border border-border/50 hover:border-primary/50'
            }`}
          >
            {config.label}
          </button>
        ))}
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border/50">
            <p className="text-muted-foreground">No reservations found</p>
          </div>
        ) : (
          filteredReservations.map((reservation) => {
            const StatusIcon = statusConfig[reservation.status].icon;
            return (
              <motion.div
                key={reservation.id}
                className="bg-card rounded-lg border border-border/50 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
                  {/* Reservation Details */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">
                          Reservation #{reservation.reservationNumber}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {reservation.createdAt?.toDate().toLocaleString()}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig[reservation.status].bgColor}`}>
                        <StatusIcon size={16} className={statusConfig[reservation.status].color} />
                        <span className={`text-sm font-medium ${statusConfig[reservation.status].color}`}>
                          {statusConfig[reservation.status].label}
                        </span>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Users size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Customer:</span>
                          <span className="font-medium text-foreground">{reservation.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={16} className="text-muted-foreground" />
                          <span className="font-medium text-foreground">{reservation.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={16} className="text-muted-foreground" />
                          <span className="font-medium text-foreground">{reservation.email}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-medium text-foreground">{reservation.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Time:</span>
                          <span className="font-medium text-foreground">{reservation.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Guests:</span>
                          <span className="font-medium text-foreground">{reservation.guests} people</span>
                        </div>
                      </div>
                    </div>

                    {reservation.occasion && (
                      <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Occasion:</p>
                        <p className="text-sm font-medium text-foreground">{reservation.occasion}</p>
                      </div>
                    )}

                    {reservation.specialRequests && (
                      <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Special Requests:</p>
                        <p className="text-sm text-foreground">{reservation.specialRequests}</p>
                      </div>
                    )}
                  </div>

                  {/* Status Actions */}
                  <div className="flex flex-col gap-2 min-w-[200px]">
                    <p className="text-sm font-medium text-foreground mb-2">Update Status:</p>
                    {(['pending', 'confirmed', 'completed', 'cancelled'] as ReservationStatus[]).map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => reservation.id && handleStatusChange(reservation.id, status)}
                          disabled={reservation.status === status}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            reservation.status === status
                              ? `${statusConfig[status].bgColor} ${statusConfig[status].color} cursor-not-allowed`
                              : 'bg-background text-foreground border border-border/50 hover:border-primary/50 hover:bg-primary/5'
                          }`}
                        >
                          {statusConfig[status].label}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
