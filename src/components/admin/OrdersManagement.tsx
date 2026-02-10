import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Package, Truck, DollarSign } from 'lucide-react';
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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Package className="text-orange-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Preparing</p>
              <p className="text-2xl font-bold text-foreground">{stats.preparing}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-card rounded-lg border border-border/50 p-4"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <CheckCircle className="text-purple-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ready</p>
              <p className="text-2xl font-bold text-foreground">{stats.ready}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-card rounded-lg border border-border/50 p-4"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Truck className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delivered</p>
              <p className="text-2xl font-bold text-foreground">{stats.delivered}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-card rounded-lg border border-border/50 p-4"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold text-primary">Rs {todayRevenue.toLocaleString()}</p>
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
          All Orders ({orders.length})
        </button>
        {Object.entries(statusConfig).map(([status, config]) => (
          <button
            key={status}
            onClick={() => setFilter(status as OrderStatus)}
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

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border/50">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            return (
              <motion.div
                key={order.id}
                className="bg-card rounded-lg border border-border/50 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
                  {/* Order Details */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">
                          Order #{order.orderNumber}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {order.createdAt?.toDate().toLocaleString()}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig[order.status].bgColor}`}>
                        <StatusIcon size={16} className={statusConfig[order.status].color} />
                        <span className={`text-sm font-medium ${statusConfig[order.status].color}`}>
                          {statusConfig[order.status].label}
                        </span>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Customer</p>
                        <p className="font-medium text-foreground">{order.customerName}</p>
                        <p className="text-muted-foreground">{order.phone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Delivery Address</p>
                        <p className="font-medium text-foreground">{order.address}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Items:</p>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 text-sm">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{item.name}</p>
                              <p className="text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium text-foreground">Rs {item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-t border-border/50 pt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">Rs {order.subtotal}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span className="text-foreground">Rs {order.deliveryFee}</span>
                      </div>
                      <div className="flex items-center justify-between font-bold text-lg">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary">Rs {order.total}</span>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                        <p className="text-sm text-foreground">{order.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Status Actions */}
                  <div className="flex flex-col gap-2 min-w-[200px]">
                    <p className="text-sm font-medium text-foreground mb-2">Update Status:</p>
                    {(['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'] as OrderStatus[]).map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => order.id && handleStatusChange(order.id, status)}
                          disabled={order.status === status}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            order.status === status
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
