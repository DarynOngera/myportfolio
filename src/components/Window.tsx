import React, { useState, useRef } from 'react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-mail">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

interface WindowProps {
  id: string;
  title: string;
  content: any;
  onClose: (id: string) => void;
  closing?: boolean;
}

const Window: React.FC<WindowProps> = ({ id, title, content, onClose, closing }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
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
    setIsResizing(true);
    resizeStartPos.current = {
      x: e.clientX - size.width,
      y: e.clientY - size.height,
    };
  };

  return (
    <div
      className={`window ${closing ? 'window-exit' : ''}`}
      style={{ top: position.y, left: position.x, width: size.width, height: size.height }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="title-bar" onMouseDown={handleMouseDown}>
        <div className="title">{title}</div>
        <div className="window-buttons">
          <div className="window-button">-</div>
          <div className="window-button">[]</div>
          <div className="close-button" onClick={() => onClose(id)}>X</div>
        </div>
      </div>
      <div className="content">
        {Array.isArray(content) ? (
          content.map((item, index) => {
            if (typeof item === 'string') {
              return <p key={index}>{item}</p>;
            } else if (item.name) {
              return (
                <div key={index}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
              );
            } else if (item.type === 'email') {
              return (
                <p key={index}>
                  <EmailIcon />: <a href={`mailto:${item.value}`} target="_blank" rel="noopener noreferrer">{item.value}</a>
                </p>
              );
            } else if (item.type === 'github') {
              return (
                <p key={index}>
                  <GithubIcon />: <a href={`https://github.com/${item.value}`} target="_blank" rel="noopener noreferrer">{item.value}</a>
                </p>
              );
            }
            return null;
          })
        ) : (
          <p>{content}</p>
        )}
      </div>
      <div className="resize-handle" onMouseDown={handleResizeMouseDown}></div>
    </div>
  );
};

export default Window;