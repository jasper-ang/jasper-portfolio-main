'use client';

import React, { useState } from 'react';
import { projects } from './projectData';

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<keyof typeof projects>('website');
  const [showDetails, setShowDetails] = useState(false);

  const handleButtonClick = (project: keyof typeof projects) => {
    if (project !== activeProject) {
      setShowDetails(false);
    }
    setActiveProject(project);
  };

  return (
    <div id="projects" className="bg-base-200 text-base-content">
      <h2 className="mb-6 flex items-center text-3xl font-bold text-base-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-4 h-8 w-8"
        >
          <path d="M21 16.5v-9l-9-5-9 5v9l9 5 9-5zm-9-13.38l6.91 3.84L12 11.87l-6.91-3.41L12 3.12zM5 8.76l6.91 3.41v7.65l-6.91-3.83V8.76zm8.91 11.06v-7.65L20 8.76v7.32l-6.09 3.74z" />
        </svg>
        Projects
      </h2>
      <div className="button-group mb-6 flex space-x-4">
        {projects &&
          Object.keys(projects).map(project => (
            <button
              key={project}
              className={`!border-b-0.5 relative !my-2 p-4 ${activeProject === project ? '!border-primary !font-semibold' : '!border-transparent'}`}
              onClick={() => handleButtonClick(project as keyof typeof projects)}
            >
              {project.charAt(0).toUpperCase() + project.slice(1)}
              {activeProject === project && (
                <span className="absolute bottom-0 left-0 h-1 w-full bg-primary"></span>
              )}
            </button>
          ))}
      </div>
      <div className="details-section p-4">
        <div>
          <p>{projects[activeProject].title}</p>
          <br />
          <p>{projects[activeProject].description}</p>
          <br />
        </div>
      </div>
      <label className="mb-4 flex items-center px-4">
        <span className="mr-4 text-base-content">
          {showDetails ? 'Hide Details' : 'Show Details'}
        </span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={showDetails}
          onChange={() => setShowDetails(!showDetails)}
        />
      </label>

      {showDetails && (
        <div className="details-content rounded border border-neutral bg-base-100 p-4">
          {projects[activeProject].additionalDetails}
        </div>
      )}
    </div>
  );
};

export default Projects;
