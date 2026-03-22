import { useScrollReveal } from '../hooks/useAnimations';
import './About.css';

export default function About() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();

  return (
    <section className="about section" id="about">
      <div className="container about-container">
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

        <div
          className={`about-content${contentVisible ? ' revealed' : ''}`}
          ref={contentRef}
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
      </div>
    </section>
  );
}
