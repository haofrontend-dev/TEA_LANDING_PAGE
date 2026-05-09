// src/hooks/useScrollFloat.js

// Easing function: easeInOutQuad
const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const lerp = (start, end, progress) => {
  return start + (end - start) * progress;
};

let cachedWaypoints = null;
let lastDocHeight = 0;

export function getBottleState(scrollProgress, isMobile) {
  if (typeof document === 'undefined') {
    return { x: 50, y: 50, scale: 1, rotate: 0, opacity: 1, blur: 0 };
  }

  const currentDocHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  
  if (!cachedWaypoints || Math.abs(lastDocHeight - currentDocHeight) > 100) {
    lastDocHeight = currentDocHeight;
    const scrollable = currentDocHeight - windowHeight > 0 ? currentDocHeight - windowHeight : 1;

    const widthFactor = isMobile ? 0.8 : 1.3; // Increased base scale by 30% for desktop

    // Helper functions to get accurate scroll trigger points
    const getPointTopHitsBottom = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return 0.5;
      return Math.max(0, Math.min(1, (el.offsetTop - windowHeight) / scrollable));
    };

    const getP = (selector, centerRatio = 0.5) => {
      const el = document.querySelector(selector);
      if (!el) return 0.5;
      const targetScrollY = el.offsetTop + (el.offsetHeight * centerRatio) - (windowHeight * centerRatio);
      return Math.max(0, Math.min(1, targetScrollY / scrollable));
    };

    cachedWaypoints = [
      // Hero Start (0%): Hidden below the screen on the right side
      { p: 0.00, x: isMobile ? 80 : 75, y: 150, scale: 0.9 * widthFactor, rotate: -8, opacity: 0, blur: 5 },
      
      // Right before About section enters from bottom: still hidden, ready to fly up
      { p: getPointTopHitsBottom('#cau-chuyen'), x: isMobile ? 80 : 75, y: 150, scale: 0.9 * widthFactor, rotate: -8, opacity: 0, blur: 2 },
      
      // About Section centered: Fly up into the right card
      { p: getP('#cau-chuyen', 0.5), x: isMobile ? 50 : 75, y: 55, scale: 0.9 * widthFactor, rotate: 15, opacity: 1.0, blur: 0 },
      
      // Ingredients Section (enters from top or whatever)
      { p: getP('#nguyen-lieu', 0.2), x: isMobile ? 80 : 50, y: 10, scale: 0.5 * widthFactor, rotate: 180, opacity: 0.8, blur: 2 },
      
      // Variants Section
      { p: getP('#huong-vi', 0.5), x: isMobile ? 20 : 75, y: 40, scale: 0.85 * widthFactor, rotate: -5, opacity: 1.0, blur: 0 },
      
      // How To Drink Section
      { p: getP('.how-to-drink-section', 0.5), x: isMobile ? 80 : 15, y: 60, scale: 0.6 * widthFactor, rotate: 25, opacity: 0.8, blur: 0 },
      
      // Gallery Section
      { p: getP('.gallery-section', 0.5), x: isMobile ? 20 : 80, y: 20, scale: 0.5 * widthFactor, rotate: -45, opacity: 0.5, blur: 3 },
      
      // CTA Section
      { p: 1.00, x: 50, y: 35, scale: 1.4 * widthFactor, rotate: 0, opacity: 1.0, blur: 0 }
    ];

    cachedWaypoints.sort((a, b) => a.p - b.p);
    
    // De-duplicate exactly equal or overlapping `p` preventing NaN division
    for (let i = 1; i < cachedWaypoints.length; i++) {
      if (cachedWaypoints[i].p <= cachedWaypoints[i-1].p) {
        cachedWaypoints[i].p = cachedWaypoints[i-1].p + 0.001; 
      }
    }
  }

  const p = Math.max(0, Math.min(1, scrollProgress));
  
  let startIndex = 0;
  let endIndex = 1;
  
  for (let i = 0; i < cachedWaypoints.length - 1; i++) {
    if (p >= cachedWaypoints[i].p && p <= cachedWaypoints[i+1].p) {
      startIndex = i;
      endIndex = i + 1;
      break;
    }
  }
  
  const start = cachedWaypoints[startIndex];
  const end = cachedWaypoints[endIndex];
  
  const segmentDuration = end.p - start.p;
  const segmentProgress = segmentDuration > 0 ? (p - start.p) / segmentDuration : 1;
  const eased = easeInOutQuad(segmentProgress);
  
  return {
    x: lerp(start.x, end.x, eased),
    y: lerp(start.y, end.y, eased),
    scale: lerp(start.scale, end.scale, eased),
    rotate: lerp(start.rotate, end.rotate, eased),
    opacity: lerp(start.opacity, end.opacity, eased),
    blur: lerp(start.blur, end.blur, eased),
  };
}
