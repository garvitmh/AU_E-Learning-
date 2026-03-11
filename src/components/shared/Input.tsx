import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      size = 'md',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`}>
        {label && (
          <label className={styles.label} htmlFor={props.id}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={`${styles.inputWrapper} ${styles[`size-${size}`]}`}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            ref={ref}
            className={`${styles.input} ${hasError ? styles.error : ''} ${
              disabled ? styles.disabled : ''
            } ${className}`}
            disabled={disabled}
            {...props}
          />
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
