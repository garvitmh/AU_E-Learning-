import './GlitchText.css';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span 
        className="absolute top-0 left-0 -ml-[2px] text-primary mix-blend-screen opacity-80 animate-glitch-1"
        aria-hidden="true"
      >
        {text}
      </span>
      <span 
        className="absolute top-0 left-0 ml-[2px] text-secondary mix-blend-screen opacity-80 animate-glitch-2"
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
};
