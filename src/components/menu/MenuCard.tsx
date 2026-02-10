import { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { MenuItem } from '@/lib/menuData';

interface MenuCardProps {
  item: MenuItem;
  onClick: () => void;
}

export const MenuCard = ({ item, onClick }: MenuCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Smooth spring animations for subtle tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -3;
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 3;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer h-full flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative h-full flex flex-col bg-card border border-border/50 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        animate={{
          y: isHovered && !isPressed ? -6 : 0,
          borderColor: isHovered ? 'rgb(201, 169, 98, 0.5)' : 'rgb(38, 38, 38, 0.5)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-light">
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            animate={{ 
              scale: isHovered ? 1.08 : 1,
              filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
            animate={{
              opacity: isHovered ? 0.6 : 0.8
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Featured Badge */}
          {item.featured && (
            <motion.div 
              className="absolute top-2 right-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-[10px] tracking-widest uppercase text-primary bg-background/95 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/40 shadow-lg">
                ★ Featured
              </span>
            </motion.div>
          )}

          {/* Mood Tags */}
          <motion.div 
            className="absolute bottom-3 left-3 flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {item.moods.slice(0, 2).map((mood, index) => (
              <motion.span
                key={mood}
                className="text-xs font-semibold text-foreground bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full border-2 border-primary/40 shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {mood}
              </motion.span>
            ))}
          </motion.div>

          {/* Overlay Gradient on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0"
            animate={{
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3 gap-3">
            <motion.h3 
              className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 flex-1 line-clamp-2"
              animate={{
                x: isHovered ? 2 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {item.name}
            </motion.h3>
            <motion.span 
              className="text-primary font-bold text-lg whitespace-nowrap"
              animate={{
                scale: isHovered ? 1.08 : 1,
                color: isHovered ? 'rgb(219, 188, 127)' : 'rgb(201, 169, 98)'
              }}
              transition={{ duration: 0.3 }}
            >
              Rs {item.price}
            </motion.span>
          </div>
          
          <p className="text-foreground/80 text-sm font-medium leading-relaxed line-clamp-2 mb-4">
            {item.description}
          </p>

          {/* Dietary Tags */}
          {item.dietary && (
            <div className="flex flex-wrap gap-2">
              {item.dietary.map((diet, index) => (
                <motion.span
                  key={diet}
                  className="text-xs font-semibold text-accent border-2 border-accent/50 px-3 py-1 rounded-full bg-accent/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.05, borderColor: 'rgb(201, 169, 98)' }}
                >
                  {diet}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {/* Subtle Shine Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                135deg,
                transparent 0%,
                rgba(201, 169, 98, 0.05) 50%,
                transparent 100%
              )`,
            }}
          />
        </motion.div>

        {/* Bottom Glow on Hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scaleX: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};
