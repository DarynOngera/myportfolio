import React from 'react';

interface StartMenuProps {
  onBack: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onBack }) => {
  return (
    <div className="start-menu">
      <ul>
        <li onClick={onBack}>Back to Boot Menu</li>
        <li>Shutdown</li>
      </ul>
    </div>
  );
};

export default StartMenu;
