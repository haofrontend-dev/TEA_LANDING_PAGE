import React, { useRef } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import './VariantsSection.css';

const variants = [
  { id: 1, name: 'Ô Long Sữa Cháy', notes: 'Khét nhẹ, Đậm vị trà, Thơm béo', tags: ['Ô Long', 'Đường Đen', 'Sữa Tươi'], img: '/olong.png' },
  { id: 2, name: 'Hồng Trà Sữa Đan', notes: 'Vị mộc mạc, ngọt thanh, trân Châu dẻo', tags: ['Trà Đen', 'Trân Châu', 'Sữa Đặc'], img: '/hongtra.png' },
  { id: 3, name: 'Trà Sữa Lài Xanh', notes: 'Thơm hoa lài, dịu mát, trân châu trắng', tags: ['Hoa Lài', 'Trà Xanh', 'Sữa Tươi'], img: '/traxanh.png' },
  { id: 4, name: 'Sữa Tươi Trân Châu', notes: 'Béo ngậy, đường nâu thơm, mềm dẻo', tags: ['Đường Nâu', 'Sữa Tươi', 'Trân Châu'], img: '/suatuoi.png' },
];

function VariantCard({ variant, isActive, dynamicStyle }) {
  return (
    <div className={`variant-card ${isActive ? 'active' : ''}`} style={dynamicStyle}>
      <div className="card-image">
        <img src={variant.img} alt={variant.name} />
      </div>
      <div className="card-detail-wrapper">
        <div className="card-content">
          <h3 className="display-text">{variant.name}</h3>
          <p className="notes">{variant.notes}</p>
          <div className="tags">
            {variant.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VariantsSection() {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);

  const totalCards = variants.length;
  // Make the scroll range map to 0 -> totalCards (0 -> 4), so it hits index 3 at 75% progress.
  // Then cap it at 3 (totalCards - 1) so it stays perfectly centered.
  const currentIndexFloat = Math.min(totalCards - 1, progress * totalCards);
  const activeIndex = Math.round(currentIndexFloat);

  const cardWidth = 350; 
  const gap = 60; // Approximate gap
  const trackTranslate = -(currentIndexFloat * (cardWidth + gap));

  return (
    <section 
      ref={containerRef} 
      className="variants-section section" 
      id="huong-vi"
    >
      <div className="variants-sticky-container">
        <div className="variants-header text-center">
          <h2 className="display-text section-title">Bản Sắc Cổ Điển</h2>
          <p className="section-subtitle">Khám phá bốn dòng trà pha chế thủ công</p>
        </div>
        
        <div className="carousel-viewport">
          <div 
            className="carousel-track" 
            style={{ 
              transform: `translateX(${trackTranslate}px) translateZ(0)`
            }}
          >
            {variants.map((v, index) => {
              const distance = index - currentIndexFloat;
              const isStrictlyActive = Math.abs(distance) < 0.3;
              
              // 3D Math Coverflow
              // Cards on the left (distance < 0) rotate right (positive Y).
              // Cards on the right (distance > 0) rotate left (negative Y).
              const rotateY = Math.max(-50, Math.min(50, -distance * 45));
              const translateZ = -Math.abs(distance) * 250;
              const scale = Math.max(0.7, 1 - Math.abs(distance) * 0.1);
              const opacity = Math.max(0.3, 1 - Math.abs(distance) * 0.6);
              const zIndex = 20 - Math.round(Math.abs(distance) * 10);
              
              const dynamicStyle = {
                transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex
              };

              return (
                <VariantCard 
                  key={v.id} 
                  variant={v} 
                  isActive={isStrictlyActive} 
                  dynamicStyle={dynamicStyle}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
