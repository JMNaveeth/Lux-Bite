import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface FlyingCartItemProps {
  isFlying: boolean;
  startPosition: { x: number; y: number } | null;
  endPosition: { x: number; y: number } | null;
  imageUrl: string;
  onComplete: () => void;
}

export const FlyingCartItem = ({
  isFlying,
  startPosition,
  endPosition,
  imageUrl,
  onComplete,
}: FlyingCartItemProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isFlying && startPosition && endPosition) {
      setShouldRender(true);
    }
  }, [isFlying, startPosition, endPosition]);

  if (!shouldRender || !startPosition || !endPosition) return null;

  const handleAnimationComplete = () => {
    setShouldRender(false);
    onComplete();
  };

  // Calculate arc path for smooth curved motion
  const midX = (startPosition.x + endPosition.x) / 2;
  const midY = Math.min(startPosition.y, endPosition.y) - 100; // Arc upward

  return createPortal(
    <AnimatePresence>
      {isFlying && (
        <>
          {/* Main Flying Item */}
          <motion.div
            className="fixed pointer-events-none z-[100]"
            initial={{
              left: startPosition.x,
              top: startPosition.y,
            }}
            animate={{
              left: [startPosition.x, midX, endPosition.x],
              top: [startPosition.y, midY, endPosition.y],
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94], // Professional easeOutQuad
              times: [0, 0.5, 1],
            }}
            onAnimationComplete={handleAnimationComplete}
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.6, 0.8, 0],
                scale: [0.5, 1.5, 2, 2.5],
              }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
              style={{
                background: 'radial-gradient(circle, rgba(201, 169, 98, 0.4) 0%, transparent 70%)',
              }}
            />

            {/* Item Container with 3D transforms */}
            <motion.div
              className="relative w-20 h-20"
              initial={{
                scale: 1,
                rotateY: 0,
                rotateX: 0,
                rotateZ: 0,
              }}
              animate={{
                scale: [1, 1.3, 1.2, 0.4, 0],
                rotateY: [0, 180, 360, 540, 720],
                rotateX: [0, -20, 20, -10, 0],
                rotateZ: [0, -10, 10, -5, 0],
              }}
              transition={{
                duration: 1,
                ease: [0.34, 1.56, 0.64, 1], // Smooth bounce
                times: [0, 0.3, 0.5, 0.85, 1],
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Shadow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-black/40 blur-md"
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{
                  scale: [1, 1.2, 1.1, 0.5, 0],
                  opacity: [0.4, 0.3, 0.2, 0.1, 0],
                }}
                transition={{
                  duration: 1,
                  ease: 'easeOut',
                }}
                style={{
                  transform: 'translateZ(-20px)',
                }}
              />

              {/* Main Item with Border */}
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden border-3 border-primary shadow-2xl"
                animate={{
                  borderColor: ['rgba(201, 169, 98, 1)', 'rgba(201, 169, 98, 0.6)', 'rgba(201, 169, 98, 1)'],
                  boxShadow: [
                    '0 10px 40px rgba(201, 169, 98, 0.4)',
                    '0 20px 60px rgba(201, 169, 98, 0.6)',
                    '0 10px 40px rgba(201, 169, 98, 0.4)',
                  ],
                }}
                transition={{
                  duration: 0.5,
                  repeat: 1,
                  ease: 'easeInOut',
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={imageUrl}
                  alt="Flying item"
                  className="w-full h-full object-cover"
                  style={{
                    transform: 'translateZ(10px)',
                  }}
                />
                
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
                  initial={{ x: '-100%', y: '-100%' }}
                  animate={{
                    x: ['150%', '200%'],
                    y: ['150%', '200%'],
                  }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                  style={{
                    transform: 'translateZ(20px)',
                  }}
                />

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: 1,
                    ease: 'easeInOut',
                  }}
                  style={{
                    transform: 'translateZ(15px)',
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Trail Particles */}
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              className="fixed pointer-events-none z-[99]"
              initial={{
                left: startPosition.x + 10,
                top: startPosition.y + 10,
                opacity: 0,
              }}
              animate={{
                left: [startPosition.x + 10, midX + 10, endPosition.x + 10],
                top: [startPosition.y + 10, midY + 10, endPosition.y + 10],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.3],
              }}
              transition={{
                duration: 1,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
                times: [0, 0.5, 1],
              }}
            >
              <div
                className="w-3 h-3 rounded-full bg-primary blur-sm"
                style={{
                  boxShadow: '0 0 10px rgba(201, 169, 98, 0.6)',
                }}
              />
            </motion.div>
          ))}

          {/* Sparkles Effect */}
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={`sparkle-${index}`}
              className="fixed pointer-events-none z-[99]"
              initial={{
                left: startPosition.x + 10,
                top: startPosition.y + 10,
                opacity: 0,
              }}
              animate={{
                left: startPosition.x + 10 + Math.cos((index * Math.PI) / 4) * 40,
                top: startPosition.y + 10 + Math.sin((index * Math.PI) / 4) * 40,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: 'easeOut',
              }}
            >
              <div className="w-2 h-2 bg-primary rounded-full" style={{
                boxShadow: '0 0 8px rgba(201, 169, 98, 0.8)',
              }} />
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
