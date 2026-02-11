import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { menuItems, categories, moods, MenuItem } from '@/lib/menuData';
import { MenuCard } from '@/components/menu/MenuCard';
import { MenuModal } from '@/components/menu/MenuModal';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const moodMatch = !selectedMood || item.moods.includes(selectedMood as any);
    return categoryMatch && moodMatch;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-28 pb-6 md:pt-32 md:pb-8 bg-background relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="menuPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary" />
                <path d="M100,40 L100,160 M40,100 L160,100" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.5" />
                <circle cx="100" cy="40" r="3" fill="currentColor" className="text-primary" />
                <circle cx="160" cy="100" r="3" fill="currentColor" className="text-primary" />
                <circle cx="100" cy="160" r="3" fill="currentColor" className="text-primary" />
                <circle cx="40" cy="100" r="3" fill="currentColor" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#menuPattern)" />
          </svg>
        </div>
        
        {/* Elegant Corner Ornaments */}
        <div className="absolute top-8 left-8 w-32 h-32 opacity-5">
          <svg viewBox="0 0 100 100" className="text-primary">
            <path d="M0,0 Q25,25 50,0 T100,0" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M0,0 Q25,25 0,50 T0,100" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="15" cy="15" r="2" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute top-8 right-8 w-32 h-32 opacity-5 rotate-90">
          <svg viewBox="0 0 100 100" className="text-primary">
            <path d="M0,0 Q25,25 50,0 T100,0" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M0,0 Q25,25 0,50 T0,100" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="15" cy="15" r="2" fill="currentColor"/>
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span
            className="text-primary text-xs tracking-luxury uppercase mb-2 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Special Selection
          </motion.span>
          <motion.h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Delicious <span className="text-gradient-gold">Menu</span>
          </motion.h1>
          <motion.div
            className="divider-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 bg-card/98 border-y border-border/50 sticky top-[64px] z-40 backdrop-blur-xl shadow-md">
        <div className="container mx-auto px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs tracking-wide transition-all duration-300 rounded-lg font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-transparent border border-border text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </motion.button>
            ))}
          </div>

          {/* Mood Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-muted-foreground text-xs mr-1 font-medium">Mood:</span>
            {moods.map((mood) => (
              <motion.button
                key={mood.id}
                onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
                className={`px-3 py-1.5 text-xs transition-all duration-300 rounded-full ${
                  selectedMood === mood.id
                    ? 'bg-primary/20 text-primary border border-primary shadow-md'
                    : 'bg-charcoal-light text-muted-foreground border border-transparent hover:text-foreground hover:border-border hover:bg-card'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mood.emoji} {mood.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-8 md:py-12 bg-background relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="currentColor" className="text-primary" />
                <circle cx="0" cy="0" r="1" fill="currentColor" className="text-primary" />
                <circle cx="100" cy="0" r="1" fill="currentColor" className="text-primary" />
                <circle cx="0" cy="100" r="1" fill="currentColor" className="text-primary" />
                <circle cx="100" cy="100" r="1" fill="currentColor" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />
          </svg>
        </div>
        
        {/* Decorative Side Elements */}
        <div className="absolute left-0 top-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedMood}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 auto-rows-fr"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <MenuCard item={item} onClick={() => setSelectedItem(item)} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No dishes match your current filters. Try a different combination.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Menu Modal */}
      <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </Layout>
  );
};

export default Menu;
