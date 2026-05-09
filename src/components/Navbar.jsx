import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container container">
        <div className="nav-logo display-text">LA SOIE</div>
        <div className="nav-links">
          <a href="#huong-vi">Hương Vị</a>
          <a href="#nguyen-lieu">Nguyên Liệu</a>
          <a href="#cau-chuyen">Câu Chuyện</a>
          <a href="#mua-ngay" className="btn-primary">Mua Ngay</a>
        </div>
        <div className="nav-lang">
          <span className="active">VI</span> / <span>EN</span>
        </div>
      </div>
    </nav>
  );
}
