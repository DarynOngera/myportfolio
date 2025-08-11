import React from 'react';

interface IconProps {
  id: string;
  title: string;
  onOpen: (id: string, title: string) => void;
}

const Icon: React.FC<IconProps> = ({ id, title, onOpen }) => {
  const getIcon = () => {
    switch (id) {
      case 'about':
        return 'ℹ️';
      case 'projects':
        return '📁';
      case 'skills':
        return '🛠️';
      case 'contact':
        return '📧';
      default:
        return '📄';
    }
  };

  return (
    <div className="icon" onClick={() => onOpen(id, title)}>
      <div className="icon-image">{getIcon()}</div>
      <p>{title}</p>
    </div>
  );
};

export default Icon;