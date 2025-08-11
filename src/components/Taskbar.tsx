import React, { useState, useEffect } from 'react';
import StartMenu from './StartMenu';

interface TaskbarProps {
  onBack: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ onBack }) => {
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="taskbar">
      <div className="start-button" onClick={() => setShowStartMenu(!showStartMenu)}>
        Start
      </div>
      {showStartMenu && <StartMenu onBack={onBack} />}
      <div className="clock">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Taskbar;