import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  icon,
  className = '',
}) => {
  const classes = `${styles.badge} ${styles[`variant-${variant}`]} ${styles[`size-${size}`]} ${
    rounded ? styles.rounded : ''
  } ${className}`;

  return (
    <span className={classes}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
};

export interface TagProps extends BadgeProps {
  onRemove?: (e: React.MouseEvent) => void;
}

export const Tag: React.FC<TagProps> = (props) => {
  const { onRemove, ...badgeProps } = props;

  return (
    <div className={styles.tagWrapper}>
      <Badge {...badgeProps} />
      {onRemove && (
        <button
          className={styles.removeButton}
          onClick={onRemove}
          aria-label="Remove tag"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};
