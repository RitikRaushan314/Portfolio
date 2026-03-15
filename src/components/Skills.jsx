import {
  HiOutlineCode,
  HiOutlineChartBar,
  HiOutlineDatabase,
  HiOutlineCog,
  HiOutlineLightBulb,
} from 'react-icons/hi';
import { useStaggerReveal, useScrollReveal } from '../hooks/useAnimations';
import './Skills.css';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <HiOutlineCode />,
    skills: ['Python', 'C', 'C++', 'Java', 'JavaScript'],
  },
  {
    title: 'Data & Analysis',
    icon: <HiOutlineChartBar />,
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-Learn'],
  },
  {
    title: 'Data Tools',
    icon: <HiOutlineDatabase />,
    skills: ['Excel', 'Power BI', 'Tableau', 'MySQL'],
  },
  {
    title: 'Other Tools',
    icon: <HiOutlineCog />,
    skills: ['GitHub', 'HTML', 'CSS'],
  },
  {
    title: 'Soft Skills',
    icon: <HiOutlineLightBulb />,
    skills: ['Problem Solving', 'Discipline', 'Active Listening', 'Hardworking'],
  },
];

export default function Skills() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [gridRef, visibleItems] = useStaggerReveal(skillCategories.length, 120);

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <div
          className={`section-header${headerVisible ? ' revealed' : ''}`}
          ref={headerRef}
        >
          <p className="section-label">Expertise</p>
          <h2 className="section-title">
            Technical <span>Skills</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="skills-grid" ref={gridRef}>
          {skillCategories.map((cat, i) => (
            <div
              className={`skill-category${visibleItems.has(i) ? ' revealed' : ''}`}
              key={cat.title}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="skill-category-icon">{cat.icon}</div>
              <h3 className="skill-category-title">{cat.title}</h3>
              <div className="skill-tags">
                {cat.skills.map((skill, si) => (
                  <span
                    className="skill-tag"
                    key={skill}
                    style={{ animationDelay: `${si * 0.05}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
