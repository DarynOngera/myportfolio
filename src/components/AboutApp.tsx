import React from 'react';


interface AboutAppProps {
  aboutData: string[];
}

const AboutApp: React.FC<AboutAppProps> = ({ aboutData }) => {
  return (
    <div className="about-app-content">
      <div className="about-app-background"></div>
      <div className="about-app-text-overlay">
        <h2>About Me</h2>
        {aboutData.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default AboutApp;