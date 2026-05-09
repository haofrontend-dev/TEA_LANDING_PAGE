import { useState, useEffect, useRef } from 'react';

export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const requestRef = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const calculateTarget = () => {
      const { top, height } = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollableDistance = height - windowHeight;
      const scrolled = -top;
      
      let p = scrolled / scrollableDistance;
      targetProgress.current = Math.max(0, Math.min(1, p));
    };

    const handleScroll = () => {
      calculateTarget();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Init target immediately
    calculateTarget();
    // Snap to target immediately on mount
    currentProgress.current = targetProgress.current;
    setProgress(currentProgress.current);

    const animate = () => {
      // Lerp function: current = current + (target - current) * factor
      // Lower factor = smoother, higher factor = faster response
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08;
      
      // Update state per frame natively - React 18 batches rAF state updates elegantly
      setProgress(currentProgress.current);
      requestRef.current = window.requestAnimationFrame(animate);
    };

    requestRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) {
        window.cancelAnimationFrame(requestRef.current);
      }
    };
  }, [ref]);

  return progress;
}
