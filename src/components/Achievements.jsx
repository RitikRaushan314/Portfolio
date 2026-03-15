import { HiOutlineTrophy } from 'react-icons/hi2';
import { useScrollReveal, useCountUp } from '../hooks/useAnimations';
import './Achievements.css';

export default function Achievements() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [cardRef, cardVisible] = useScrollReveal();
  const [counterRef, count] = useCountUp(50, 2000);

  return (
    <section className="achievements section" id="achievements">
      <div className="container">
        <div
          className={`section-header${headerVisible ? ' revealed' : ''}`}
          ref={headerRef}
        >
          <p className="section-label">Recognition</p>
          <h2 className="section-title">
            <span>Achievements</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="achievements-content">
          <div
            className={`achievement-card${cardVisible ? ' revealed' : ''}`}
            ref={(el) => {
              cardRef.current = el;
              counterRef.current = el;
            }}
          >
            <div className="achievement-icon-wrap">
              <div className="achievement-icon">
                <HiOutlineTrophy />
              </div>
              <div className="achievement-counter">
                <span className="counter-number">{count}+</span>
                <span className="counter-label">Problems</span>
              </div>
            </div>
            <div className="achievement-body">
              <h3 className="achievement-title">LeetCode Problem Solver</h3>
              <p className="achievement-text">
                Solved <strong>{count}+ Data Structures and Algorithms problems
                on LeetCode</strong>, strengthening skills in arrays, recursion,
                hashing, and core algorithmic thinking.
              </p>
              <div className="achievement-tags">
                <span>Arrays</span>
                <span>Recursion</span>
                <span>Hashing</span>
                <span>Algorithms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
