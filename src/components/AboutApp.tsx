import React from 'react';


interface AboutAppProps {
  aboutData: string[];
}

const AboutApp: React.FC<AboutAppProps> = ({ aboutData }) => {
  return (
    <div className="about-app-content">
      <h2>About Me</h2>
      {aboutData.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

export default AboutApp;