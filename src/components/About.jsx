import {
  HiOutlineChartPie,
  HiOutlineLightningBolt,
  HiOutlineDatabase,
  HiOutlineTerminal
} from 'react-icons/hi';
import { useScrollReveal, useStaggerReveal, useMouseTilt } from '../hooks/useAnimations';
import './About.css';

const highlights = [
  {
    title: 'Data Analysis',
    desc: 'Identifying trends and extracting actionable metrics.',
    icon: <HiOutlineChartPie />
  },
  {
    title: 'Visualizations',
    desc: 'Interactive dashboards that simplify complex data.',
    icon: <HiOutlineLightningBolt />
  },
  {
    title: 'Data Handling',
    desc: 'Structured analysis and efficient querying.',
    icon: <HiOutlineDatabase />
  },
  {
    title: 'Problem Solving',
    desc: 'Translating raw numbers into meaningful insights.',
    icon: <HiOutlineTerminal />
  }
];

function HighlightCard({ item, index, isVisible }) {
  const tiltRef = useMouseTilt(15);
  return (
    <div
      className={`about-highlight-card${isVisible ? ' revealed' : ''}`}
      ref={tiltRef}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="highlight-icon-wrap">{item.icon}</div>
      <h4>{item.title}</h4>
      <p>{item.desc}</p>
    </div>
  );
}

export default function About() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [textRef, textVisible] = useScrollReveal();
  const [gridRef, visibleItems] = useStaggerReveal(highlights.length, 150);

  return (
    <section className="about section" id="about">
      <div className="container">
        <div
          className={`section-header${headerVisible ? ' revealed' : ''}`}
          ref={headerRef}
        >
          <p className="section-label">Discover</p>
          <h2 className="section-title">
            About <span>Me</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="about-grid">
          {/* Text Content */}
          <div
            className={`about-text-column${textVisible ? ' revealed' : ''}`}
            ref={textRef}
          >
            <div className="about-text-box">
              <p>
                I am pursuing my B.Tech in Computer Science at Lovely Professional University,
                building practical expertise in data analysis through hands-on projects.
              </p>
              <p>
                I work with real-world datasets to create interactive dashboards and visualizations
                that simplify complex data and support informed decision-making. My approach emphasizes
                clean data handling, efficient querying, and structured analysis.
              </p>
              <p>
                Through my projects, I have developed the ability to identify trends, analyze data effectively,
                and present insights in a clear and impactful manner. I enjoy exploring data and translating it
                into meaningful insights.
              </p>
              <p>
                I am continuously improving my analytical skills and seeking opportunities to apply my knowledge
                and grow as a data analyst.
              </p>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="about-highlights-column" ref={gridRef}>
            {highlights.map((item, i) => (
              <HighlightCard
                key={item.title}
                item={item}
                index={i}
                isVisible={visibleItems.has(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
