import React, { useState } from 'react';
import Notification from './Notification';

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);
  
  // Exposição do método para adicionar notificações através de uma função global
  window.showNotification = (type, message, duration = 5000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message, duration }]);
    return id;
  };
  
  // Exposição do método para remover notificações
  window.removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };
  
  const handleClose = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };
  
  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
          onClose={() => handleClose(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationManager;