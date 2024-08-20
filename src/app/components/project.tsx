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
    <div id="projects" className="bg-base-100 text-base-content p-8">
      <h2 className="mb-6 text-3xl font-bold">Projects</h2>
      <div className="button-group mb-6 flex space-x-4">
        {['website', 'Aquila'].map(project => (
          <button
            key={project}
            className={`btn btn-outline btn-primary ${
              activeButton === project ? '!bg-primary !text-primary-content' : ''
            }`}
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
      <button onClick={toggleDetails} className="btn btn-outline btn-primary mb-4">
        {showDetails ? 'Hide Details ▽' : 'Show Details ▷'}
      </button>
      {showDetails && (
        <div className="details-content border-neutral bg-neutral rounded border p-4">
          <p>Here are some additional details about the project.</p>
          {/* Add more detailed content here */}
        </div>
      )}
    </div>
  );
};

export default Projects;
