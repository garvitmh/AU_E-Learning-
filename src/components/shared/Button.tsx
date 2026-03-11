import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = 'left',
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClass = `${styles.button} ${styles[`variant-${variant}`]} ${styles[`size-${size}`]}`;
    const fullWidthClass = fullWidth ? styles.fullWidth : '';
    const disabledClass = disabled || loading ? styles.disabled : '';
    const finalClassName = `${baseClass} ${fullWidthClass} ${disabledClass} ${className}`;

    return (
      <button
        ref={ref}
        className={finalClassName}
        disabled={disabled || loading}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className={styles.icon}>{icon}</span>
        )}
        {loading ? (
          <span className={styles.loaderSpinner} />
        ) : (
          children
        )}
        {icon && iconPosition === 'right' && (
          <span className={styles.icon}>{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
