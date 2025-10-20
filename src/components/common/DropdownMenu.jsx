// // src/components/common/DropdownMenu.jsx
// import { createContext, useContext, useState, useRef, useEffect, cloneElement } from 'react';
// import './DropdownMenu.css';

// const DropdownContext = createContext();

// export function DropdownMenu({ children }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
//       <div className="dropdown-menu" ref={dropdownRef}>
//         {children}
//       </div>
//     </DropdownContext.Provider>
//   );
// }

// export function DropdownMenuTrigger({ asChild, children }) {
//   const { setIsOpen, isOpen } = useContext(DropdownContext);

//   const handleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   if (asChild) {
//     return React.cloneElement(children, { onClick: handleClick });
//   }

//   return (
//     <button onClick={handleClick}>
//       {children}
//     </button>
//   );
// }

// export function DropdownMenuContent({ align = 'start', children, className = '' }) {
//   const { isOpen } = useContext(DropdownContext);

//   if (!isOpen) return null;

//   const alignment = {
//     start: 'left-0',
//     end: 'right-0',
//     center: 'left-1/2 transform -translate-x-1/2'
//   };

//   return (
//     <div className={`dropdown-content ${alignment[align]} ${className}`}>
//       {children}
//     </div>
//   );
// }

// export function DropdownMenuItem({ children, onClick, className = '' }) {
//   const { setIsOpen } = useContext(DropdownContext);

//   const handleClick = () => {
//     onClick?.();
//     setIsOpen(false);
//   };

//   return (
//     <div className={`dropdown-item ${className}`} onClick={handleClick}>
//       {children}
//     </div>
//   );
// }

// export function DropdownMenuLabel({ children, className = '' }) {
//   return (
//     <div className={`dropdown-label ${className}`}>
//       {children}
//     </div>
//   );
// }

// export function DropdownMenuSeparator({ className = '' }) {
//   return (
//     <hr className={`dropdown-separator ${className}`} />
//   );
// }

// // Assign the child components to DropdownMenu
// DropdownMenu.Trigger = DropdownMenuTrigger;
// DropdownMenu.Content = DropdownMenuContent;
// DropdownMenu.Item = DropdownMenuItem;
// DropdownMenu.Label = DropdownMenuLabel;
// DropdownMenu.Separator = DropdownMenuSeparator;

// src/components/common/DropdownMenu.jsx
import { createContext, useContext, useState, useRef, useEffect, cloneElement } from 'react';
import './DropdownMenu.css';

const DropdownContext = createContext();

export function DropdownMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="dropdown-menu" ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children }) {
  const { setIsOpen, isOpen } = useContext(DropdownContext);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (asChild) {
    return cloneElement(children, { onClick: handleClick });
  }

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({ align = 'start', children, className = '' }) {
  const { isOpen } = useContext(DropdownContext);

  if (!isOpen) return null;

  const alignment = {
    start: 'left-0',
    end: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };

  return (
    <div className={`dropdown-content ${alignment[align]} ${className}`}>
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, onClick, className = '' }) {
  const { setIsOpen } = useContext(DropdownContext);

  const handleClick = () => {
    onClick?.();
    setIsOpen(false);
  };

  return (
    <div className={`dropdown-item ${className}`} onClick={handleClick}>
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ children, className = '' }) {
  return (
    <div className={`dropdown-label ${className}`}>
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className = '' }) {
  return (
    <hr className={`dropdown-separator ${className}`} />
  );
}

// Assign the child components to DropdownMenu
DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Label = DropdownMenuLabel;
DropdownMenu.Separator = DropdownMenuSeparator;