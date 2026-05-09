import { useState, useEffect, useRef } from 'react';

/**
 * Returns a 0-1 progress value representing how far the user has scrolled
 * from when this element first enters the viewport to when it's fully revealed.
 */
export default function useRevealProgress(ref, { offset = 0, distance = 1 } = {}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress goes 0 -> 1 as the element travels from bottom of screen to top
      const raw = (vh - rect.top + offset) / (vh * distance);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    const raf = () => requestAnimationFrame(update);
    window.addEventListener('scroll', raf, { passive: true });
    update();
    return () => window.removeEventListener('scroll', raf);
  }, [ref, offset, distance]);

  return progress;
}
