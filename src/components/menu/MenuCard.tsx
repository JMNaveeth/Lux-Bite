import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '@/lib/menuData';

interface MenuCardProps {
  item: MenuItem;
  onClick: () => void;
}

export const MenuCard = ({ item, onClick }: MenuCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -8;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="relative bg-card border border-border/50 rounded-sm overflow-hidden transition-colors duration-500 hover:border-primary/30"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Featured Badge */}
          {item.featured && (
            <div className="absolute top-4 right-4">
              <span className="text-xs tracking-widest uppercase text-primary bg-background/90 backdrop-blur-sm px-3 py-1 rounded-sm border border-primary/30">
                ★ Featured
              </span>
            </div>
          )}

          {/* Mood Tags */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            {item.moods.slice(0, 2).map((mood) => (
              <span
                key={mood}
                className="text-xs text-foreground/80 bg-background/60 backdrop-blur-sm px-2 py-0.5 rounded-sm"
              >
                {mood}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-300">
              {item.name}
            </h3>
            <span className="text-primary font-medium text-lg">${item.price}</span>
          </div>
          
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
            {item.description}
          </p>

          {/* Dietary Tags */}
          {item.dietary && (
            <div className="flex gap-2">
              {item.dietary.map((diet) => (
                <span
                  key={diet}
                  className="text-xs text-accent border border-accent/30 px-2 py-0.5 rounded-sm"
                >
                  {diet}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              ${rotation.y * 10 + 135}deg,
              transparent 0%,
              rgba(201, 169, 98, 0.08) 50%,
              transparent 100%
            )`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};
