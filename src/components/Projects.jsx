import { FaGithub } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import { useScrollReveal, useMouseTilt } from '../hooks/useAnimations';
import './Projects.css';

const projects = [
  {
    title: 'Crash Reporting Data Analysis',
    description:
      'Performed exploratory data analysis on crash reporting datasets to identify accident patterns, contributing factors, and risk indicators. Used data cleaning, statistical analysis, and visualization to highlight trends and insights.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'EDA'],
    github: 'https://github.com/RitikRaushan314/Crash-Reporting-Data-Analysis',
  },
  {
    title: 'Car Accident Analysis Dashboard',
    description:
      'Developed an interactive accident analysis dashboard using Excel to identify high-risk areas, peak accident times, and severity trends through charts, pivot tables, and slicers.',
    tech: ['Excel', 'Pivot Tables', 'Data Visualization', 'Dashboard'],
    github:
      'https://github.com/RitikRaushan314/Car-Accident-Analysis-Dashboard',
  },
];

function ProjectCard({ proj, index }) {
  const tiltRef = useMouseTilt(10);
  const [revealRef, isVisible] = useScrollReveal();

  return (
    <div
      className={`project-card${isVisible ? ' revealed' : ''}`}
      ref={(el) => {
        tiltRef.current = el;
        revealRef.current = el;
      }}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="project-card-glow" />
      <span className="project-number">Project 0{index + 1}</span>
      <h3 className="project-title">{proj.title}</h3>
      <p className="project-desc">{proj.description}</p>
      <div className="project-tech">
        {proj.tech.map((t) => (
          <span className="project-tech-tag" key={t}>
            {t}
          </span>
        ))}
      </div>
      <a
        className="project-link"
        href={proj.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub /> View on GitHub <HiArrowRight />
      </a>
    </div>
  );
}

export default function Projects() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="section" id="projects">
      <div className="container">
        <div
          className={`section-header${headerVisible ? ' revealed' : ''}`}
          ref={headerRef}
        >
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="projects-grid">
          {projects.map((proj, i) => (
            <ProjectCard key={proj.title} proj={proj} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
