import logoWide from '../assets/S7.png';
import logoIcon from '../assets/S1.png';

const CURRENT_YEAR = 2026;

export default function Footer({ onScrollToSection, onOpenContact }) {
  return (
    <footer className="cs-footer">
      <div className="cs-container">
        <div className="cs-footer-grid">
          <div className="cs-footer-brand">
            <a href="#" className="cs-brand" style={{ display: 'inline-flex' }}>
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
            <p>
              Advancing frontier intelligence across scientific disciplines and enterprise architectures. Empowering organizations with custom agentic systems and certified talent.
            </p>
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="cs-pulse-dot" style={{ width: '7px', height: '7px' }}></span>
              <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
                Research Cluster Status: Operational
              </span>
            </div>
          </div>

          <div className="cs-footer-col">
            <h4>Frontier Research</h4>
            <ul className="cs-footer-links">
              <li>
                <button type="button" className="cs-footer-link" onClick={() => onScrollToSection('frontier-research-deep-dive')}>
                  Computational Physics & PINNs
                </button>
              </li>
              <li>
                <button type="button" className="cs-footer-link" onClick={() => onScrollToSection('frontier-research-deep-dive')}>
                  Medicine & Molecular AI
                </button>
              </li>
              <li>
                <button type="button" className="cs-footer-link" onClick={() => onScrollToSection('frontier-research-deep-dive')}>
                  Mathematical Discovery
                </button>
              </li>
              <li>
                <button type="button" className="cs-footer-link" onClick={() => onScrollToSection('frontier-research-deep-dive')}>
                  Precision AgriTech Systems
                </button>
              </li>
            </ul>
          </div>

          <div className="cs-footer-col">
            <h4>Solutions & Platforms</h4>
            <ul className="cs-footer-links">
              <li>
                <button type="button" className="cs-footer-link" onClick={() => onScrollToSection('agentic-systems')}>
                  Custom Agentic Systems
                </button>
              </li>
              <li>
                <button type="button" className="cs-footer-link" onClick={() => onScrollToSection('agentic-systems')}>
                  Continuous MLOps Pipelines
                </button>
              </li>
              <li>
                <button type="button" className="cs-footer-link" onClick={() => onScrollToSection('modernization-matrix')}>
                  Legacy Platform Modernization
                </button>
              </li>
              <li>
                <button type="button" className="cs-footer-link" onClick={() => onScrollToSection('enterprise-portal')}>
                  Unified Client & HR Portal
                </button>
              </li>
            </ul>
          </div>

          <div className="cs-footer-col">
            <h4>Academy & Inquiries</h4>
            <ul className="cs-footer-links">
              <li>
                <button type="button" className="cs-footer-link" onClick={() => onScrollToSection('emi-calculator')}>
                  ML & Agentic Certifications
                </button>
              </li>
              <li>
                <button type="button" className="cs-footer-link" onClick={() => onScrollToSection('emi-calculator')}>
                  0% No-Cost EMI Financing
                </button>
              </li>
              <li>
                <button type="button" className="cs-footer-link" onClick={() => onScrollToSection('priority-access')}>
                  Closed Beta Registration
                </button>
              </li>
              <li>
                <button type="button" className="cs-footer-link" onClick={onOpenContact}>
                  Executive Consultation
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="cs-footer-bottom">
          <div>
            © {CURRENT_YEAR} Softcapphyjas Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ cursor: 'pointer' }} onClick={onOpenContact}>Confidentiality & Security</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }} onClick={onOpenContact}>Responsible AI Governance</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onScrollToSection('priority-access')}>Early Access V1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
