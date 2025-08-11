import React from 'react';

interface IconProps {
  id: string;
  title: string;
  content: any;
  onOpen: (id: string, title: string, content: any) => void;
}

const Icon: React.FC<IconProps> = ({ id, title, content, onOpen }) => {
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
    <div className="icon" onClick={() => onOpen(id, title, content)}>
      <div className="icon-image">{getIcon()}</div>
      <p>{title}</p>
    </div>
  );
};

export default Icon;