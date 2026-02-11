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
        {/* Food-themed Background Pattern */}
        <div className="absolute inset-0 opacity-[0.06]">
          <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="foodPattern" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
                {/* Fork */}
                <g transform="translate(50, 50)">
                  <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                  <line x1="-6" y1="0" x2="-6" y2="35" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                  <line x1="-3" y1="0" x2="-3" y2="35" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                  <line x1="3" y1="0" x2="3" y2="35" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                  <line x1="6" y1="0" x2="6" y2="35" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                </g>
                {/* Knife */}
                <g transform="translate(250, 50)">
                  <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                  <path d="M-4,0 L4,0 L2,-15 L-2,-15 Z" fill="currentColor" className="text-primary" opacity="0.6" />
                </g>
                {/* Plate */}
                <g transform="translate(150, 150)">
                  <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                  <circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" opacity="0.5" />
                </g>
                {/* Wine Glass */}
                <g transform="translate(50, 250)">
                  <path d="M-8,-20 L-8,-10 Q-8,0 0,5 L0,15 M8,-20 L8,-10 Q8,0 0,5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                  <line x1="-10" y1="15" x2="10" y2="15" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                  <line x1="-10" y1="-20" x2="10" y2="-20" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                </g>
                {/* Chef Hat */}
                <g transform="translate(250, 250)">
                  <ellipse cx="0" cy="-5" rx="20" ry="10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                  <path d="M-20,-5 Q-20,-20 -10,-25 Q0,-30 10,-25 Q20,-20 20,-5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#foodPattern)" />
          </svg>
        </div>
        
        {/* Glowing Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        
        {/* Elegant Corner Food Illustrations */}
        <div className="absolute top-8 left-8 w-32 h-32 opacity-[0.12]">
          <svg viewBox="0 0 100 100" className="text-primary">
            {/* Decorative food frame */}
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M50,20 L50,30 M50,70 L50,80 M20,50 L30,50 M70,50 L80,50" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="50" cy="20" r="3" fill="currentColor"/>
            <circle cx="50" cy="80" r="3" fill="currentColor"/>
            <circle cx="20" cy="50" r="3" fill="currentColor"/>
            <circle cx="80" cy="50" r="3" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute top-8 right-8 w-32 h-32 opacity-[0.12]">
          <svg viewBox="0 0 100 100" className="text-primary">
            {/* Decorative food frame */}
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M50,20 L50,30 M50,70 L50,80 M20,50 L30,50 M70,50 L80,50" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="50" cy="20" r="3" fill="currentColor"/>
            <circle cx="50" cy="80" r="3" fill="currentColor"/>
            <circle cx="20" cy="50" r="3" fill="currentColor"/>
            <circle cx="80" cy="50" r="3" fill="currentColor"/>
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
      <section className="py-4 bg-card/98 border-y border-border/50 sticky top-[64px] z-40 backdrop-blur-xl shadow-md relative overflow-hidden">
        {/* Food-themed Background Pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="filterPattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                {/* Spoon */}
                <g transform="translate(40, 75)">
                  <ellipse cx="0" cy="-25" rx="8" ry="10" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-primary" />
                  <line x1="0" y1="-15" x2="0" y2="20" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                </g>
                {/* Coffee Cup */}
                <g transform="translate(110, 75)">
                  <path d="M-8,0 L-8,15 Q-8,20 0,20 Q8,20 8,15 L8,0 Z" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-primary" />
                  <path d="M8,5 L12,5 Q15,5 15,8 Q15,11 12,11 L8,11" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-primary" />
                  <line x1="-6" y1="-3" x2="6" y2="-3" stroke="currentColor" strokeWidth="1" className="text-primary" opacity="0.5" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#filterPattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
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
        {/* Food-themed Background Pattern */}
        <div className="absolute inset-0 opacity-[0.06]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dishPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                {/* Cloche/Food Cover */}
                <g transform="translate(100, 100)">
                  <path d="M-30,10 L-30,5 Q-30,-20 0,-30 Q30,-20 30,5 L30,10 Z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                  <ellipse cx="0" cy="10" rx="32" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
                  <circle cx="0" cy="-30" r="3" fill="currentColor" className="text-primary" opacity="0.6" />
                </g>
                
                {/* Leaves/Garnish */}
                <g transform="translate(50, 180)" opacity="0.6">
                  <ellipse cx="0" cy="0" rx="8" ry="15" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-primary" transform="rotate(20)" />
                  <line x1="0" y1="-15" x2="0" y2="15" stroke="currentColor" strokeWidth="1" className="text-primary" />
                </g>
                <g transform="translate(150, 20)" opacity="0.6">
                  <ellipse cx="0" cy="0" rx="8" ry="15" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-primary" transform="rotate(-20)" />
                  <line x1="0" y1="-15" x2="0" y2="15" stroke="currentColor" strokeWidth="1" className="text-primary" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dishPattern)" />
          </svg>
        </div>
        
        {/* Decorative Side Elements */}
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
        
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
