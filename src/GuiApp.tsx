import React, { useState } from 'react';
import Window from './components/Window';
import Icon from './components/Icon';
import Taskbar from './components/Taskbar';
import data from './data.json';
import wallpaper from './components/wallpaper.jpg';

interface GuiAppProps {
  onBack: () => void;
}

const GuiApp: React.FC<GuiAppProps> = ({ onBack }) => {
  const [windows, setWindows] = useState<any[]>([]);

  const openWindow = (id: string, title: string, content: any) => {
    setWindows(prevWindows => {
      if (prevWindows.find(w => w.id === id)) {
        return prevWindows;
      }
      return [...prevWindows, { id, title, content }];
    });
  };

  const closeWindow = (id: string) => {
    setWindows(prevWindows =>
      prevWindows.map(w => (w.id === id ? { ...w, closing: true } : w))
    );

    setTimeout(() => {
      setWindows(prevWindows => prevWindows.filter(w => w.id !== id));
    }, 300);
  };

  return (
    <div className="gui-desktop" style={{ backgroundImage: `url(${wallpaper})` }}>
      <div className="icons">
        <Icon id="about" title="About" onOpen={openWindow} content={data.about} />
        <Icon id="projects" title="Projects" onOpen={openWindow} content={data.projects} />
        <Icon id="skills" title="Skills" onOpen={openWindow} content={data.skills} />
        <Icon id="contact" title="Contact" onOpen={openWindow} content={data.contact} />
      </div>
      {windows.map(w => (
        <Window key={w.id} id={w.id} title={w.title} content={w.content} onClose={closeWindow} />
      ))}
      <Taskbar onBack={onBack} />
    </div>
  );
};

export default GuiApp;
