import { useState, useEffect, useRef } from 'react';
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineDownload,
} from 'react-icons/hi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import Particles from './Particles';
import './Hero.css';

const roles = ['Data Analyst', 'Python Developer', 'Data Visualizer'];

const dataFloats = [
  { text: 'R² = 0.97', top: '15%', left: '5%', delay: '0s' },
  { text: 'n = 1024', top: '25%', right: '8%', delay: '2s' },
  { text: 'p < 0.05', bottom: '30%', left: '3%', delay: '4s' },
  { text: 'σ = 2.41', top: '60%', right: '5%', delay: '1s' },
  { text: 'df = 4', top: '45%', left: '8%', delay: '3s' },
  { text: 'μ = 42.7', bottom: '20%', right: '12%', delay: '5s' },
  { text: 'β₁ = 0.73', top: '10%', right: '25%', delay: '2.5s' },
  { text: 'Σ(xᵢ)', bottom: '40%', left: '12%', delay: '1.5s' },
];

function useTypingEffect(strings, typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = strings[stringIndex];

    if (!isDeleting && text === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % strings.length);
    } else {
      const nextText = isDeleting
        ? current.substring(0, text.length - 1)
        : current.substring(0, text.length + 1);

      timeoutRef.current = setTimeout(
        () => setText(nextText),
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeoutRef.current);
  }, [text, isDeleting, stringIndex, strings]);

  return text;
}

export default function Hero() {
  const typedText = useTypingEffect(roles);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  return (
    <section className="hero section" id="hero">
      <Particles />

      {/* Floating data badges */}
      <div className="hero-data-floats">
        {dataFloats.map((item) => (
          <span
            className="data-float-badge"
            key={item.text}
            style={{
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
              animationDelay: item.delay,
            }}
          >
            {item.text}
          </span>
        ))}
      </div>

      <div className={`container hero-inner${loaded ? ' hero-loaded' : ''}`}>
        <div className="hero-photo-wrapper">
          <div className="hero-photo-ring">
            <div className="hero-photo-glow" />
            <img
              className="hero-photo"
              src="/profile.png"
              alt="Ritik Raushan"
              loading="eager"
            />
          </div>
        </div>

        <div className="hero-content">
          <p className="hero-greeting">
            <span className="hero-wave">👋</span> Hello, I'm
          </p>
          <h1 className="hero-name">
            Ritik <span className="hero-name-accent">Raushan</span>
          </h1>
          <p className="hero-title">
            <span className="hero-title-dot" />
            <span className="typed-text">{typedText}</span>
            <span className="typed-cursor">|</span>
          </p>
          <p className="hero-overview">
            A motivated Computer Science student passionate about data analysis,
            visualization, and extracting insights from real-world datasets.
            Skilled in Python, SQL, Excel, and Power BI with experience building
            analytical dashboards and performing data-driven problem solving.
          </p>

          <div className="hero-contact-row">
            <a className="hero-contact-btn" href="mailto:ritikraushan314@gmail.com" title="Email">
              <HiOutlineMail /> <span>ritikraushan314@gmail.com</span>
            </a>
            <a className="hero-contact-btn" href="tel:+916203554942" title="Phone">
              <HiOutlinePhone /> <span>+91 6203554942</span>
            </a>
            <a className="hero-contact-btn" href="https://linkedin.com/in/ritik41" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FaLinkedinIn /> <span>LinkedIn</span>
            </a>
            <a className="hero-contact-btn" href="https://github.com/RitikRaushan314" target="_blank" rel="noopener noreferrer" title="GitHub">
              <FaGithub /> <span>GitHub</span>
            </a>
          </div>

          <a className="hero-resume-btn" href="/CV2.pdf" download>
            <span className="resume-btn-bg" />
            <HiOutlineDownload /> Download Resume
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
