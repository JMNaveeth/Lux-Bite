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

  return createPortal(
    <AnimatePresence>
      {isFlying && (
        <motion.div
          className="fixed pointer-events-none z-[100]"
          initial={{
            left: startPosition.x,
            top: startPosition.y,
            scale: 1,
            opacity: 1,
            rotateY: 0,
            rotateZ: 0,
          }}
          animate={{
            left: endPosition.x,
            top: endPosition.y,
            scale: [1, 1.2, 0.3],
            opacity: [1, 1, 0.8],
            rotateY: [0, 180, 360],
            rotateZ: [0, -15, 0],
          }}
          exit={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
            times: [0, 0.4, 1],
          }}
          onAnimationComplete={handleAnimationComplete}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            className="relative w-20 h-20 rounded-full overflow-hidden shadow-2xl border-2 border-primary"
            animate={{
              rotateX: [0, 360, 720],
            }}
            transition={{
              duration: 0.8,
              ease: 'linear',
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src={imageUrl}
              alt="Flying item"
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 0.4,
                repeat: 1,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
