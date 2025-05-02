import React, { useState, useEffect } from 'react';
import '../../styles/UI/Notification.css';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Notification = ({ type = 'info', message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const icons = {
    success: <FaCheckCircle />,
    error: <FaExclamationTriangle />,
    info: <FaInfoCircle />,
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose && onClose(), 300); // Após a animação de saída
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  return (
    <div className={`notification notification-${type} ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="notification-icon">
        {icons[type]}
      </div>
      <div className="notification-message">{message}</div>
      <button className="notification-close" onClick={() => setIsVisible(false)}>
        <FaTimes />
      </button>
    </div>
  );
};

export default Notification;