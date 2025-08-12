import React, { useState } from 'react';
import './index.css'; // Import index.css for the new classes
interface LandingPageProps {
  onSelectView: (view: 'cli' | 'gui') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectView }) => {
  const [bio] = useState<string>(
    "I am a Computer Science major at Strathmore University, deeply passionate about cybersecurity, distributed systems, software development, and AI/ML. Outside of academics, I'm an avid sportsman, actively involved in rugby and hitting the gym. My defining characteristic is grit; you could say it's my middle name."
  );

  return (
    <div className="landing-container" style={{ backgroundColor: '#1a1a1a', color: '#d9d9d9', fontFamily: "'Noto Sans', sans-serif", display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '10px', boxSizing: 'border-box' }}>
      <div className="boot-screen" style={{ width: '100%', display: 'flex', flexDirection: 'row', border: '2px solid #007ACC', borderRadius: '8px', overflow: 'hidden', height: '100%', flexGrow: 1, alignItems: 'stretch' }}>
        {/* Left Container (1/3 screen) */}
        <div style={{ flex: '1', padding: '10px', borderRight: '1px solid #007ACC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> {/* Changed justifyContent to center */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px 0' }}> {/* Reduced margin */}
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
              <h2 className="large-text highlight" style={{ marginBottom: '5px', fontSize: '1.2em' }}>About Me</h2> {/* Reduced font size and margin */}
              <p className="info-text" style={{ lineHeight: '1.4', fontSize: '0.8em' }}>{bio}</p> {/* Reduced font size and line height */}
            </div>
          </div>

          <div>
            <div className="choice-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}> {/* Reduced margin */}
              <div className="landing-box" onClick={() => onSelectView('cli')} style={{ width: '120px', height: '120px', border: '2px solid #007ACC', margin: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s ease', color: '#d9d9d9' }}> {/* Reduced size and margin */}
                <h1 className="bold-text" style={{ fontSize: '1.5em', margin: '0' }}>CLI</h1> {/* Reduced font size */}
                <p className="small-text" style={{ fontSize: '0.8em', margin: '5px 0 0 0' }}>Launch Command Line Interface</p> {/* Reduced font size */}
              </div>
              <div className="landing-box" onClick={() => onSelectView('gui')} style={{ width: '120px', height: '120px', border: '2px solid #007ACC', margin: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s ease', color: '#d9d9d9' }}> {/* Reduced size and margin */}
                <h1 className="bold-text" style={{ fontSize: '1.5em', margin: '0' }}>GUI</h1>
                <p className="small-text" style={{ fontSize: '0.8em', margin: '5px 0 0 0' }}>Explore Graphical User Interface</p> {/* Reduced font size */}
              </div>
            </div>
          </div>
        </div>

        {/* Right Container (2/3 screen) */}
        <div style={{ flex: '2', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2B2B2B', flexShrink: 0 }}>
          <img src="https://wakatime.com/share/@50b41ddf-bd05-4abf-9a01-63eeb1138150/cc39befd-e56e-4db1-ab5f-56922e06766b.svg" alt="Wakatime Languages Used" style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} />
          <img src="https://wakatime.com/share/@50b41ddf-bd05-4abf-9a01-63eeb1138150/dab37ba9-1c88-4d48-b7db-2e03771b4838.svg" alt="Wakatime Total Time Spent" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
