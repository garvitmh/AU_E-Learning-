import { useRef, useState } from 'react';

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlareCard = ({ children, className = '' }: GlareCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-50 transition-opacity duration-300 rounded-inherit mix-blend-overlay"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
};
