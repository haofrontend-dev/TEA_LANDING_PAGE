import React, { useState } from 'react';
import BookingModal from './BookingModal';
import './GlobalOrderButton.css';

export default function GlobalOrderButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="global-order-wrapper">
        <button className="global-book-btn" onClick={() => setIsModalOpen(true)}>
          Đặt Trà Ngay 
          <span className="book-icon">&#8594;</span>
        </button>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
