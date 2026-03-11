export const Marquee = ({ children, speed = 40 }: { children: React.ReactNode; speed?: number }) => {
  return (
    <div className="relative w-full overflow-hidden flex pb-8 pt-4">
      <div 
         className="flex whitespace-nowrap animate-marquee gap-8 w-max"
         style={{ animationDuration: `${speed}s` }}
      >
        {/* Render twice for seamless loop */}
        <div className="flex gap-8 group">
          {children}
        </div>
        <div className="flex gap-8 group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
