import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onSelectView: (view: 'cli' | 'gui') => void;
}

const bootSequence = [
  'Initializing boot sequence...',
  'Loading kernel modules...',
  'Mounting filesystems...',
  'Starting services...',
  'Welcome to Gemini OS',
  '',
  'Please select an interface:',
];

const LandingPage: React.FC<LandingPageProps> = ({ onSelectView }) => {
  const [booting, setBooting] = useState(true);
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    const boot = async () => {
      for (let i = 0; i < bootSequence.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setOutput((prevOutput) => [...prevOutput, bootSequence[i]]);
      }
      setBooting(false);
    };
    boot();
  }, []);

  return (
    <div className="landing-container">
      <div className="boot-screen">
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        {!booting && (
          <div className="choice-container">
            <div className="landing-box" onClick={() => onSelectView('cli')}>
              <h1>CLI</h1>
              <p>Command Line Interface</p>
            </div>
            <div className="landing-box" onClick={() => onSelectView('gui')}>
              <h1>GUI</h1>
              <p>Graphical User Interface</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
