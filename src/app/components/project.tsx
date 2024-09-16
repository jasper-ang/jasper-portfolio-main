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
    <div id="projects" className="py-6 text-base-content">
      <div className="mb-12">
        <h2 className="flex items-center text-3xl font-bold text-base-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            fill="currentColor"
            className="ml-4 mr-8 h-8 w-8 bg-base-300 text-base-300 shadow-glowSecondary"
          >
            <path d="M19.732 7.203V4.537h-7.464v2.666H3.205v20.259h25.59V7.203zm-6.398-1.599h5.331v1.599h-5.331zM12.268 8.27h15.461v8.53h-7.997v-2.133h-7.464V16.8H4.271V8.27zm6.398 7.463v3.199h-5.331v-3.199zM4.271 26.396v-8.53h7.997v2.133h7.464v-2.133h7.997v8.53z" />
          </svg>
          Projects
        </h2>
      </div>

      <div className="rounded-xl bg-base-100 px-4 py-6 shadow-lg">
        <div className="button-group mb-6 flex space-x-4">
          {projects &&
            Object.keys(projects).map(project => (
              <button
                key={project}
                className={`relative !my-2 !border-b p-4 ${
                  activeProject === project
                    ? 'border-b-[0.5px] !border-secondary !font-semibold'
                    : '!border-transparent border-b-[px]'
                }`}
                onClick={() => handleButtonClick(project as keyof typeof projects)}
              >
                {project.charAt(0).toUpperCase() + project.slice(1)}
                {activeProject === project && (
                  <span className="absolute bottom-0 left-0 h-1 w-full bg-secondary"></span>
                )}
              </button>
            ))}
        </div>

        <div className="details-section px-2 py-4">
          <div className="relative min-h-full w-full">
            <p className="pb-4 font-semibold">{projects[activeProject].title}</p>
            <br />
            <div dangerouslySetInnerHTML={{ __html: projects[activeProject].description }} />
            <br />
          </div>
        </div>

        <label className="mb-8 flex items-center px-2">
          <span className="mr-4 text-base-content">
            {showDetails ? 'Hide Details' : 'Show Details'}
          </span>
          <input
            type="checkbox"
            className="toggle toggle-secondary"
            checked={showDetails}
            onChange={() => setShowDetails(!showDetails)}
          />
        </label>

        {showDetails && (
          <div className="details-content rounded border border-neutral bg-base-100 p-4 shadow-glowNeutral">
            <div dangerouslySetInnerHTML={{ __html: projects[activeProject].additionalDetails }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
