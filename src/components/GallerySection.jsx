import React, { useEffect, useRef } from 'react';
import './GallerySection.css';

const images = [
  { id: 1, src: '/nghe_nhan.png', title: 'Nghệ Nhân Lên Men', size: 'large' },
  { id: 2, src: '/thu_hoach.png', title: 'Thu Hoạch Sớm', size: 'small' },
  { id: 3, src: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=600', title: 'Sao Trà Thủ Công', size: 'medium' },
  { id: 4, src: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=600', title: 'Đậm Vị Nguyên Bản', size: 'small' },
  { id: 5, src: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600', title: 'Sữa Tươi Thượng Hạng', size: 'large' },
  { id: 6, src: '/bansac.png', title: 'Bản Sắc Việt', size: 'large' },
];

export default function GallerySection() {
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.gallery-item');
      items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="gallery-section section">
      <div className="container">
        <div className="gallery-grid" ref={gridRef}>
          {images.map(img => (
            <div key={img.id} className={`gallery-item ${img.size}`}>
              <img src={img.src} alt={img.title} />
              <div className="gallery-overlay">
                <h3 className="display-text">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
