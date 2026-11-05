import logoIcon from '../assets/S1.png';
import logoAlt from '../assets/S5.png';

export default function Hero({ onScrollToSection, onOpenContact }) {
  return (
    <section className="cs-hero">
      <div className="cs-container">
        
        {/* Floating AI Pioneer Tag */}
        <div className="cs-hero-badge-wrap">
          <div className="cs-hero-badge">
            <span className="cs-pulse-dot"></span>
            <span>Frontier AI Pioneer • Next-Generation Systems</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="cs-hero-title">
          Architecting Intelligence for <br />
          <span className="cs-gradient-text">Frontier Science & Enterprise Systems</span>
        </h1>

        {/* Corporate Mission Highlight Card */}
        <div className="cs-quote-card">
          <div className="cs-quote-header">
            <div className="cs-quote-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <span>Executive Mandate & Capabilities</span>
            </div>
            <img 
              src={logoAlt} 
              alt="Softcapphyjas Emblem" 
              className="cs-quote-logo-mark"
              onError={(e) => {
                e.target.src = logoIcon;
              }}
            />
          </div>

          <p className="cs-quote-text">
            <strong>Softcapphyjas</strong> is an AI pioneer advancing frontier research across physics, medicine, math, and agriculture. We build custom agentic systems, MLOps pipelines, secure LLM integrations, and modernize legacy platforms. Our academy offers expert certifications in ML/Agentic AI with EMI options alongside a unified client and HR portal.
          </p>
        </div>

        {/* Responsive Quick Action Buttons */}
        <div className="cs-hero-ctas">
          <button 
            type="button" 
            className="cs-btn-primary" 
            onClick={() => onScrollToSection('priority-access')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>Request Priority Access</span>
          </button>

          <button 
            type="button" 
            className="cs-btn-secondary" 
            onClick={() => onScrollToSection('frontier-research')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
            <span>Explore Research Verticals</span>
          </button>

          <button 
            type="button" 
            className="cs-btn-secondary" 
            onClick={onOpenContact}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Inquire / Partner</span>
          </button>
        </div>

      </div>
    </section>
  );
}
