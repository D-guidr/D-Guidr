// // // src/components/common/Sheet.jsx
// // import { createContext, useContext, useState, React } from 'react';
// // import './Sheet.css';

// // const SheetContext = createContext();

// // export function Sheet({ children }) {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <SheetContext.Provider value={{ isOpen, setIsOpen }}>
// //       {children}
// //     </SheetContext.Provider>
// //   );
// // }

// // export function SheetTrigger({ asChild, children }) {
// //   const { setIsOpen } = useContext(SheetContext);

// //   const handleClick = () => {
// //     setIsOpen(true);
// //   };

// //   if (asChild && React.isValidElement(children)) {
// //     return React.cloneElement(children, { onClick: handleClick });
// //   }

// //   return (
// //     <button onClick={handleClick}>
// //       {children}
// //     </button>
// //   );
// // }

// // export function SheetContent({ side = 'left', children, className = '' }) {
// //   const { isOpen, setIsOpen } = useContext(SheetContext);

// //   if (!isOpen) return null;

// //   const sideClasses = {
// //     left: 'left-0',
// //     right: 'right-0',
// //     top: 'top-0',
// //     bottom: 'bottom-0'
// //   };

// //   return (
// //     <div className="sheet-overlay">
// //       <div className={`sheet-content ${sideClasses[side]} ${className}`}>
// //         {children}
// //       </div>
// //       <div className="sheet-backdrop" onClick={() => setIsOpen(false)} />
// //     </div>
// //   );
// // }

// // export function SheetHeader({ children, className = '' }) {
// //   return (
// //     <div className={`sheet-header ${className}`}>
// //       {children}
// //     </div>
// //   );
// // }

// // export function SheetTitle({ children, className = '' }) {
// //   return (
// //     <div className={`sheet-title ${className}`}>
// //       {children}
// //     </div>
// //   );
// // }

// // // Assign child components to Sheet
// // Sheet.Trigger = SheetTrigger;
// // Sheet.Content = SheetContent;
// // Sheet.Header = SheetHeader;
// // Sheet.Title = SheetTitle;

// // src/components/common/Sheet.jsx
// import { createContext, useContext, useState, React } from 'react';
// import './Sheet.css';

// const SheetContext = createContext();

// export function Sheet({ children }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <SheetContext.Provider value={{ isOpen, setIsOpen }}>
//       {children}
//     </SheetContext.Provider>
//   );
// }

// export function SheetTrigger({ asChild, children }) {
//   const { setIsOpen } = useContext(SheetContext);

//   const handleClick = () => {
//     setIsOpen(true);
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

// export function SheetContent({ side = 'left', children, className = '' }) {
//   const { isOpen, setIsOpen } = useContext(SheetContext);

//   if (!isOpen) return null;

//   const sideClasses = {
//     left: 'left-0',
//     right: 'right-0',
//     top: 'top-0',
//     bottom: 'bottom-0'
//   };

//   return (
//     <div className="sheet-overlay">
//       <div className={`sheet-content ${sideClasses[side]} ${className}`}>
//         {children}
//       </div>
//       <div className="sheet-backdrop" onClick={() => setIsOpen(false)} />
//     </div>
//   );
// }

// export function SheetHeader({ children, className = '' }) {
//   return (
//     <div className={`sheet-header ${className}`}>
//       {children}
//     </div>
//   );
// }

// export function SheetTitle({ children, className = '' }) {
//   return (
//     <div className={`sheet-title ${className}`}>
//       {children}
//     </div>
//   );
// }

// // Assign child components to Sheet
// Sheet.Trigger = SheetTrigger;
// Sheet.Content = SheetContent;
// Sheet.Header = SheetHeader;
// Sheet.Title = SheetTitle;

// src/components/common/Sheet.jsx
import { createContext, useContext, useState, cloneElement } from 'react';
import './Sheet.css';

const SheetContext = createContext();

export function Sheet({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SheetContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ asChild, children }) {
  const { setIsOpen } = useContext(SheetContext);

  const handleClick = () => {
    setIsOpen(true);
  };

  if (asChild) {
    // Use cloneElement directly from react import
    return cloneElement(children, { onClick: handleClick });
  }

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
}

export function SheetContent({ side = 'left', children, className = '' }) {
  const { isOpen, setIsOpen } = useContext(SheetContext);

  if (!isOpen) return null;

  const sideClasses = {
    left: 'left-0',
    right: 'right-0',
    top: 'top-0',
    bottom: 'bottom-0'
  };

  return (
    <div className="sheet-overlay">
      <div className={`sheet-content ${sideClasses[side]} ${className}`}>
        {children}
      </div>
      <div className="sheet-backdrop" onClick={() => setIsOpen(false)} />
    </div>
  );
}

export function SheetHeader({ children, className = '' }) {
  return (
    <div className={`sheet-header ${className}`}>
      {children}
    </div>
  );
}

export function SheetTitle({ children, className = '' }) {
  return (
    <div className={`sheet-title ${className}`}>
      {children}
    </div>
  );
}

// Assign child components to Sheet
Sheet.Trigger = SheetTrigger;
Sheet.Content = SheetContent;
Sheet.Header = SheetHeader;
Sheet.Title = SheetTitle;