import { useScrollReveal, useStaggerReveal } from '../hooks/useAnimations';
import './Education.css';

const education = [
  {
    institution: 'Lovely Professional University',
    degree: 'Bachelor of Technology – Computer Science and Engineering',
    grade: 'CGPA: 6.5',
    period: '2023 – Present',
  },
  {
    institution: 'Kamala Prasad Singh S.S. School, Bihar',
    degree: 'Intermediate',
    grade: '62.8%',
    period: '2019 – 2021',
  },
  {
    institution: 'D.A.V. Public School, Bihar',
    degree: 'Matriculation',
    grade: '85.8%',
    period: '2018 – 2019',
  },
];

export default function Education() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [timelineRef, visibleItems] = useStaggerReveal(education.length, 200);

  return (
    <section className="section" id="education">
      <div className="container">
        <div
          className={`section-header${headerVisible ? ' revealed' : ''}`}
          ref={headerRef}
        >
          <p className="section-label">Background</p>
          <h2 className="section-title">
            <span>Education</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="education-timeline" ref={timelineRef}>
          {education.map((edu, i) => (
            <div
              className={`edu-item${visibleItems.has(i) ? ' revealed' : ''}`}
              key={edu.institution}
            >
              <div className="edu-dot">
                <div className="edu-dot-ring" />
              </div>
              <div className="edu-card">
                <span className="edu-period">{edu.period}</span>
                <h3 className="edu-institution">{edu.institution}</h3>
                <p className="edu-degree">{edu.degree}</p>
                <p className="edu-grade">{edu.grade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
