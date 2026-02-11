import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Calendar, Users, Phone, Mail, User, Hash, CalendarDays, PartyPopper, MessageSquare, Sparkles } from 'lucide-react';
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
      {/* Stats Cards - Enhanced */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          className="bg-gradient-to-br from-yellow-500/10 to-transparent rounded-xl border-2 border-yellow-500/30 p-5 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-yellow-600 dark:text-yellow-400 font-semibold mb-2">Pending</p>
              <p className="text-4xl font-bold text-foreground">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Clock className="text-yellow-600 dark:text-yellow-400" size={28} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-500/10 to-transparent rounded-xl border-2 border-green-500/30 p-5 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-green-600 dark:text-green-400 font-semibold mb-2">Confirmed</p>
              <p className="text-4xl font-bold text-foreground">{stats.confirmed}</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <CheckCircle className="text-green-600 dark:text-green-400" size={28} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl border-2 border-blue-500/30 p-5 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold mb-2">Today</p>
              <p className="text-4xl font-bold text-foreground">{stats.today}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Calendar className="text-blue-600 dark:text-blue-400" size={28} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-primary/10 to-transparent rounded-xl border-2 border-primary/30 p-5 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Total Active</p>
              <p className="text-4xl font-bold text-primary">{stats.total}</p>
            </div>
            <div className="p-3 bg-primary/20 rounded-xl">
              <Users className="text-primary" size={28} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters - Enhanced */}
      <div className="flex flex-wrap gap-2">
        <motion.button
          onClick={() => setFilter('all')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={`px-5 py-2.5 rounded-lg font-bold transition-all shadow-md ${
            filter === 'all'
              ? 'bg-primary text-black border-2 border-primary shadow-primary/30'
              : 'bg-card text-muted-foreground border-2 border-border/50 hover:border-primary/50 hover:text-foreground'
          }`}
        >
          All Reservations ({reservations.length})
        </motion.button>
        {Object.entries(statusConfig).map(([status, config]) => {
          const FilterIcon = config.icon;
          return (
            <motion.button
              key={status}
              onClick={() => setFilter(status as ReservationStatus)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2.5 rounded-lg font-bold transition-all shadow-md flex items-center gap-2 ${
                filter === status
                  ? `${config.bgColor} ${config.color} border-2 border-current/40`
                  : 'bg-card text-muted-foreground border-2 border-border/50 hover:border-primary/50 hover:text-foreground'
              }`}
            >
              <FilterIcon size={16} />
              {config.label}
            </motion.button>
          );
        })}
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-gradient-to-br from-card to-card/50 rounded-xl border-2 border-border/50 shadow-lg"
          >
            <div className="inline-block p-6 bg-muted/30 rounded-full mb-4">
              <Calendar className="text-muted-foreground" size={64} />
            </div>
            <p className="text-xl font-semibold text-foreground mb-2">No reservations found</p>
            <p className="text-muted-foreground">Try adjusting your filters or check back later</p>
          </motion.div>
        ) : (
          filteredReservations.map((reservation) => {
            const StatusIcon = statusConfig[reservation.status].icon;
            return (
              <motion.div
                key={reservation.id}
                className="bg-gradient-to-br from-card to-card/50 rounded-xl border-2 border-border/50 p-6 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                  {/* Reservation Details */}
                  <div className="space-y-6">
                    {/* Header - Enhanced */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent rounded-lg" />
                      <div className="relative flex items-start justify-between gap-4 p-4 border-l-4 border-primary">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Hash className="text-primary" size={20} />
                            <h3 className="font-bold text-2xl text-foreground">
                              {reservation.reservationNumber}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <CalendarDays size={14} />
                              <span>Booked: {reservation.createdAt?.toDate().toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              <span>{reservation.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            {reservation.id && (
                              <div className="flex items-center gap-1.5 text-xs">
                                <span className="opacity-60">ID:</span>
                                <code className="px-1.5 py-0.5 bg-background/80 rounded font-mono">{reservation.id.slice(0, 8)}</code>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${statusConfig[reservation.status].bgColor} border-2 border-current/20`}>
                          <StatusIcon size={18} className={statusConfig[reservation.status].color} />
                          <span className={`text-sm font-bold ${statusConfig[reservation.status].color}`}>
                            {statusConfig[reservation.status].label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info - Enhanced */}
                    <div className="bg-gradient-to-br from-blue-500/5 to-transparent p-5 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="text-blue-500" size={18} />
                        <p className="text-sm uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">Guest Information</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg mt-0.5">
                              <User size={16} className="text-blue-500" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground uppercase mb-0.5">Name</p>
                              <p className="font-bold text-lg text-foreground">{reservation.customerName}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg mt-0.5">
                              <Phone size={16} className="text-blue-500" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground uppercase mb-0.5">Phone</p>
                              <a href={`tel:${reservation.phone}`} className="font-semibold text-foreground hover:text-primary transition-colors">{reservation.phone}</a>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg mt-0.5">
                              <Mail size={16} className="text-blue-500" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground uppercase mb-0.5">Email</p>
                              <a href={`mailto:${reservation.email}`} className="font-semibold text-foreground hover:text-primary transition-colors break-all">{reservation.email}</a>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg mt-0.5">
                              <Users size={16} className="text-blue-500" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground uppercase mb-0.5">Party Size</p>
                              <p className="font-bold text-lg text-foreground">{reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reservation Details */}
                    <div className="bg-gradient-to-br from-purple-500/5 to-transparent p-5 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="text-purple-500" size={18} />
                        <p className="text-sm uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold">Reservation Details</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-card/50 p-4 rounded-lg border border-border/30">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                              <CalendarDays className="text-purple-500" size={18} />
                            </div>
                            <p className="text-xs text-muted-foreground uppercase">Date</p>
                          </div>
                          <p className="font-bold text-xl text-foreground">{new Date(reservation.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                        </div>
                        <div className="bg-card/50 p-4 rounded-lg border border-border/30">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                              <Clock className="text-purple-500" size={18} />
                            </div>
                            <p className="text-xs text-muted-foreground uppercase">Time</p>
                          </div>
                          <p className="font-bold text-xl text-foreground">{reservation.time}</p>
                        </div>
                      </div>
                    </div>

                    {reservation.occasion && (
                      <div className="bg-gradient-to-br from-pink-500/10 to-transparent p-5 rounded-lg border-2 border-pink-500/30">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-pink-500/20 rounded-lg">
                            <PartyPopper className="text-pink-600 dark:text-pink-400" size={20} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm uppercase tracking-wider text-pink-600 dark:text-pink-400 font-semibold mb-2 flex items-center gap-2">
                              <Sparkles size={14} />
                              Special Occasion
                            </p>
                            <p className="text-lg font-bold text-foreground bg-background/50 px-4 py-2 rounded border border-pink-500/20">{reservation.occasion}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {reservation.specialRequests && (
                      <div className="bg-gradient-to-br from-yellow-500/10 to-transparent p-5 rounded-lg border-2 border-yellow-500/30">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-yellow-500/20 rounded-lg">
                            <MessageSquare className="text-yellow-600 dark:text-yellow-400" size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm uppercase tracking-wider text-yellow-600 dark:text-yellow-400 font-semibold mb-2">Special Requests</p>
                            <p className="text-sm text-foreground leading-relaxed bg-background/50 p-3 rounded border border-yellow-500/20 italic">"{reservation.specialRequests}"</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status Actions - Enhanced */}
                  <div className="flex flex-col gap-3 min-w-[280px]">
                    <div className="bg-gradient-to-br from-green-500/5 to-transparent p-4 rounded-lg border border-green-500/20">
                      <p className="text-sm uppercase tracking-wider text-green-600 dark:text-green-400 font-semibold mb-3 flex items-center gap-2">
                        <Clock size={16} />
                        Update Status
                      </p>
                      <div className="space-y-2">
                        {(['pending', 'confirmed', 'completed', 'cancelled'] as ReservationStatus[]).map(
                          (status) => {
                            const StatusButtonIcon = statusConfig[status].icon;
                            const isCurrentStatus = reservation.status === status;
                            return (
                              <motion.button
                                key={status}
                                onClick={() => reservation.id && handleStatusChange(reservation.id, status)}
                                disabled={isCurrentStatus}
                                whileHover={!isCurrentStatus ? { scale: 1.02, x: 4 } : {}}
                                whileTap={!isCurrentStatus ? { scale: 0.98 } : {}}
                                className={`w-full px-4 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                                  isCurrentStatus
                                    ? `${statusConfig[status].bgColor} ${statusConfig[status].color} cursor-not-allowed border-2 border-current/30 shadow-lg`
                                    : 'bg-card text-foreground border-2 border-border/50 hover:border-primary hover:bg-primary/5 hover:text-primary'
                                }`}
                              >
                                <StatusButtonIcon size={16} className={isCurrentStatus ? '' : 'opacity-60'} />
                                {statusConfig[status].label}
                                {isCurrentStatus && (
                                  <CheckCircle size={14} className="ml-auto" />
                                )}
                              </motion.button>
                            );
                          }
                        )}
                      </div>
                    </div>
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
