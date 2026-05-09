import React, { useRef, useEffect } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useFrameSequence } from '../hooks/useFrameSequence';
import './IngredientsSection.css';

const FRAME_COUNT = 120; 
const SCROLL_SPEED = 25; 

export default function IngredientsSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const progress = useScrollProgress(containerRef);
  const { images, loaded, getFrame } = useFrameSequence('/sequence_2', FRAME_COUNT);

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
  
  const getCardStyle = (targetProgress) => {
    const dist = progress - targetProgress;
    let opacity = 0;
    if (Math.abs(dist) < 0.15) {
      opacity = 1 - Math.abs(dist) * (1 / 0.15); 
    }
    const yOffset = -dist * 600; 
    
    return {
      opacity: opacity.toFixed(3),
      transform: `translateY(calc(-50% + ${yOffset}px))`,
      pointerEvents: opacity > 0.5 ? 'auto' : 'none'
    };
  };

  return (
    <section 
      ref={containerRef} 
      className="ingredients-section section" 
      id="nguyen-lieu"
      style={{ height: `${FRAME_COUNT * SCROLL_SPEED}px` }}
    >
      <div className="sticky-container">
        <canvas ref={canvasRef} className="sequence-canvas" />
        
        {!loaded && (
          <div className="sequence-loading">
            <div className="spinner"></div>
            <p>Đang chuẩn bị nguyên liệu...</p>
          </div>
        )}

        <div className="ingredients-cinematic-overlay">
          <div className="ingredient-block block-left" style={getCardStyle(0.2)}>
            <span className="accent-number large-num">01</span>
            <div className="ing-content">
              <h3 className="display-text ing-title">Hồng Trà<br/>Đỉnh Núi</h3>
              <p>Thu hoạch bằng tay tại độ cao 1500m. Chắt lọc những búp trà non đẫm sương mai, mang theo hương vị chát nhẹ tinh tế và hậu ngọt kéo dài bất tận.</p>
            </div>
          </div>

          <div className="ingredient-block block-right" style={getCardStyle(0.4)}>
            <span className="accent-number large-num">02</span>
            <div className="ing-content">
              <h3 className="display-text ing-title">Sữa Tươi<br/>Thanh Trùng</h3>
              <p>Không bột béo công nghiệp. Chỉ sử dụng 100% dòng sữa tươi nguyên bản được vắt trong ngày, giữ trọn độ ngậy thơm tự nhiên hoàn hảo nhất.</p>
            </div>
          </div>

          <div className="ingredient-block block-left" style={getCardStyle(0.6)}>
            <span className="accent-number large-num">03</span>
            <div className="ing-content">
              <h3 className="display-text ing-title">Đường Nâu<br/>Thủ Công</h3>
              <p>Ninh trên lửa chậm suốt 12 giờ đồng hồ tạo nên chất siro caramel kẹo cháy đặc trưng. Mật đường hòa quyện mượt mà, không quá ngọt gắt.</p>
            </div>
          </div>

          <div className="ingredient-block block-right" style={getCardStyle(0.8)}>
            <span className="accent-number large-num">04</span>
            <div className="ing-content">
              <h3 className="display-text ing-title">Trân Châu<br/>Nghệ Nhân</h3>
              <p>Nhào nặn thủ công từ tinh bột khoai mì nguyên chất. Luộc và ủ kỹ với đường đen tạo nên từng viên trân châu dẻo dai, thấm đẫm hương vị thời gian.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
