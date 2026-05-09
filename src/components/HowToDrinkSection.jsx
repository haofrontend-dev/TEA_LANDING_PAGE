import React, { useRef } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import './HowToDrinkSection.css';

const steps = [
  { id: 1, title: 'Lắc Đều', desc: 'Lắc nhẹ 3-5 lần để lớp sữa và trà quyện vào nhau, đánh thức hương vị trọn vẹn.' },
  { id: 2, title: 'Cảm Nhận', desc: 'Mở nắp và hít thở sâu hương thơm thanh khiết của trà được ủ kỹ.' },
  { id: 3, title: 'Thưởng Thức Mộc', desc: 'Uống một ngụm đầu tiên không kèm trân châu để cảm nhận vị chát nhẹ tinh tế.' },
  { id: 4, title: 'Trọn Vị', desc: 'Dùng ống hút thưởng thức trọn vẹn cùng trân châu nghệ nhân dẻo dai.' }
];

function StepItem({ step, index }) {
  const stepRef = useRef(null);
  const progress = useScrollProgress(stepRef); // 0 (enters bottom) to 1 (leaves top)
  const isEven = index % 2 !== 0;

  // Fade and slide text in as it reaches 20% of viewport
  const localProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.3)); 
  const isActive = progress > 0.35 && progress < 0.8;
  
  // Parallax effect for the massive background number
  const parallaxOffset = (0.5 - progress) * 200; 

  return (
    <div 
      className={`step-item ${isEven ? 'step-even' : 'step-odd'} ${isActive ? 'active' : ''}`}
      ref={stepRef}
    >
      <div 
        className="step-content"
        style={{
          opacity: localProgress,
          transform: `translateY(${(1 - localProgress) * 50}px)`
        }}
      >
        <h3 className="display-text"><span>{step.title}</span></h3>
        <p>{step.desc}</p>
      </div>
      <div 
        className="step-number accent-number"
        style={{
          transform: `translate(${isEven ? '-20%' : '20%'}, calc(-50% + ${parallaxOffset}px))`,
          opacity: localProgress * 0.3
        }}
      >
        0{step.id}
      </div>
      <div 
        className="step-dot"
        style={{
          transform: `translate(-50%, -50%) scale(${isActive ? 1.4 : 1})`,
          backgroundColor: isActive ? 'var(--color-caramel)' : 'var(--color-bg)',
          boxShadow: isActive ? '0 0 15px var(--color-caramel)' : 'none'
        }}
      ></div>
    </div>
  );
}

export default function HowToDrinkSection() {
  const sectionRef = useRef(null);
  const sectionProgress = useScrollProgress(sectionRef);

  // Line draws down dynamically based on section progress
  const lineDrawHeight = Math.max(0, Math.min(100, (sectionProgress - 0.1) * 120));

  return (
    <section ref={sectionRef} className="how-to-drink-section section">
      <div className="container">
        <h2 className="display-text section-title text-center">Nghệ Thuật Thưởng Thức</h2>
        <p className="section-subtitle text-center">Bốn bước để trọn vẹn hương vị</p>
        
        <div className="steps-container">
          <div className="steps-line"></div>
          <div 
            className="steps-line steps-line-active" 
            style={{ 
              height: `${lineDrawHeight}%`, 
              background: 'linear-gradient(to bottom, transparent, var(--color-caramel) 10%, var(--color-gold) 100%)',
              opacity: 1, 
              zIndex: 2,
              top: 0, 
              bottom: 'auto'
            }}
          ></div>
          {steps.map((step, idx) => (
            <StepItem key={step.id} step={step} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
