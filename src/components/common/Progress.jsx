// src/components/common/Progress.jsx
import './Progress.css';

export function Progress({ value, className = '' }) {
  return (
    <div className={`progress ${className}`}>
      <div 
        className="progress-bar" 
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}