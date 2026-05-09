import React, { useRef, useState, useEffect } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useFrameSequence } from '../hooks/useFrameSequence';
import './HeroSection.css';

const FRAME_COUNT = 120; 
const SCROLL_SPEED = 25; 

export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const progress = useScrollProgress(containerRef);
  
  const { images, loaded, getFrame } = useFrameSequence('/sequence_1', FRAME_COUNT);
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

  const heroScale = progress > 0.85 ? 1 - (progress - 0.85) * 0.4 : 1;

  let textOpacity = 1;
  if (progress > 0.7) {
    textOpacity = 1 - (progress - 0.7) * (1 / 0.15);
  }
  textOpacity = Math.max(0, Math.min(1, textOpacity));

  return (
    <section 
      ref={containerRef} 
      className="hero-section" 
      style={{ height: `calc(${FRAME_COUNT * SCROLL_SPEED}px + 100vh)` }}
    >
      <div className="sticky-container">
        
        <div style={{
          width: '100%', height: '100%',
          transform: `scale(${heroScale})`,
          transformOrigin: 'center bottom',
          transition: 'transform 0.1s ease-out'
        }}>
          <canvas ref={canvasRef} className="sequence-canvas" />
          
          {!loaded && (
            <div className="sequence-loading">
              <div className="spinner"></div>
              <p>Đang chuẩn bị trải nghiệm...</p>
            </div>
          )}

          <div className="hero-text-overlay" style={{ pointerEvents: textOpacity > 0.5 ? 'auto' : 'none' }}>
            
            <div className="hero-layout-grid" style={{ opacity: textOpacity, transform: `translateY(${progress * -150}px)` }}>
              
              <div className="hero-col-left">
                <h1 className="hero-giant-text">
                  Chúng tôi là<br />
                  Tuyệt Tác
                </h1>
                
                <div className="hero-left-bottom">
                  <h3 className="hero-medium-text">
                    Niềm tự hào<br/>hương vị trà Việt
                  </h3>
                  <p className="hero-small-desc">
                    Mỗi giọt trà là một bản hòa ca kiêu hãnh của văn hóa bản địa. <br/>
                    Từ những đồi chè sương giăng của Đà Lạt đến tay bạn — <br/>
                    để bạn tập trung cảm nhận cuộc sống, trong khi chúng tôi tinh lọc từng lá trà.
                  </p>
                </div>
              </div>

              <div className="hero-col-right">
                <h1 className="hero-giant-text right-align" style={{ paddingRight: '2rem' }}>
                  Chúng tôi là<br />
                  Bản Sắc
                </h1>
              </div>

              <div className="hero-bottom-bar">
                <div className="hero-nav-left">CUỘN ĐỂ KHÁM PHÁ</div>
                <div className="hero-nav-center"></div>
                <div className="hero-nav-right">BẮT ĐẦU TRẢI NGHIỆM</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
