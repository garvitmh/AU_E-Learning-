import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

export const AnimatedList = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode[]; 
  className?: string;
}) => {
  return (
    <div className={className}>
      <AnimatePresence>
        {children.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              delay: index * 0.1, // Stagger effect
            }}
            className="h-full w-full"
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
