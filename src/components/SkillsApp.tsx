import React from 'react';


interface SkillsAppProps {
  skillsData: { category: string; items: string[] }[];
}

const SkillsApp: React.FC<SkillsAppProps> = ({ skillsData }) => {
  return (
    <div className="skills-app-content">
      <h2>My Skills</h2>
      {skillsData.map((category, index) => (
        <div key={index} className="skill-category">
          <h3>{category.category}</h3>
          {category.items.map((skill, skillIndex) => (
            <div key={skillIndex} className="skill-item">
              <span>{skill}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkillsApp;