import React, { useState } from 'react';


interface ProjectsAppProps {
  projectsData: { name: string; description: string; link: string }[];
}

const ProjectsApp: React.FC<ProjectsAppProps> = ({ projectsData }) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const handleProjectClick = (projectId: string) => {
    setExpandedProject(prev => (prev === projectId ? null : projectId));
  };

  return (
    <div className="projects-app-content">
      <h2>My Projects</h2>
      {projectsData.map((project, index) => (
        <div 
          key={project.name} 
          className={`project-item ${expandedProject === project.name ? 'expanded' : ''}`}
          onClick={() => handleProjectClick(project.name)}
        >
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          {expandedProject === project.name && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View Project on GitHub</a>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectsApp;