// src/components/common/Button.jsx
import './Button.css';

export function Button({ 
  children, 
  variant = 'default', 
  size = 'medium', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}