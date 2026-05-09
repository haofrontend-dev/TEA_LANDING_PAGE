import { useState, useEffect, useRef } from 'react';
import { loadSequenceImages } from '../utils/sequenceLoader';

// Global cache outside of the hook to persist across mounts/unmounts
const sequenceCache = {};

export function useFrameSequence(folderPath, frameCount) {
  const [images, setImages] = useState(() => sequenceCache[folderPath] || []);
  const [loaded, setLoaded] = useState(!!sequenceCache[folderPath]);

  useEffect(() => {
    let isMounted = true;
    
    if (sequenceCache[folderPath]) {
      // Already cached
      return;
    }

    setLoaded(false);
    loadSequenceImages(folderPath, frameCount).then(loadedImages => {
      if (isMounted) {
        sequenceCache[folderPath] = loadedImages;
        setImages(loadedImages);
        setLoaded(true);
      }
    });

    return () => { isMounted = false; };
  }, [folderPath, frameCount]);

  const getFrame = (progress) => {
    if (!loaded || images.length === 0) return null;
    let index = Math.floor(progress * (frameCount - 1));
    index = Math.max(0, Math.min(index, frameCount - 1));
    return images[index];
  };

  return { images, loaded, getFrame };
}
