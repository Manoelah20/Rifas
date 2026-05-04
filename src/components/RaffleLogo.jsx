import React from 'react';

const RaffleLogo = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    lg: 'w-16 h-16'
  };

  return (
    <svg
      className={`${sizeClasses[size]} text-primary-600`}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Ticket shape */}
      <path d="M20 25 C20 20, 25 15, 30 15 L70 15 C75 15, 80 20, 80 25 L80 35 C75 35, 70 40, 70 45 C70 50, 75 55, 80 55 L80 75 C80 80, 75 85, 70 85 L30 85 C25 85, 20 80, 20 75 L20 55 C25 55, 30 50, 30 45 C30 40, 25 35, 20 35 Z" />

      {/* Ticket perforation dots */}
      <circle cx="15" cy="45" r="3" fill="currentColor" />
      <circle cx="85" cy="45" r="3" fill="currentColor" />

      {/* Raffle numbers inside ticket */}
      <text x="50" y="45" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
        07
      </text>
      <text x="50" y="60" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
        25
      </text>
      <text x="50" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
        48
      </text>

      {/* Sparkle effects */}
      <path d="M30 10 L32 8 L34 10 L32 12 Z" fill="#fbbf24" />
      <path d="M66 10 L68 8 L70 10 L68 12 Z" fill="#fbbf24" />
      <path d="M25 90 L27 88 L29 90 L27 92 Z" fill="#fbbf24" />
      <path d="M71 90 L73 88 L75 90 L73 92 Z" fill="#fbbf24" />
    </svg>
  );
};

export default RaffleLogo;
