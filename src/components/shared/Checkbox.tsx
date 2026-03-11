import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const hasError = !!error;
    const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={styles.container}>
        <div className={styles.checkboxWrapper}>
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={`${styles.checkbox} ${hasError ? styles.error : ''} ${className}`}
            {...props}
          />
          <label htmlFor={inputId} className={styles.label}>
            <span className={styles.checkmark} />
            {label}
          </label>
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export interface CheckboxGroupProps {
  label?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  selectedValues?: string[];
  onChange?: (values: string[]) => void;
  error?: string;
  className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  selectedValues = [],
  onChange,
  error,
  className = '',
}) => {
  const handleChange = (value: string, checked: boolean) => {
    if (!onChange) return;

    const newValues = checked ? [...selectedValues, value] : selectedValues.filter((v) => v !== value);
    onChange(newValues);
  };

  return (
    <div className={`${styles.groupContainer} ${className}`}>
      {label && <label className={styles.groupLabel}>{label}</label>}
      <div className={styles.optionsWrapper}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            value={option.value}
            label={option.label}
            checked={selectedValues.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.currentTarget.checked)}
            disabled={option.disabled}
          />
        ))}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
