import React, { useState, useRef } from 'react';

interface WindowProps {
  id: string;
  title: string;
  content: any;
  onClose: (id: string) => void;
}

const Window: React.FC<WindowProps> = ({ id, title, content, onClose }) => {
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
      className="window"
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
                  Email: <a href={`mailto:${item.value}`} target="_blank" rel="noopener noreferrer">{item.value}</a>
                </p>
              );
            } else if (item.type === 'github') {
              return (
                <p key={index}>
                  GitHub: <a href={`https://github.com/${item.value}`} target="_blank" rel="noopener noreferrer">{item.value}</a>
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