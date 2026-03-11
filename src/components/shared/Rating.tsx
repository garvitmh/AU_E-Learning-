import React from 'react';
import styles from './Rating.module.css';

export interface RatingProps {
  value: number; // 0-5
  max?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  onChange,
  readOnly = true,
  size = 'md',
  showText = false,
  className = '',
}) => {
  const [hoverValue, setHoverValue] = React.useState(0);
  const displayValue = hoverValue || value;

  const handleClick = (index: number) => {
    if (!readOnly && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className={`${styles.container} ${styles[`size-${size}`]} ${className}`}>
      <div className={styles.stars}>
        {Array.from({ length: max }).map((_, index) => (
          <button
            key={index}
            className={`${styles.star} ${index < displayValue ? styles.filled : ''}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => !readOnly && setHoverValue(index + 1)}
            onMouseLeave={() => setHoverValue(0)}
            disabled={readOnly}
            type="button"
            aria-label={`Rate ${index + 1} out of ${max}`}
          >
            ★
          </button>
        ))}
      </div>
      {showText && (
        <span className={styles.text}>
          {displayValue > 0 ? `${displayValue.toFixed(1)}/${max}` : 'Rate this'}
        </span>
      )}
    </div>
  );
};

export interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  count,
  size = 'md',
  className = '',
}) => {
  return (
    <div className={`${styles.starRatingContainer} ${className}`}>
      <div className={`${styles.starRatingStars} ${styles[`size-${size}`]}`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={`${styles.starRatingStar} ${index < Math.floor(rating) ? styles.filled : ''}`}
          >
            ★
          </span>
        ))}
      </div>
      {count && <span className={styles.ratingCount}>({count})</span>}
    </div>
  );
};
