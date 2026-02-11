import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Package, Truck, DollarSign, User, Phone, MapPin, CreditCard, Calendar, MessageSquare, Hash } from 'lucide-react';
import { Order, OrderStatus } from '@/types/firebase';
import { subscribeToOrders, updateOrderStatus } from '@/lib/orderService';
import { useToast } from '@/hooks/use-toast';

const statusConfig = {
  pending: { label: 'Pending', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'text-blue-500', bgColor: 'bg-blue-500/10', icon: CheckCircle },
  preparing: { label: 'Preparing', color: 'text-orange-500', bgColor: 'bg-orange-500/10', icon: Package },
  ready: { label: 'Ready', color: 'text-purple-500', bgColor: 'bg-purple-500/10', icon: CheckCircle },
  delivered: { label: 'Delivered', color: 'text-green-500', bgColor: 'bg-green-500/10', icon: Truck },
  cancelled: { label: 'Cancelled', color: 'text-red-500', bgColor: 'bg-red-500/10', icon: XCircle },
};

export const OrdersManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = subscribeToOrders((newOrders) => {
      setOrders(newOrders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast({
        title: 'Status updated',
        description: `Order status changed to ${statusConfig[newStatus].label}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive',
      });
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

  const getStatusStats = () => {
    return {
      pending: orders.filter(o => o.status === 'pending').length,
      preparing: orders.filter(o => o.status === 'preparing').length,
      ready: orders.filter(o => o.status === 'ready').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
    };
  };

  const stats = getStatusStats();
  const todayRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, order) => sum + order.total, 0);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
          className="bg-gradient-to-br from-orange-500/10 to-transparent rounded-xl border-2 border-orange-500/30 p-5 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold mb-2">Preparing</p>
              <p className="text-4xl font-bold text-foreground">{stats.preparing}</p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <Package className="text-orange-600 dark:text-orange-400" size={28} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl border-2 border-purple-500/30 p-5 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold mb-2">Ready</p>
              <p className="text-4xl font-bold text-foreground">{stats.ready}</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <CheckCircle className="text-purple-600 dark:text-purple-400" size={28} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-500/10 to-transparent rounded-xl border-2 border-green-500/30 p-5 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-green-600 dark:text-green-400 font-semibold mb-2">Delivered</p>
              <p className="text-4xl font-bold text-foreground">{stats.delivered}</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Truck className="text-green-600 dark:text-green-400" size={28} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-primary/10 to-transparent rounded-xl border-2 border-primary/30 p-5 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Revenue</p>
              <p className="text-4xl font-bold text-primary">Rs {todayRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-primary/20 rounded-xl">
              <DollarSign className="text-primary" size={28} />
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
          All Orders ({orders.length})
        </motion.button>
        {Object.entries(statusConfig).map(([status, config]) => {
          const FilterIcon = config.icon;
          return (
            <motion.button
              key={status}
              onClick={() => setFilter(status as OrderStatus)}
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

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-gradient-to-br from-card to-card/50 rounded-xl border-2 border-border/50 shadow-lg"
          >
            <div className="inline-block p-6 bg-muted/30 rounded-full mb-4">
              <Package className="text-muted-foreground" size={64} />
            </div>
            <p className="text-xl font-semibold text-foreground mb-2">No orders found</p>
            <p className="text-muted-foreground">Try adjusting your filters or check back later</p>
          </motion.div>
        ) : (
          filteredOrders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            return (
              <motion.div
                key={order.id}
                className="bg-gradient-to-br from-card to-card/50 rounded-xl border-2 border-border/50 p-6 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                  {/* Order Details */}
                  <div className="space-y-6">
                    {/* Header - Enhanced */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent rounded-lg" />
                      <div className="relative flex items-start justify-between gap-4 p-4 border-l-4 border-primary">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Hash className="text-primary" size={20} />
                            <h3 className="font-bold text-2xl text-foreground">
                              {order.orderNumber}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={14} />
                              <span>{order.createdAt?.toDate().toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              <span>{order.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            {order.id && (
                              <div className="flex items-center gap-1.5 text-xs">
                                <span className="opacity-60">ID:</span>
                                <code className="px-1.5 py-0.5 bg-background/80 rounded font-mono">{order.id.slice(0, 8)}</code>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${statusConfig[order.status].bgColor} border-2 border-current/20`}>
                          <StatusIcon size={18} className={statusConfig[order.status].color} />
                          <span className={`text-sm font-bold ${statusConfig[order.status].color}`}>
                            {statusConfig[order.status].label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info - Enhanced */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-500/5 to-transparent p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-500/10 rounded-lg">
                            <User className="text-blue-500" size={20} />
                          </div>
                          <div className="flex-1 space-y-2">
                            <p className="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">Customer Details</p>
                            <p className="font-bold text-lg text-foreground">{order.customerName}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone size={14} />
                              <a href={`tel:${order.phone}`} className="hover:text-primary transition-colors">{order.phone}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-500/5 to-transparent p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-500/10 rounded-lg">
                            <MapPin className="text-green-500" size={20} />
                          </div>
                          <div className="flex-1 space-y-2">
                            <p className="text-xs uppercase tracking-wider text-green-600 dark:text-green-400 font-semibold">Delivery Address</p>
                            <p className="font-medium text-foreground leading-relaxed">{order.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Items - Enhanced */}
                    <div className="bg-gradient-to-br from-orange-500/5 to-transparent p-5 rounded-lg border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Package className="text-orange-500" size={18} />
                        <p className="text-sm uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">Order Items ({order.items.length})</p>
                      </div>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-3 bg-card/50 rounded-lg border border-border/50 hover:border-primary/30 transition-all"
                          >
                            <div className="relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg ring-2 ring-primary/20"
                              />
                              <div className="absolute -top-2 -right-2 bg-primary text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                                {item.quantity}
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-foreground mb-1">{item.name}</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>Rs {item.price} each</span>
                                <span>•</span>
                                <span className="font-medium">Quantity: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-primary">Rs {item.price * item.quantity}</p>
                              <p className="text-xs text-muted-foreground">Item Total</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Total - Enhanced */}
                    <div className="bg-gradient-to-br from-primary/10 to-transparent p-5 rounded-lg border-2 border-primary/30">
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="text-primary" size={18} />
                        <p className="text-sm uppercase tracking-wider text-primary font-semibold">Payment Summary</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Package size={14} />
                            Items Subtotal
                          </span>
                          <span className="font-semibold text-foreground">Rs {order.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Truck size={14} />
                            Delivery Fee
                          </span>
                          <span className="font-semibold text-foreground">Rs {order.deliveryFee.toLocaleString()}</span>
                        </div>
                        <div className="border-t-2 border-primary/20 pt-3 mt-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-lg text-foreground flex items-center gap-2">
                              <CreditCard size={18} />
                              Grand Total
                            </span>
                            <span className="font-bold text-2xl text-primary">Rs {order.total.toLocaleString()}</span>
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full font-medium">Cash on Delivery</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="bg-gradient-to-br from-yellow-500/10 to-transparent p-5 rounded-lg border-2 border-yellow-500/30">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-yellow-500/20 rounded-lg">
                            <MessageSquare className="text-yellow-600 dark:text-yellow-400" size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm uppercase tracking-wider text-yellow-600 dark:text-yellow-400 font-semibold mb-2">Special Instructions</p>
                            <p className="text-sm text-foreground leading-relaxed bg-background/50 p-3 rounded border border-yellow-500/20 italic">"{order.notes}"</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status Actions - Enhanced */}
                  <div className="flex flex-col gap-3 min-w-[280px]">
                    <div className="bg-gradient-to-br from-purple-500/5 to-transparent p-4 rounded-lg border border-purple-500/20">
                      <p className="text-sm uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold mb-3 flex items-center gap-2">
                        <Clock size={16} />
                        Update Status
                      </p>
                      <div className="space-y-2">
                        {(['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'] as OrderStatus[]).map(
                          (status) => {
                            const StatusButtonIcon = statusConfig[status].icon;
                            const isCurrentStatus = order.status === status;
                            return (
                              <motion.button
                                key={status}
                                onClick={() => order.id && handleStatusChange(order.id, status)}
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
