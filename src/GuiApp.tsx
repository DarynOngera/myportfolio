import React, { useState } from 'react';
import Window from './components/Window';
import Icon from './components/Icon';
import Taskbar from './components/Taskbar';
import data from './data.json';
import wallpaper from './components/wallpaper.jpg';
import AboutApp from './components/AboutApp';
import ProjectsApp from './components/ProjectsApp';
import SkillsApp from './components/SkillsApp';
import ContactApp from './components/ContactApp';
import './components/AppStyles.css';

interface GuiAppProps {
  onBack: () => void;
}

const GuiApp: React.FC<GuiAppProps> = ({ onBack }) => {
  const [windows, setWindows] = useState<any[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1000);

  const openWindow = (id: string, title: string) => {
    setWindows(prevWindows => {
      if (prevWindows.find(w => w.id === id)) {
        focusWindow(id); // Bring existing window to front
        return prevWindows;
      }

      let appComponent = null;
      switch (id) {
        case 'about':
          appComponent = <AboutApp aboutData={data.about} />;
          break;
        case 'projects':
          appComponent = <ProjectsApp projectsData={data.projects} />;
          break;
        case 'skills':
          appComponent = <SkillsApp skillsData={data.skills} />;
          break;
        case 'contact':
          appComponent = <ContactApp contactData={data.contact} />;
          break;
        default:
          appComponent = <p>Application not found.</p>;
      }

      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);
      return [...prevWindows, { id, title, component: appComponent, zIndex: newZIndex }];
    });
  };

  const focusWindow = (id: string) => {
    setWindows(prevWindows => {
      const newMaxZIndex = maxZIndex + 1;
      setMaxZIndex(newMaxZIndex);
      return prevWindows.map(w =>
        w.id === id ? { ...w, zIndex: newMaxZIndex } : w
      );
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
        <Icon id="about" title="About" onOpen={openWindow} />
        <Icon id="projects" title="Projects" onOpen={openWindow} />
        <Icon id="skills" title="Skills" onOpen={openWindow} />
        <Icon id="contact" title="Contact" onOpen={openWindow} />
      </div>
      {windows.map(w => (
        <Window 
          key={w.id} 
          id={w.id} 
          title={w.title} 
          onClose={closeWindow} 
          closing={w.closing}
          zIndex={w.zIndex}
          onFocus={focusWindow}
        >
          {w.component}
        </Window>
      ))}
      <Taskbar onBack={onBack} />
    </div>
  );
};

export default GuiApp;
