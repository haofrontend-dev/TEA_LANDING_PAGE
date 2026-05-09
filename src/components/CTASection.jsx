import React, { useRef, useEffect } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useFrameSequence } from '../hooks/useFrameSequence';
import './CTASection.css';

const FRAME_COUNT = 120; 
const SCROLL_SPEED = 25; 

export default function CTASection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const progress = useScrollProgress(containerRef);
  const { images, loaded, getFrame } = useFrameSequence('/sequence_3', FRAME_COUNT);

  const currentFrame = getFrame(progress);

  useEffect(() => {
    if (loaded && currentFrame && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (canvas.width !== currentFrame.width || canvas.height !== currentFrame.height) {
        canvas.width = currentFrame.width || 1920;
        canvas.height = currentFrame.height || 1080;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(currentFrame, 0, 0, canvas.width, canvas.height);
    }
  }, [currentFrame, loaded]);

  return (
    <section 
      ref={containerRef} 
      className="cta-section section" 
      id="mua-ngay"
      style={{ height: `${FRAME_COUNT * SCROLL_SPEED}px` }}
    >
      <div className="sticky-container">
        <canvas ref={canvasRef} className="sequence-canvas" />
        
        {!loaded && (
          <div className="sequence-loading">
            <div className="spinner"></div>
            <p>Đang chuẩn bị...</p>
          </div>
        )}

        <div className="cta-overlay">
          <div className="cta-large-bg-text" style={{ 
            transform: `translate(-50%, -50%) scale(${1 + progress * 0.2})`, 
            opacity: progress > 0.8 ? Math.min(0.08, (progress - 0.8) * 0.5) : 0 
          }}>
            HOÀN HẢO
          </div>
          <div className="cta-content-wrapper" style={{ transform: `translateY(${(1 - progress) * 80}px)` }}>
            <div className="cta-typography-grid">
              <span className="cta-top-left serif-italic">Trải nghiệm</span>
              <div className="cta-main-title">
                <h2 className="display-text cta-brand">BẢN SẮC</h2>
                <div className="cta-line-decorator"></div>
                <h2 className="display-text cta-brand serif-italic cta-brand-alt">Đích Thực</h2>
              </div>
              <span className="cta-bottom-right">Của Hương Vị Mộc</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
