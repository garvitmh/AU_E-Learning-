import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Carousel = ({ children }: { children: ReactNode[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prevIndex) => (prevIndex + 1 === children.length ? 0 : prevIndex + 1));
  const prev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? children.length - 1 : prevIndex - 1));

  return (
    <div className="relative w-full py-10"> {/* removed overflow-hidden here to allow glow effects */}
      <div className="flex justify-center items-center gap-4">
        <button onClick={prev} className="btn btn-circle btn-primary btn-sm z-10 shadow-lg">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative flex justify-center items-center" style={{ minHeight: '520px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full h-full flex justify-center items-center p-2"
            >
              {children[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={next} className="btn btn-circle btn-primary btn-sm z-10 shadow-lg">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-center mt-6 gap-2">
        {children.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${i === currentIndex ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/50'}`}
          />
        ))}
      </div>
    </div>
  );
};
