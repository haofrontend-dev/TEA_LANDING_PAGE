import React, { useEffect, useRef, useState } from 'react';
import './AboutSection.css';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-section section" id="cau-chuyen">
      <div className="about-bg-quote display-text">Tinh Hoa</div>
      <div className="container about-container">
        <div className={`about-text ${isVisible ? 'visible' : ''}`}>
          <h2 className="display-text">Hương Vị Bản Sắc</h2>
          <p>
            Được chắt lọc từ những lá trà tươi ngon nhất vùng cao nguyên sương mù, trải qua quá trình sao tẩm thủ công truyền thống. Chúng tôi mang đến cho bạn không chỉ là một thức uống, mà là một trải nghiệm văn hóa trọn vẹn.
          </p>
          <button className="btn-outline">Khám Phá Câu Chuyện</button>
        </div>
        <div className={`about-image-wrapper ${isVisible ? 'visible' : ''}`}>
          <div className="about-image-inner">
            <img src="/gioithieu.jpeg" alt="Giới thiệu Trà Sữa" />
          </div>
        </div>
      </div>
    </section>
  );
}
