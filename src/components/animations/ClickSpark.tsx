import { useEffect, useCallback } from 'react';

export const ClickSpark = ({
  color = '#a855f7', // Brighter purple
  size = 30, // Larger default size
}: {
  color?: string;
  size?: number;
}) => {
  const createSparkles = useCallback(
    (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9999';
      document.body.appendChild(el);

      Array.from({ length: 12 }).forEach((_, i) => { // More sparks (12 instead of 8)
        const span = document.createElement('span');
        const angle = (i * 2 * Math.PI) / 12;
        const radius = size * 2.5; // Travel further
        const targetX = Math.cos(angle) * radius;
        const targetY = Math.sin(angle) * radius;

        span.style.position = 'absolute';
        span.style.width = '6px'; // Thicker sparks
        span.style.height = '6px';
        span.style.backgroundColor = color;
        span.style.borderRadius = '50%';
        span.style.boxShadow = `0 0 10px ${color}`; // Add glow
        span.style.transform = `translate(-50%, -50%)`;
        el.appendChild(span);

        const animation = span.animate(
          [
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${targetX}px, ${targetY}px) scale(0)`, opacity: 0 }
          ],
          {
            duration: 600 + Math.random() * 300, // Longer duration
            easing: 'cubic-bezier(0, .9, .57, 1)'
          }
        );
        animation.onfinish = () => span.remove();
      });

      setTimeout(() => el.remove(), 1000);
    },
    [color, size]
  );

  useEffect(() => {
    window.addEventListener('click', createSparkles);
    return () => window.removeEventListener('click', createSparkles);
  }, [createSparkles]);

  return null;
};
