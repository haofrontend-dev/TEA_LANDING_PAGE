import React from 'react';
import './BookingModal.css';

export default function BookingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2 className="display-text">Thông Tin Đặt Hàng</h2>
        <p>Vui lòng nhập chi tiết để chúng tôi chuẩn bị những phần trà tuyệt vời nhất cho bạn.</p>
        
        <form className="booking-form" onSubmit={(e) => { 
            e.preventDefault(); 
            alert('Đặt hàng thành công! Chúng tôi sẽ liên hệ lại ngay.'); 
            onClose(); 
        }}>
          <div className="form-row">
            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nguyễn Văn A" required />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input type="tel" placeholder="0901234567" required />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label>Địa chỉ giao hàng (Tòa nhà, Đường, Quận, Thành phố)</label>
              <input type="text" placeholder="123 Đường Số 1, Quận 1, TP.HCM" required />
            </div>
            <div className="form-group" style={{ flex: 0.8 }}>
              <label>Số lượng (Chai)</label>
              <input type="number" min="1" max="100" defaultValue="1" required />
            </div>
          </div>
          
          <button type="submit" className="btn-primary submit-btn">Xác Nhận Đặt Ngay</button>
        </form>
      </div>
    </div>
  );
}
