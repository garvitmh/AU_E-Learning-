import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordByWord?: boolean;
}

export function SplitText({ text, className = '', delay = 100, wordByWord = true }: SplitTextProps) {
  const elements = wordByWord ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '-10px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
      to: inView
        ? { opacity: 1, transform: 'translate3d(0,0px,0)' }
        : { opacity: 0, transform: 'translate3d(0,40px,0)' },
      delay: i * delay,
      config: { mass: 1, tension: 280, friction: 60 }
    }))
  );

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={props}
          className="inline-block"
        >
          {elements[index]}
          {wordByWord && index < elements.length - 1 ? '\u00A0' : ''}
        </animated.span>
      ))}
    </span>
  );
}
