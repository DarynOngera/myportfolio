import React, { useState, useEffect, useRef } from 'react';

interface LandingPageProps {
  onSelectView: (view: 'cli' | 'gui') => void;
}

const bootSequence = [
  'Initializing secure connection...',
  'Authenticating user credentials...',
  'Loading portfolio modules...',
  'Establishing data streams...',
  'Compiling developer environment...',
  'Welcome to Daryn Ongera\'s Portfolio',
];

const LandingPage: React.FC<LandingPageProps> = ({ onSelectView }) => {
  const [booting, setBooting] = useState(true);
  const [output, setOutput] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const bootInitiated = useRef(false);

  useEffect(() => {
    if (!bootInitiated.current) {
      bootInitiated.current = true;
      const boot = async () => {
        for (let i = 0; i < bootSequence.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 300));
          setOutput((prevOutput) => [...prevOutput, bootSequence[i]]);
          setProgress(Math.min(((i + 1) / bootSequence.length) * 100, 100));
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Pause after boot sequence
        setBooting(false);
      };
      boot();
    }
  }, []);

  return (
    <div className="landing-container">
      <div className="boot-screen">
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        {booting && output.length > 0 && (
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        )}
        {!booting && (
          <div className="post-boot-message">
            <p>Please select an interface:</p>
            <div className="choice-container">
              <div className="landing-box" onClick={() => onSelectView('cli')}>
                <h1>CLI</h1>
                <p>Launch Command Line Interface</p>
              </div>
              <div className="landing-box" onClick={() => onSelectView('gui')}>
                <h1>GUI</h1>
                <p>Explore Graphical User Interface</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
