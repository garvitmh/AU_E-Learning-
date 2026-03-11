import { useEffect } from 'react';
import styles from './Toast.module.css';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

interface ToastProps {
  message: ToastMessage;
  onClose: (id: string) => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const duration = message.duration || 3000;
    const timer = setTimeout(() => {
      onClose(message.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  const icons: Record<string, string> = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  return (
    <div className={`${styles.toast} ${styles[message.type]}`}>
      <span className={styles.icon}>{icons[message.type]}</span>
      <p>{message.message}</p>
    </div>
  );
}
