import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  shadow = 'md',
  padding = 'md',
  onClick,
  style,
  ...props
}) => {
  const classes = `${styles.card} ${styles[`shadow-${shadow}`]} ${styles[`padding-${padding}`]} ${
    hover ? styles.hover : ''
  } ${onClick ? styles.clickable : ''} ${className}`;

  return (
    <div className={classes} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} style={style} {...props}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`${styles.header} ${className}`}>{children}</div>
);

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '', ...props }) => (
  <div className={`${styles.body} ${className}`} {...props}>{children}</div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`${styles.footer} ${className}`}>{children}</div>
);

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, className = '' }) => (
  <div className={`${styles.imageContainer} ${className}`}>
    <img src={src} alt={alt} className={styles.image} />
  </div>
);
