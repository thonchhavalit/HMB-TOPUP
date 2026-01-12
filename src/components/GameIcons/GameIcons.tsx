import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// Mobile Legends Icon
export const MLIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="ml-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="100%" stopColor="#0066ff" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#ml-grad)" />
    <path d="M16 14L24 10L32 14V24L24 34L16 24V14Z" fill="#fff" opacity="0.9"/>
    <path d="M24 18L28 21V27L24 30L20 27V21L24 18Z" fill="#00d4ff"/>
    <circle cx="24" cy="24" r="3" fill="#fff"/>
  </svg>
);

// Free Fire Icon
export const FFIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="ff-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff9500" />
        <stop offset="100%" stopColor="#ff4500" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#ff-grad)" />
    <path d="M18 32V20L24 14L30 20V32H26V24H22V32H18Z" fill="#fff" opacity="0.95"/>
    <path d="M22 18L24 16L26 18L24 20L22 18Z" fill="#ffcc00"/>
    <circle cx="24" cy="28" r="2" fill="#ff4500"/>
  </svg>
);

// PUBG Mobile Icon
export const PUBGIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="pubg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffd700" />
        <stop offset="100%" stopColor="#ff8c00" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#pubg-grad)" />
    <ellipse cx="24" cy="18" rx="8" ry="6" fill="#1a1a1a" opacity="0.9"/>
    <ellipse cx="24" cy="17" rx="6" ry="4" fill="#333"/>
    <path d="M16 24C16 24 18 32 24 32C30 32 32 24 32 24" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
    <rect x="22" y="20" width="4" height="6" rx="1" fill="#1a1a1a"/>
  </svg>
);

// Genshin Impact Icon
export const GenshinIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="genshin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#genshin-grad)" />
    <path d="M24 10L28 18H36L30 24L32 32L24 28L16 32L18 24L12 18H20L24 10Z" fill="#fff" opacity="0.95"/>
    <circle cx="24" cy="22" r="4" fill="#a855f7"/>
  </svg>
);

// Valorant Icon
export const ValorantIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="val-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff4655" />
        <stop offset="100%" stopColor="#bd3944" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#val-grad)" />
    <path d="M14 14L24 34L26 30L18 14H14Z" fill="#fff" opacity="0.95"/>
    <path d="M22 14L32 34L34 30L26 14H22Z" fill="#fff" opacity="0.95"/>
    <rect x="23" y="24" width="2" height="8" fill="#fff"/>
  </svg>
);

// Call of Duty Icon
export const CODIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="cod-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ff88" />
        <stop offset="100%" stopColor="#00cc66" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#cod-grad)" />
    <rect x="14" y="22" width="20" height="4" rx="1" fill="#1a1a1a" opacity="0.9"/>
    <rect x="20" y="16" width="8" height="16" rx="1" fill="#1a1a1a" opacity="0.9"/>
    <circle cx="24" cy="24" r="3" fill="#00ff88"/>
    <circle cx="24" cy="24" r="1.5" fill="#1a1a1a"/>
  </svg>
);

// Diamond Icon (for top-up)
export const DiamondIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="diamond-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="50%" stopColor="#ff2d78" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <filter id="diamond-glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <path 
      d="M24 6L38 18L24 42L10 18L24 6Z" 
      fill="url(#diamond-grad)" 
      filter="url(#diamond-glow)"
    />
    <path d="M24 6L10 18H38L24 6Z" fill="#fff" opacity="0.4"/>
    <path d="M24 6L18 18L24 42L30 18L24 6Z" fill="#fff" opacity="0.2"/>
  </svg>
);

// UC/Coin Icon
export const UCIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="uc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffd700" />
        <stop offset="100%" stopColor="#ff8c00" />
      </linearGradient>
      <filter id="coin-shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
      </filter>
    </defs>
    <ellipse cx="24" cy="26" rx="18" ry="16" fill="#cc9900" />
    <ellipse cx="24" cy="22" rx="18" ry="16" fill="url(#uc-grad)" filter="url(#coin-shadow)"/>
    <ellipse cx="24" cy="22" rx="14" ry="12" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5"/>
    <text x="24" y="27" textAnchor="middle" fill="#8B4513" fontSize="14" fontWeight="bold" fontFamily="Arial">UC</text>
  </svg>
);

// Lightning/Fast Icon
export const LightningIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="lightning-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff2d78" />
        <stop offset="100%" stopColor="#ff6b9d" />
      </linearGradient>
    </defs>
    <path 
      d="M13 2L4 14H11L10 22L20 10H13L13 2Z" 
      fill="url(#lightning-grad)"
    />
  </svg>
);

// Game icon mapping
export const GameIconMap: Record<string, React.FC<IconProps>> = {
  'ml': MLIcon,
  'mobile-legends': MLIcon,
  'ff': FFIcon,
  'free-fire': FFIcon,
  'pubg': PUBGIcon,
  'pubg-mobile': PUBGIcon,
  'genshin': GenshinIcon,
  'genshin-impact': GenshinIcon,
  'valorant': ValorantIcon,
  'cod': CODIcon,
  'call-of-duty': CODIcon,
};

export const getGameIcon = (gameId: string): React.FC<IconProps> => {
  return GameIconMap[gameId.toLowerCase()] || MLIcon;
};
