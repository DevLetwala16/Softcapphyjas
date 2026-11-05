export default function DivisionCards({ onScrollToSection, onOpenContact }) {
  const divisions = [
    {
      id: 'frontier-research',
      category: 'Research Division',
      title: 'Frontier AI Research Labs',
      desc: 'Pioneering mathematical and computational intelligence to solve complex scientific challenges across four critical domains.',
      accent: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.25)',
      iconBg: 'rgba(6, 182, 212, 0.1)',
      iconBorder: 'rgba(6, 182, 212, 0.3)',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
      ),
      features: [
        'Physics: Quantum state solvers & non-linear dynamics',
        'Medicine: Computational pathology & molecular design',
        'Mathematics: Automated theorem proving & geometry',
        'Agriculture: Autonomous crop yield & biome vision',
      ],
      tag: '4 Science Verticals Active',
      actionLabel: 'Explore Research Deep Dive',
      onAction: () => onScrollToSection('frontier-research-deep-dive')
    },
    {
      id: 'agentic-systems',
      category: 'Enterprise Engineering',
      title: 'Agentic Systems & MLOps',
      desc: 'Architecting robust, self-directing multi-agent networks, production continuous MLOps pipelines, and secure LLM integrations.',
      accent: '#6366f1',
      glow: 'rgba(99, 102, 241, 0.25)',
      iconBg: 'rgba(99, 102, 241, 0.1)',
      iconBorder: 'rgba(99, 102, 241, 0.3)',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      features: [
        'Autonomous Multi-Agent Swarms & Orchestration',
        'End-to-End MLOps: Continuous Retraining & Eval',
        'Air-Gapped & Secure Private LLM Enterprise Integrations',
        'Modernizing Legacy Monoliths into AI-Native Platforms',
      ],
      tag: 'Enterprise Ready SLAs',
      actionLabel: 'Compare Modernization Matrix',
      onAction: () => onScrollToSection('modernization-matrix')
    },
    {
      id: 'academy',
      category: 'Education & Talent',
      title: 'Softcapphyjas Academy',
      desc: 'Industry-accredited advanced certifications in Machine Learning and Agentic AI with flexible monthly EMI financing options.',
      accent: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.25)',
      iconBg: 'rgba(245, 158, 11, 0.1)',
      iconBorder: 'rgba(245, 158, 11, 0.3)',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      ),
      features: [
        'Certified Agentic AI Architect Certification',
        'Advanced MLOps & Production Engineering Track',
        'No-Cost Monthly EMI Options with 0% Interest Tiers',
        'Capstones with Real Industry GPUs & Datasets',
      ],
      tag: 'EMI Options Available',
      actionLabel: 'Open EMI Calculator',
      onAction: () => onScrollToSection('emi-calculator')
    },
    {
      id: 'enterprise-portal',
      category: 'Unified Platform',
      title: 'Unified Client & HR Portal',
      desc: 'A unified single-pane command center integrating client delivery milestones, model telemetry, and intelligent HR talent pipelines.',
      accent: '#10b981',
      glow: 'rgba(16, 185, 129, 0.25)',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconBorder: 'rgba(16, 185, 129, 0.3)',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      features: [
        'Live Client Telemetry, Workflows & Artifact Delivery',
        'Internal HR Skill Matrices & Talent Allocation',
        'Secure Role-Based Access Control (RBAC)',
        'Unified Billing, Invoicing & Service Agreement Hub',
      ],
      tag: 'Unified Single-Sign-On',
      actionLabel: 'Request Portal Preview',
      onAction: onOpenContact
    }
  ];

  return (
    <section className="cs-section">
      <div className="cs-container">
        <div className="cs-section-header">
          <div className="cs-section-tag">
            <span>// Core Ecosystem</span>
          </div>
          <h2 className="cs-section-title">
            Engineered for Groundbreaking Impact
          </h2>
          <p className="cs-section-desc">
            From foundational scientific discovery to autonomous enterprise systems and credentialed engineering talent, discover how Softcapphyjas unifies modern AI.
          </p>
        </div>

        <div className="cs-divisions-grid">
          {divisions.map((div) => (
            <div 
              key={div.id} 
              id={div.id}
              className="cs-division-card"
              style={{
                '--card-accent': div.accent,
                '--card-glow': div.glow,
                '--card-icon-bg': div.iconBg,
                '--card-icon-border': div.iconBorder,
              }}
            >
              <div className="cs-card-header">
                <div className="cs-card-icon-wrap">
                  {div.icon}
                </div>
                <span className="cs-card-category">{div.category}</span>
              </div>

              <h3 className="cs-card-title">{div.title}</h3>
              <p className="cs-card-desc">{div.desc}</p>

              <ul className="cs-card-features">
                {div.features.map((feat, idx) => (
                  <li key={idx} className="cs-card-feature-item">
                    <svg className="cs-feature-check" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="cs-card-footer">
                <span className="cs-card-tag">{div.tag}</span>
                <button
                  type="button"
                  className="cs-btn-secondary"
                  style={{ fontSize: '0.82rem', padding: '6px 14px' }}
                  onClick={div.onAction}
                >
                  {div.actionLabel} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
