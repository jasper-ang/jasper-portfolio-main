import useTechSVG, { TechItem } from '../hooks/useTechSVG';
import { FC, useState } from 'react';

type SectionName = 'frontend' | 'backend' | 'devtools' | null;

const TechIcons: FC = () => {
  const { frontend, backend, devtools } = useTechSVG();
  const [openSection, setOpenSection] = useState<SectionName>('frontend');

  const toggleSection = (sectionName: SectionName) => {
    setOpenSection(prev => (prev === sectionName ? null : sectionName));
  };

  const svgIcons = (techStack: TechItem[], isOpen: boolean): JSX.Element[] => {
    return techStack.map(tech => (
      <div
        key={tech.name}
        className="m-2 flex flex-col items-center space-y-2 rounded-xl border-base-100 p-6 shadow-lg hover:bg-base-100 sm:p-4"
      >
        <div className="text-sm">{tech.icon}</div>
        <p className="text-xs">{tech.name}</p>
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="collapse collapse-arrow rounded-box border-base-300 bg-base-300">
        <input
          type="checkbox"
          checked={openSection === 'frontend'}
          onChange={() => toggleSection('frontend')}
        />
        <div
          className={`collapse-title text-base font-semibold ${
            openSection === 'frontend' ? 'bg-base-100 text-base-content' : ''
          }`}
        >
          Frontend
        </div>
        <div
          className={`collapse-content mt-4 grid grid-cols-4 gap-4 sm:grid-cols-2 ${
            openSection === 'frontend' ? 'block' : 'hidden'
          }`}
        >
          {svgIcons(frontend, openSection === 'frontend')}
        </div>
      </div>

      <div className="collapse collapse-arrow rounded-box border-base-300 bg-base-300">
        <input
          type="checkbox"
          checked={openSection === 'backend'}
          onChange={() => toggleSection('backend')}
        />
        <div
          className={`collapse-title text-base font-semibold ${
            openSection === 'backend' ? 'bg-base-100 text-base-content' : ''
          }`}
        >
          Backend
        </div>
        <div
          className={`collapse-content mt-4 grid grid-cols-4 gap-4 sm:grid-cols-2 ${
            openSection === 'backend' ? 'block' : 'hidden'
          }`}
        >
          {svgIcons(backend, openSection === 'backend')}
        </div>
      </div>

      <div className="collapse collapse-arrow rounded-box border-base-300 bg-base-300">
        <input
          type="checkbox"
          checked={openSection === 'devtools'}
          onChange={() => toggleSection('devtools')}
        />
        <div
          className={`collapse-title text-base font-semibold ${
            openSection === 'devtools' ? 'bg-base-100 text-base-content' : ''
          }`}
        >
          DevTools
        </div>
        <div
          className={`collapse-content mt-4 grid grid-cols-4 gap-4 sm:grid-cols-2 ${
            openSection === 'devtools' ? 'block' : 'hidden'
          }`}
        >
          {svgIcons(devtools, openSection === 'devtools')}
        </div>
      </div>
    </div>
  );
};

export default TechIcons;
