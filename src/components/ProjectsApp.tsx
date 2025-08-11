import React from 'react';


interface ProjectsAppProps {
  projectsData: { name: string; description: string; link: string }[];
}

const ProjectsApp: React.FC<ProjectsAppProps> = ({ projectsData }) => {
  return (
    <div className="projects-app-content">
      <h2>My Projects</h2>
      {projectsData.map((project, index) => (
        <div key={index} className="project-item">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
      ))}
    </div>
  );
};

export default ProjectsApp;