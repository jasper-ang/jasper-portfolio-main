// src/components/Projects.tsx
'use client';

import React, { useState } from 'react';
import useToggle from '../hooks/useToggle';

const Projects: React.FC = () => {
  const [activeButton, setActiveButton] = useState('website');
  const [showDetails, toggleDetails] = useToggle();

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <div id="projects" className="text-[#c9d1d9] bg-[#0d1117] p-8">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="button-group flex space-x-4 mb-6">
        {['website', 'Aquila'].map(project => (
          <button
            key={project}
            className={`py-2 px-4 rounded ${
              activeButton === project
                ? 'bg-[#58a6ff] text-white'
                : 'bg-[#30363d] text-[#c9d1d9] hover:bg-[#1f6feb]'
            } transition-colors`}
            onClick={() => handleButtonClick(project)}
          >
            {project.charAt(0).toUpperCase() + project.slice(1)}
          </button>
        ))}
      </div>
      <div className="details-section mb-6">
        {activeButton === 'website' ? (
          <div>
            <p>This is the website project description.</p>
            <br />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis porro a cumque culpa
              recusandae ab, aliquid cum saepe tempora laboriosam consectetur aperiam ad.
              Perferendis quam magnam illum sequi, praesentium culpa?
            </p>
            <br />
          </div>
        ) : (
          <div>
            <p>This is the Aquila project description.</p>
            <br />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis porro a cumque culpa
              recusandae ab, aliquid cum saepe tempora laboriosam consectetur aperiam ad.
              Perferendis quam magnam illum sequi, praesentium culpa?
            </p>
            <br />
          </div>
        )}
      </div>
      <button
        onClick={toggleDetails}
        className="bg-[#58a6ff] hover:bg-[#1f6feb] py-2 px-4 rounded mb-4 text-white transition-colors"
      >
        {showDetails ? 'Hide Details ▽' : 'Show Details ▷'}
      </button>
      {showDetails && (
        <div className="details-content p-4 border border-[#30363d] rounded bg-[#161b22]">
          <p>Here are some additional details about the project.</p>
          {/* Add more detailed content here */}
        </div>
      )}
    </div>
  );
};

export default Projects;
