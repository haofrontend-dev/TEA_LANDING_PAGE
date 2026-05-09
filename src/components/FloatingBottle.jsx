import React, { useEffect, useRef, useState } from 'react';
import { getBottleState } from '../hooks/useScrollFloat';

export default function FloatingBottle() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const initial = getBottleState(0, isMobile);
  
  const [bottleProps, setBottleProps] = useState(initial);
  const [ghosts, setGhosts] = useState([]);
  
  const rafRef = useRef(null);
  const currentState = useRef(initial);
  const targetState = useRef(initial);
  const historyQueue = useRef([]);
  
  // Pulse logic
  const targetPulse = useRef(1);
  const currentPulse = useRef(1);
  const currentSectionIdx = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      targetState.current = getBottleState(progress, isMobile);
      
      // Determine if crossed a waypoint for pulse
      const waypoints = [0, 0.2, 0.35, 0.5, 0.65, 0.8, 0.95];
      for (let i = 0; i < waypoints.length; i++) {
        if (progress > waypoints[i] - 0.05 && progress < waypoints[i] + 0.05) {
          if (currentSectionIdx.current !== i) {
            targetPulse.current = 1.15;
            currentSectionIdx.current = i;
            setTimeout(() => { targetPulse.current = 1; }, 200); 
          }
          break;
        }
      }
    };

    const smoothLoop = () => {
      const isMobileNow = window.innerWidth < 768;
      
      // Lerp current towards target (0.08 factor for dreamy pursuit)
      currentState.current = {
        x: currentState.current.x + (targetState.current.x - currentState.current.x) * 0.08,
        y: currentState.current.y + (targetState.current.y - currentState.current.y) * 0.08,
        scale: currentState.current.scale + (targetState.current.scale - currentState.current.scale) * 0.08,
        rotate: currentState.current.rotate + (targetState.current.rotate - currentState.current.rotate) * 0.08,
        opacity: currentState.current.opacity + (targetState.current.opacity - currentState.current.opacity) * 0.08,
        blur: currentState.current.blur + (targetState.current.blur - currentState.current.blur) * 0.08,
      };

      // Lerp pulse scale
      currentPulse.current += (targetPulse.current - currentPulse.current) * 0.15;

      // Determine movement speed for motion trail
      const dx = Math.abs(currentState.current.x - targetState.current.x);
      const dy = Math.abs(currentState.current.y - targetState.current.y);
      const isMovingFast = dx > 0.5 || dy > 0.5;

      // History queue for ghosts (Motion Trail)
      if (!isMobileNow) {
        historyQueue.current.push({ ...currentState.current });
        if (historyQueue.current.length > 10) {
          historyQueue.current.shift();
        }
        if (isMovingFast) {
          setGhosts([
            historyQueue.current[historyQueue.current.length - 3] || currentState.current,
            historyQueue.current[historyQueue.current.length - 6] || currentState.current,
            historyQueue.current[historyQueue.current.length - 9] || currentState.current,
          ]);
        } else {
          setGhosts([]);
        }
      }

      setBottleProps({ 
        ...currentState.current,
        pulseScale: currentPulse.current 
      });

      rafRef.current = requestAnimationFrame(smoothLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(smoothLoop);
    
    // Init state exactly
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  // Parallax Depth Shadow - leans away from center
  const shadowX = (bottleProps.x - 50) * 0.5; 
  const blurRadius = bottleProps.scale * 25;

  const baseStyle = {
    position: 'fixed',
    left: `${bottleProps.x}vw`,
    top: `${bottleProps.y}vh`,
    transform: `translate(-50%, -50%) scale(${(bottleProps.scale || 1) * (bottleProps.pulseScale || 1)}) rotate(${bottleProps.rotate || 0}deg)`,
    opacity: bottleProps.opacity,
    filter: `blur(${bottleProps.blur}px) drop-shadow(${shadowX}px 30px ${blurRadius}px rgba(180,100,30,0.45))`,
    zIndex: 9999,
    pointerEvents: 'none',
    willChange: 'transform, opacity, filter',
    transition: 'none',
  };

  return (
    <>
      {/* Motion Trail Ghosts */}
      {ghosts.map((g, i) => (
        <div key={i} style={{
          position: 'fixed',
          left: `${g.x}vw`,
          top: `calc(${g.y}vh)`,
          transform: `translate(-50%, -50%) scale(${g.scale * (bottleProps.pulseScale || 1)}) rotate(${g.rotate}deg)`,
          opacity: [0.15, 0.08, 0.03][i] * g.opacity,
          filter: `blur(${[4, 8, 12][i]}px)`,
          zIndex: 9998 - i,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}>
          <img src="/chainuoc.png" alt="ghost" style={{ display: 'block' }} />
        </div>
      ))}
      
      {/* Main Hero Bottle */}
      <div style={baseStyle}>
        <img 
          src="/chainuoc.png" 
          alt="Mascot Bottle"
          style={{ display: 'block' }}
        />
      </div>
    </>
  );
}
