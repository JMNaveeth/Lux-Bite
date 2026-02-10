import { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFeaturedItems } from '@/lib/menuData';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { ChefHat, Sparkles } from 'lucide-react';

const AIChefAnimation = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;
  
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none w-48"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{
        opacity: 1,
        scale: [0.9, 1.05, 1],
        rotate: [0, 5, -5, 0],
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div className="relative">
        {/* Chef Silhouette Figure */}
        <motion.div className="relative w-32 h-40 mx-auto">
          {/* Chef Head with Hat */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16"
            animate={{
              rotate: [0, -8, 8, -5, 5, 0],
              y: [0, -3, 0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Chef Hat */}
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-8 bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-t-full border-2 border-primary/50 shadow-2xl"
              animate={{
                scaleY: [1, 1.1, 1, 1.05, 1],
                scaleX: [1, 0.95, 1],
                boxShadow: [
                  '0 4px 15px rgba(201, 169, 98, 0.3)',
                  '0 8px 30px rgba(201, 169, 98, 0.6)',
                  '0 4px 15px rgba(201, 169, 98, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="absolute top-7 left-1/2 -translate-x-1/2 w-12 h-3 bg-primary/90 rounded-sm" />
            
            {/* Chef Face */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full border-2 border-primary/30">
              {/* Eyes */}
              <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full" />
              <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full" />
              {/* Smile */}
              <motion.div 
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-gray-800 rounded-full"
                animate={{
                  scaleX: [1, 1.2, 1, 1.1, 1],
                  y: [0, -1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Chef Body */}
          <motion.div 
            className="absolute top-20 left-1/2 -translate-x-1/2 w-20 h-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-lg border-2 border-primary/40 shadow-2xl"
            animate={{
              scaleY: [1, 1.03, 1, 1.01, 1],
              scaleX: [1, 0.98, 1],
              boxShadow: [
                '0 5px 20px rgba(0, 0, 0, 0.2)',
                '0 8px 35px rgba(201, 169, 98, 0.4)',
                '0 5px 20px rgba(0, 0, 0, 0.2)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Chef Buttons */}
            <div className="absolute left-1/2 -translate-x-1/2 space-y-1.5 top-2">
              <div className="w-2 h-2 bg-primary rounded-full mx-auto" />
              <div className="w-2 h-2 bg-primary rounded-full mx-auto" />
              <div className="w-2 h-2 bg-primary rounded-full mx-auto" />
            </div>
          </motion.div>

          {/* Left Arm - Chopping Motion */}
          <motion.div
            className="absolute top-24 left-2 w-12 h-2 bg-gradient-to-r from-white via-gray-50 to-gray-100 rounded-full border-2 border-primary/40 origin-left shadow-lg"
            animate={{
              rotate: [0, -55, -10, -50, 0],
              x: [0, 6, 0, 5, 0],
              scaleX: [1, 1.05, 1],
            }}
            transition={{
              duration: 1.8,
              times: [0, 0.3, 0.5, 0.8, 1],
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Chef Knife */}
            <motion.div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-1.5 bg-gradient-to-r from-gray-400 via-gray-300 to-primary rounded-full shadow-lg"
              animate={{
                scaleX: [1, 1.3, 1, 1.2, 1],
                boxShadow: [
                  '0 2px 10px rgba(201, 169, 98, 0.4)',
                  '0 4px 20px rgba(201, 169, 98, 0.8)',
                  '0 2px 10px rgba(201, 169, 98, 0.4)',
                ],
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: "easeInOut"
            {/* Chef Knife */}
            <motion.div via-gray-50 to-gray-100 rounded-full border-2 border-primary/40 origin-right shadow-lg"
            animate={{
              rotate: [0, 50, 10, 45, 0],
              x: [0, -6, 0, -5, 0],
              scaleX: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              times: [0, 0.3, 0.5, 0.8, 1],
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.4,
            }}
          >
            {/* Cooking Spoon */}
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-2 bg-gradient-to-l from-primary via-gray-300 to-gray-400 rounded-full shadow-lg"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 2px 10px rgba(201, 169, 98, 0.4)',
                  '0 4px 20px rgba(201, 169, 98, 0.8)',
                  '0 2px 10px rgba(201, 169, 98, 0.4)',
                ],
              }}
              transition={{
                rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 1.5, repeat: Infinity },
              ease: "easeIn20 h-10 bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-lg border-2 border-gray-600 shadow-2xl"
              animate={{
                y: [0, -3, 0, -2, 0],
                scale: [1, 1.02, 1],
                boxShadow: [
                  '0 5px 20px rgba(0, 0, 0, 0.3)',
                  '0 8px 35px rgba(201, 169, 98, 0.5)',
                  '0 5px 20px rgba(0, 0, 0, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Glowing liquid inside pot */}
              <motion.div
                className="absolute inset-2 bg-gradient-to-t from-primary/60 to-primary/30 rounded blur-sm"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </motion.div>
            {/* Enhanced Steam particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`steam-${i}`}
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-t from-primary/40 to-primary/10 rounded-full blur-md"
                style={{
                  left: `${20 + i * 8}%`,
                }}
                animate={{
                  y: [0, -40, -80],
                  opacity: [0, 0.9, 0.5, 0],
                  scale: [1, 1.8, 2.5, 3],
                  x: [0, (i % 2 === - Continuous */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [
                0, 
                Math.cos((i * Math.PI) / 8) * (30 + i * 4),
                Math.cos((i * Math.PI) / 8) * (50 + i * 6),
                0
              ],
              y: [
                0, 
                Math.sin((i * Math.PI) / 8) * (30 + i * 4),
                Math.sin((i * Math.PI) / 8) * (50 + i * 6),
                0
              ],
              opacity: [0, 0.8, 1, 0.6, 0],
              scale: [0, 1.2, 1.8, 1, 0],
              rotate: [0, 180, 360, 540, 720],
            }}
            transition={{
              duration: 3,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles 
              size={i % 3 === 0 ? 24 : i % 2 === 0 ? 20 : 16} 
              className={i % 2 === 0 ? "text-primary drop-shadow-2xl" : "text-yellow-400 drop-shadow-2xl"}
                  delay: i * 0.2,
                  repeat: Infinity,- Continuous */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-radial from-primary/30 via-yellow-400/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1.2, 1.5, 1],
            opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Secondary Glow Layer */}- Always Visible */}
      <motion.div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-64"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.p 
          className="text-primary font-serif text-base sm:text-lg whitespace-nowrap font-bold bg-gradient-to-r from-background/95 via-background to-background/95 backdrop-blur-md px-6 py-3 rounded-full border-2 border-primary/50 shadow-2xl"
          animate={{
            boxShadow: [
              '0 0 25px rgba(201, 169, 98, 0.4)',
              '0 0 50px rgba(201, 169, 98, 0.8)',
              '0 0 25px rgba(201, 169, 98, 0.4)',
            ],
            borderColor: [
              'rgba(201, 169, 98, 0.5)',
              'rgba(201, 169, 98, 0.9)',
              'rgba(201, 169, 98, 0.5)',
            ],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="inline-block"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
        isInView = useInView(cardRef, { once: false, margin: '-50px', amount: 0.3 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(mouseX, { stiffness: 200, damping: 25 }.3 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Sparkles 
              size={i % 2 === 0 ? 20 : 16} 
              className="text-primary drop-shadow-lg" 
              fill="currentColor" 
            />
          </motion.div>
        ))}

        {/* Gourmet Presentation Glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [0, 1.5, 2, 1.5, 0],
            opacity: [0, 0.5, 0.3, 0.5, 0],
          }}
          transition={{
            duration: 3.5,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Premium Text with Animation */}
      <motion.div
        className="mt-2 text-center"
        animate={{
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 3.5,
          times: [0, 0.2, 0.5, 0.8, 1],
        }}
      >
        <motion.p 
          className="text-primary font-serif text-lg whitespace-nowrap font-bold bg-gradient-to-r from-background via-background/95 to-background backdrop-blur-md px-6 py-2.5 rounded-full border-2 border-primary/40 shadow-2xl"
          animate={{
            boxShadow: [
              '0 0 20px rgba(201, 169, 98, 0.3)',
              '0 0 40px rgba(201, 169, 98, 0.6)',
              '0 0 20px rgba(201, 169, 98, 0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}- Always Show When In View */}
        <AIChefAnimation visible={isInView
          ✨ Master Chef Crafting Your Dish ✨
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const FeaturedCard = ({ item, index }: { item: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showChef, setShowChef] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(mouseX, { stiffness: 200, damping: 25 });

  // Trigger chef animation when card comes into view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowChef(true);
        setTimeout(() => setShowChef(false), 3000);
      }, index * 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, index]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    mouseX.set(xPct * 20);
    mouseY.set(yPct * -20);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <AnimatedSection delay={index * 100}>
      <motion.div
        ref={cardRef}
        className="group relative h-full"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* AI Chef Animation */}
        <AIChefAnimation visible={showChef} />

        {/* Dish appears with animation */}
        <motion.div
          className="bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/40 shadow-lg hover:shadow-2xl h-full flex flex-col relative"
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={isInView ? {
            opacity: 1,
            scale: 1,
            y: 0,
          } : {}}
          transition={{
            duration: 0.8,
            delay: index * 0.4 + 1.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{
            y: -12,
            scale: 1.02,
          }}
        >
          {/* Image */}
          <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
            <motion.img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              style={{
                transform: 'translateZ(20px)',
              }}
              animate={{
                scale: isHovered ? 1.15 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
              animate={{
                opacity: isHovered ? 0.7 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Category Badge */}
            <div 
              className="absolute top-3 left-3"
              style={{ transform: 'translateZ(40px)' }}
            >
              <span className="text-[10px] sm:text-xs tracking-widest uppercase text-primary bg-background/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-sm shadow-lg">
                {item.category.replace('-', ' ')}
              </span>
            </div>

            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(201, 169, 98, 0.3) 50%, transparent 100%)',
                transform: 'translateZ(10px)',
              }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Content */}
          <div 
            className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-between"
            style={{ transform: 'translateZ(50px)' }}
          >
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4">
                {item.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <motion.span 
                className="text-primary font-semibold text-base sm:text-lg"
                animate={{
                  scale: isHovered ? 1.15 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                ${item.price}
              </motion.span>
              <span className="text-[10px] sm:text-xs text-muted-foreground tracking-wide capitalize">
                {item.moods[0]}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
};

export const FeaturedDishes = () => {
  const featuredItems = getFeaturedItems();

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="text-primary text-xs sm:text-sm tracking-luxury uppercase mb-3 md:mb-4 block">
            Culinary Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 md:mb-6 px-4">
            Signature Creations
          </h2>
          <div className="divider-gold" />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {featuredItems.map((item, index) => (
            <FeaturedCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <AnimatedSection className="text-center mt-16" delay={400}>
          <Link to="/menu" className="btn-outline-gold">
            View Full Menu
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};
