import type { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  variant?: 'default' | 'game' | 'package' | 'payment';
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const Card = ({
  variant = 'default',
  selected = false,
  disabled = false,
  onClick,
  children,
  className = '',
}: CardProps) => {
  const classes = [
    'card',
    `card--${variant}`,
    selected && 'card--selected',
    disabled && 'card--disabled',
    onClick && 'card--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      onClick={!disabled ? onClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    >
      {children}
      {selected && <div className="card-selected-indicator" />}
    </div>
  );
};

export default Card;
