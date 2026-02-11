import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Calendar, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { OrdersManagement } from '@/components/admin/OrdersManagement';
import { ReservationsManagement } from '@/components/admin/ReservationsManagement';

type Tab = 'orders' | 'reservations';

export const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not authenticated or not admin
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const tabs = [
    { id: 'orders' as Tab, label: 'Orders', icon: Package },
    { id: 'reservations' as Tab, label: 'Reservations', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg border border-border/50 shadow-lg"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <motion.aside
          className={`
            fixed lg:relative inset-y-0 left-0 z-40
            w-64 bg-card border-r border-border/50
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-border/50">
              <h2 className="font-serif text-2xl text-gradient-gold">Admin Panel</h2>
            </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all font-medium
                      ${
                        activeTab === id
                          ? 'bg-primary text-black'
                          : 'text-foreground hover:bg-background hover:text-primary'
                      }
                    `}
                  >
                    <Icon size={20} />
                    {label}
                  </button>
                ))}
              </nav>

              {/* Logout */}
              <div className="p-4 border-t border-border/50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    bg-red-500/10 text-red-500 hover:bg-red-500/20
                    transition-all font-medium"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 sm:px-6 py-8">
              {/* Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="font-serif text-4xl text-foreground mb-2">
                  {tabs.find(t => t.id === activeTab)?.label} Management
                </h1>
                <p className="text-muted-foreground">
                  {activeTab === 'orders' 
                    ? 'Manage and track all customer orders in real-time'
                    : 'View and manage table reservations'}
                </p>
              </motion.div>

              {/* Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'orders' ? (
                  <OrdersManagement />
                ) : (
                  <ReservationsManagement />
                )}
              </motion.div>
            </div>
          </main>
        </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
