import {
  HiOutlineChartBar,
  HiOutlineDatabase,
  HiOutlineLightBulb,
} from 'react-icons/hi';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { useCountUp, useScrollReveal } from '../hooks/useAnimations';
import './StatsStrip.css';

const stats = [
  { icon: <HiOutlineDatabase />, target: 5, suffix: '+', label: 'Datasets Analyzed' },
  { icon: <HiOutlineChartBar />, target: 3, suffix: '+', label: 'Dashboards Built' },
  { icon: <HiOutlineTrophy />, target: 50, suffix: '+', label: 'LeetCode Problems' },
  { icon: <HiOutlineLightBulb />, target: 6, suffix: '+', label: 'Tools Mastered' },
];

function StatCard({ stat, index }) {
  const [ref, count] = useCountUp(stat.target, 1800 + index * 200);
  const [revealRef, isVisible] = useScrollReveal();

  return (
    <div
      className={`stat-card${isVisible ? ' revealed' : ''}`}
      ref={(el) => {
        ref.current = el;
        revealRef.current = el;
      }}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-number">
        {count}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
      <div className="stat-glow" />
    </div>
  );
}

export default function StatsStrip() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="stats-strip section" id="stats">
      <div className="container">
        <div
          className={`section-header${headerVisible ? ' revealed' : ''}`}
          ref={headerRef}
        >
          <p className="section-label">At a Glance</p>
          <h2 className="section-title">
            Key <span>Metrics</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
