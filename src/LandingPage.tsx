import React, { useState } from 'react';
import './index.css'; // Import index.css for the new classes
interface LandingPageProps {
  onSelectView: (view: 'cli' | 'gui') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectView }) => {
  const [bio] = useState<string>(
    "I am a Computer Science major at Strathmore University, deeply passionate about cybersecurity, distributed systems, software development, and AI/ML. Outside of academics, I'm an avid sportsman, actively involved in rugby and hitting the gym. My defining characteristic is grit; you could say it's my middle name."
  );

  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const charts = [
    "https://wakatime.com/share/@50b41ddf-bd05-4abf-9a01-63eeb1138150/cc39befd-e56e-4db1-ab5f-56922e06766b.svg",
    "https://wakatime.com/share/@50b41ddf-bd05-4abf-9a01-63eeb1138150/dab37ba9-1c88-4d48-b7db-2e03771b4838.svg",
    "https://wakatime.com/share/@50b41ddf-bd05-4abf-9a01-63eeb1138150/52ced3c5-4b30-4ec3-91f4-5af93a04042a.svg"
  ];

  const nextChart = () => {
    setCurrentChartIndex((prevIndex) => (prevIndex + 1) % charts.length);
  };

  const prevChart = () => {
    setCurrentChartIndex((prevIndex) => (prevIndex - 1 + charts.length) % charts.length);
  };

  return (
    <div className="landing-container" style={{ backgroundColor: '#1a1a1a', color: '#d9d9d9', fontFamily: "'Noto Sans', sans-serif", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px', boxSizing: 'border-box', overflow: 'hidden' }}>
      <div className="landing-content">

        {/* Left Column: About Me & Choices */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '30px' }}>
            <h2 className="large-text highlight" style={{ marginBottom: '10px', fontSize: '2em', textAlign: 'left' }}>About Me</h2>
            <p className="info-text" style={{ lineHeight: '1.5', fontSize: '1em', textAlign: 'left' }}>{bio}</p>
          </div>
          <div className="choice-container" style={{ display: 'flex', justifyContent: 'flex-start', gap: '15px' }}>
            <div className="landing-box" onClick={() => onSelectView('cli')} style={{ width: '150px', height: '150px', border: '2px solid #007ACC', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s ease', color: '#d9d9d9' }}>
              <h1 className="bold-text" style={{ fontSize: '2em', margin: '0' }}>CLI</h1>
              <p className="small-text" style={{ fontSize: '0.9em', margin: '8px 0 0 0', textAlign: 'center' }}>Command Line Interface</p>
            </div>
            <div className="landing-box" onClick={() => onSelectView('gui')} style={{ width: '150px', height: '150px', border: '2px solid #007ACC', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s ease', color: '#d9d9d9' }}>
              <h1 className="bold-text" style={{ fontSize: '2em', margin: '0' }}>GUI</h1>
              <p className="small-text" style={{ fontSize: '0.9em', margin: '8px 0 0 0', textAlign: 'center' }}>Graphical User Interface</p>
            </div>
          </div>
        </div>

        {/* Right Column: Wakatime Chart Gallery */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ width: '100%', overflow: 'hidden', position: 'relative', height: '400px' }}>
            {charts.map((chart, index) => (
              <img
                key={index}
                src={chart}
                alt={`Wakatime Chart ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transition: 'transform 0.5s ease-in-out',
                  transform: `translateX(${(index - currentChartIndex) * 100}%)`
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <button onClick={prevChart} style={{ background: 'none', border: '1px solid #007ACC', color: '#d9d9d9', padding: '10px 20px', cursor: 'pointer' }}>Prev</button>
            <button onClick={nextChart} style={{ background: 'none', border: '1px solid #007ACC', color: '#d9d9d9', padding: '10px 20px', cursor: 'pointer' }}>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
