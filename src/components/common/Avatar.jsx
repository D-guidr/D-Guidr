// src/components/profile/Avatar.jsx
import './Avatar.css';

export function Avatar({ src, fallback, size = 'medium', className = '' }) {
  const sizeClasses = {
    xsmall: 'w-6 h-6',
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  return (
    <div className={`avatar ${sizeClasses[size]} ${className}`}>
      {src ? (
        <img src={src} alt="Avatar" className="avatar-image" />
      ) : (
        <span className="avatar-fallback">{fallback}</span>
      )}
    </div>
  );
}