import { useState } from 'react';
import logoWide from '../assets/S7.png';
import logoIcon from '../assets/S1.png';

export default function Navbar({ onOpenContact, onScrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  return (
    <>
      <header className="cs-navbar">
        <div className="cs-container">
          <div className="cs-nav-inner">
            <a href="#" className="cs-brand" aria-label="Softcapphyjas Home">
              <img 
                src={logoWide} 
                alt="Softcapphyjas" 
                className="cs-logo-wide" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.nextElementSibling;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="cs-brand-fallback" style={{ display: 'none' }}>
                <img src={logoIcon} alt="Softcapphyjas" className="cs-brand-icon" />
                <span className="cs-brand-name">Softcapphyjas</span>
              </div>
            </a>

            <nav className="cs-nav-links" aria-label="Main Navigation">
              <button 
                type="button" 
                className="cs-nav-link" 
                onClick={() => handleNavClick('frontier-research')}
              >
                Frontier Research
              </button>
              <button 
                type="button" 
                className="cs-nav-link" 
                onClick={() => handleNavClick('agentic-systems')}
              >
                Agentic Systems
              </button>
              <button 
                type="button" 
                className="cs-nav-link" 
                onClick={() => handleNavClick('academy')}
              >
                Academy & EMI
              </button>
              <button 
                type="button" 
                className="cs-nav-link" 
                onClick={() => handleNavClick('enterprise-portal')}
              >
                Client & HR Portal
              </button>
            </nav>

            <div className="cs-nav-actions">
              <div className="cs-status-chip">
                <span className="cs-pulse-dot"></span>
                <span>Phase 1 Alpha • 2026</span>
              </div>

              <button 
                type="button" 
                className="cs-btn-primary"
                onClick={() => handleNavClick('priority-access')}
              >
                Get Early Access
              </button>

              <button 
                type="button" 
                className="cs-hamburger" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="cs-mobile-menu">
          <div className="cs-status-chip" style={{ alignSelf: 'flex-start' }}>
            <span className="cs-pulse-dot"></span>
            <span>Phase 1 Alpha • In Progress</span>
          </div>
          <button 
            type="button" 
            className="cs-mobile-nav-link" 
            onClick={() => handleNavClick('frontier-research')}
          >
            🔬 Frontier Research (Physics, Medicine, Math, Agri)
          </button>
          <button 
            type="button" 
            className="cs-mobile-nav-link" 
            onClick={() => handleNavClick('agentic-systems')}
          >
            🤖 Custom Agentic Systems & MLOps
          </button>
          <button 
            type="button" 
            className="cs-mobile-nav-link" 
            onClick={() => handleNavClick('academy')}
          >
            🎓 Academy Certifications & EMI Calculator
          </button>
          <button 
            type="button" 
            className="cs-mobile-nav-link" 
            onClick={() => handleNavClick('enterprise-portal')}
          >
            🌐 Unified Client & HR Portal
          </button>
          <button 
            type="button" 
            className="cs-btn-primary" 
            style={{ marginTop: '12px', width: '100%', height: '48px' }}
            onClick={() => handleNavClick('priority-access')}
          >
            Register for Early Access
          </button>
          <button 
            type="button" 
            className="cs-btn-secondary" 
            style={{ width: '100%', height: '48px' }}
            onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
          >
            Schedule Briefing / Inquire
          </button>
        </div>
      )}
    </>
  );
}
