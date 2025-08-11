import React, { useState } from 'react';
import LandingPage from './LandingPage';
import CliApp from './CliApp';
import GuiApp from './GuiApp';
import './GuiApp.css';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'cli' | 'gui'>('landing');

  const handleSelectView = (selectedView: 'cli' | 'gui') => {
    setView(selectedView);
  };

  const handleBack = () => {
    setView('landing');
  };

  if (view === 'landing') {
    return <LandingPage onSelectView={handleSelectView} />;
  }

  if (view === 'cli') {
    return <CliApp />;
  }

  if (view === 'gui') {
    return <GuiApp onBack={handleBack} />;
  }

  return null;
};

export default App;