import React, { useRef, useEffect, useState } from 'react';
import styles from './Dropdown.module.css';

export interface DropdownItem {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  trigger: React.ReactNode;
  align?: 'left' | 'right';
  closeOnSelect?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  onSelect,
  trigger,
  align = 'left',
  closeOnSelect = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (item: DropdownItem) => {
    if (item.disabled) return;
    onSelect(item);
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>
      {isOpen && (
        <div className={`${styles.menu} ${styles[`align-${align}`]}`} ref={menuRef}>
          <div className={styles.itemsWrapper}>
            {items.map((item) => (
              <button
                key={item.value}
                className={`${styles.item} ${item.disabled ? styles.disabled : ''}`}
                onClick={() => handleSelect(item)}
                disabled={item.disabled}
                type="button"
              >
                {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                <span className={styles.itemLabel}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, helperText, options, fullWidth = false, className = '', disabled, ...props },
    ref
  ) => {
    const hasError = !!error;

    return (
      <div className={`${styles.selectContainer} ${fullWidth ? styles.fullWidth : ''}`}>
        {label && (
          <label className={styles.label} htmlFor={props.id}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            className={`${styles.selectInput} ${hasError ? styles.error : ''} ${
              disabled ? styles.disabled : ''
            } ${className}`}
            disabled={disabled}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.arrow}>▼</span>
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
