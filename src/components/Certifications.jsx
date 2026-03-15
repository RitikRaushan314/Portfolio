import { useScrollReveal, useStaggerReveal } from '../hooks/useAnimations';
import './Certifications.css';

const certifications = [
  {
    title: 'Basics of DSA',
    org: 'Lovely Professional University',
    year: '2024',
    image: '/SUMMER TRAINING CERTIFICATE_page-0001.jpg',
  },
  {
    title: 'Mastering C: Basic to Beyond',
    org: 'CSE Pathshala',
    year: '2024',
    image: '/c language certificate.png',
  },
  {
    title: 'The Complete Python Course',
    org: 'Infosys Springboard',
    year: '2024',
    image: '/python certificate.png',
  },
];

export default function Certifications() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [gridRef, visibleItems] = useStaggerReveal(certifications.length, 150);

  return (
    <section className="certs section" id="certifications">
      <div className="container">
        <div
          className={`section-header${headerVisible ? ' revealed' : ''}`}
          ref={headerRef}
        >
          <p className="section-label">Credentials</p>
          <h2 className="section-title">
            <span>Certifications</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="certs-grid" ref={gridRef}>
          {certifications.map((cert, i) => (
            <div
              className={`cert-card${visibleItems.has(i) ? ' revealed' : ''}`}
              key={cert.title}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="cert-image-wrapper">
                <img
                  className="cert-image"
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                />
                <div className="cert-overlay">
                  <span className="cert-view-label">🏆 Certified</span>
                </div>
              </div>
              <div className="cert-body">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-org">{cert.org}</p>
                <p className="cert-year">{cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
