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
    <div className="landing-container">
      <div className="landing-content">

        {/* Left Column: About Me & Choices */}
        <div className="landing-left-column">
          <div className="about-me-container">
            <h2 className="large-text highlight about-me-header">About Me</h2>
            <p className="info-text about-me-text">{bio}</p>
          </div>
          <div className="choice-container">
            <div className="landing-box" onClick={() => onSelectView('cli')}>
              <h1 className="bold-text">CLI</h1>
              <p className="small-text">Command Line Interface</p>
            </div>
            <div className="landing-box" onClick={() => onSelectView('gui')}>
              <h1 className="bold-text">GUI</h1>
              <p className="small-text">Graphical User Interface</p>
            </div>
          </div>
        </div>

        {/* Right Column: Wakatime Chart Gallery */}
        <div className="landing-right-column">
          <div className="chart-gallery">
            {charts.map((chart, index) => (
              <img
                key={index}
                src={chart}
                alt={`Wakatime Chart ${index + 1}`}
                className="chart-image"
                style={{
                  transform: `translateX(${(index - currentChartIndex) * 100}%)`
                }}
              />
            ))}
          </div>
          <div className="chart-buttons">
            <button onClick={prevChart}>Prev</button>
            <button onClick={nextChart}>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
