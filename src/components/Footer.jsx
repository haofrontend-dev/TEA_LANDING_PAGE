import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="noise-overlay"></div>
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <h2 className="display-text footer-brand">TRASUA</h2>
          <p>Tinh hoa trà Việt truyền thống, pha trộn cùng nghệ thuật thưởng thức hiện đại. Đem đến trải nghiệm trọn vẹn từ nguyên liệu đến cảm xúc.</p>
        </div>
        <div className="footer-col links-col">
          <h4>Khám Phá</h4>
          <a href="#huong-vi">Hương Vị</a>
          <a href="#nguyen-lieu">Nguyên Liệu</a>
          <a href="#cau-chuyen">Câu Chuyện</a>
          <a href="#mua-ngay">Đặt Hàng</a>
        </div>
        <div className="footer-col social-col">
          <h4>Kết Nối</h4>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Tiktok</a>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} TRASUA Brand. All rights reserved.</p>
        <p className="design-credit" style={{ opacity: 0.5, fontSize: '0.8rem' }}>Designed with luxury in mind.</p>
      </div>
    </footer>
  );
}
