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
    sparkData: [20, 45, 35, 60, 50, 75, 65, 80, 70, 90, 85, 95],
  },
  {
    title: 'Car Accident Analysis Dashboard',
    description:
      'Developed an interactive accident analysis dashboard using Excel to identify high-risk areas, peak accident times, and severity trends through charts, pivot tables, and slicers.',
    tech: ['Excel', 'Pivot Tables', 'Data Visualization', 'Dashboard'],
    github:
      'https://github.com/RitikRaushan314/Car-Accident-Analysis-Dashboard',
    sparkData: [30, 25, 50, 40, 65, 55, 70, 80, 60, 85, 90, 78],
  },
];

function Sparkline({ data }) {
  const width = 120;
  const height = 40;
  const padding = 4;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((v - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const pathD = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((v - min) / range) * (height - padding * 2);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Area fill path
  const firstX = padding;
  const lastX = padding + (width - padding * 2);
  const areaD = `${pathD} L ${lastX} ${height} L ${firstX} ${height} Z`;

  return (
    <svg className="sparkline-svg" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(20, 184, 166, 0.3)" />
          <stop offset="100%" stopColor="rgba(20, 184, 166, 0)" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#sparkGradient)" className="sparkline-area" />
      <path d={pathD} fill="none" stroke="rgba(20, 184, 166, 0.6)" strokeWidth="1.5" className="sparkline-line" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={points} fill="none" stroke="none" />
    </svg>
  );
}

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
      <div className="project-card-header">
        <span className="project-number">Project 0{index + 1}</span>
        <div className="sparkline-wrap">
          <Sparkline data={proj.sparkData} />
        </div>
      </div>
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
