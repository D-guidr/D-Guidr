// src/components/common/Separator.jsx
import './Separator.css';

export function Separator({ className = '', orientation = 'horizontal' }) {
  return (
    <div className={`separator ${orientation} ${className}`} />
  );
}