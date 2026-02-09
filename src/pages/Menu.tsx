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
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span
            className="text-primary text-sm tracking-luxury uppercase mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Culinary Artistry
          </motion.span>
          <motion.h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our <span className="text-gradient-gold">Menu</span>
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
      <section className="py-8 bg-card/95 border-y border-border/50 sticky top-[72px] z-30 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2.5 text-sm tracking-wide transition-all duration-300 rounded-lg font-medium ${
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
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-muted-foreground text-sm mr-2 font-medium">Mood:</span>
            {moods.map((mood) => (
              <motion.button
                key={mood.id}
                onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
                className={`px-4 py-2 text-sm transition-all duration-300 rounded-full ${
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
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedMood}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
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
