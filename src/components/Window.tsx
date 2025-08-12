import React, { useState, useRef } from 'react';

export const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
  </svg>
);

export const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-mail">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

interface WindowProps {
  id: string;
  title: string;
  onClose: (id: string) => void;
  closing?: boolean;
  zIndex: number;
  onFocus: (id: string) => void;
  children: React.ReactNode; // New prop for rendering content
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onRestore: (id: string) => void;
  isMinimized: boolean;
  isMaximized: boolean;
}

const Window: React.FC<WindowProps> = ({ id, title, onClose, closing, zIndex, onFocus, children, onMinimize, onMaximize, onRestore, isMinimized, isMaximized }) => {
  const isMobile = window.innerWidth < 768; // Define mobile breakpoint

  const [position, setPosition] = useState(() => ({
    x: isMobile ? 0 : 150,
    y: isMobile ? 0 : 100,
  }));
  const [size, setSize] = useState(() => ({
    width: isMobile ? window.innerWidth : 700,
    height: isMobile ? window.innerHeight - 40 : 500, // Account for taskbar
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const lastSize = useRef({ width: 0, height: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });

  // Initialize isMaximized based on screen size
  const [initialMaximized, setInitialMaximized] = useState(isMobile);

  // Effect to handle window resize for initial maximized state
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setInitialMaximized(true);
      } else {
        setInitialMaximized(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMinimized || isMobile) return; // Prevent dragging if maximized, minimized, or on mobile
    setIsDragging(true);
    onFocus(id); // Bring to front on drag start
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y,
      });
    }
    if (isResizing) {
      setSize({
        width: e.clientX - resizeStartPos.current.x,
        height: e.clientY - resizeStartPos.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMinimized || isMobile) return; // Prevent resizing if maximized, minimized, or on mobile
    setIsResizing(true);
    resizeStartPos.current = {
      x: e.clientX - size.width,
      y: e.clientY - size.height,
    };
  };

  const handleMinimizeClick = () => {
    onMinimize(id);
  };

  const handleMaximizeRestoreClick = () => {
    if (isMaximized) {
      onRestore(id);
      // Restore to last known size/position, or a default if not available
      setPosition(lastPosition.current.x ? lastPosition.current : { x: 150, y: 100 });
      setSize(lastSize.current.width ? lastSize.current : { width: 700, height: 500 });
    } else {
      lastPosition.current = position;
      lastSize.current = size;
      onMaximize(id);
      // Maximize to full screen, accounting for taskbar
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 40 }); // Assuming 40px taskbar
    }
  };

  let windowClassName = `window ${closing ? 'window-exit' : ''}`;
  if (isMinimized) windowClassName += ' minimized';
  if (isMaximized) windowClassName += ' maximized';

  return (
    <div
      className={windowClassName}
      style={{
        top: (isMaximized || initialMaximized) ? 0 : position.y,
        left: (isMaximized || initialMaximized) ? 0 : position.x,
        width: (isMaximized || initialMaximized) ? '100vw' : size.width,
        height: (isMaximized || initialMaximized) ? `calc(100vh - 40px)` : size.height, // Account for taskbar
        zIndex: zIndex,
        display: isMinimized ? 'none' : 'block' // Hide if minimized
      }}
      onMouseDown={() => onFocus(id)} // Bring to front on click
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="title-bar" onMouseDown={handleMouseDown}>
        <div className="title">{title}</div>
        <div className="window-buttons">
          <div className="window-button minimize" onClick={handleMinimizeClick}>-</div>
          <div className="window-button maximize" onClick={handleMaximizeRestoreClick}>{isMaximized ? '[]' : '□'}</div>
          <div className="close-button" onClick={() => onClose(id)}>X</div>
        </div>
      </div>
      <div className="content">
        {children}
      </div>
      {!isMaximized && !isMinimized && (
        <div className="resize-handle" onMouseDown={handleResizeMouseDown}></div>
      )}
    </div>
  );
};

export default Window;