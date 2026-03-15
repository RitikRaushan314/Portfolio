import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { useScrollReveal } from '../hooks/useAnimations';
import './Footer.css';

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
];

export default function Footer() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <footer className={`footer${isVisible ? ' revealed' : ''}`} ref={ref}>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <h3>
              Ritik<span>.</span>
            </h3>
            <p>
              Aspiring Data Analyst passionate about turning raw data into
              meaningful insights and building impactful visualizations.
            </p>
          </div>

          <div className="footer-nav">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              {quickLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-connect">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-socials">
              <a
                className="footer-social-link"
                href="https://github.com/RitikRaushan314"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                className="footer-social-link"
                href="https://linkedin.com/in/ritik41"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                className="footer-social-link"
                href="mailto:ritikraushan314@gmail.com"
                aria-label="Email"
              >
                <HiOutlineMail />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Designed & Built with ❤️ by{' '}
            <a href="#hero">Ritik Raushan</a>
          </p>
          <p className="footer-copy">© 2026 Ritik Raushan | Data Analyst Portfolio</p>
        </div>
      </div>
    </footer>
  );
}
