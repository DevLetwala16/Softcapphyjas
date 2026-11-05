export default function PlatformModernization() {
  return (
    <section id="modernization-matrix" className="cs-section">
      <div className="cs-container">
        <div className="cs-section-header">
          <div className="cs-section-tag">
            <span>// Architecture Evolution</span>
          </div>
          <h2 className="cs-section-title">
            Modernizing Legacy Platforms into AI-Native Powerhouses
          </h2>
          <p className="cs-section-desc">
            We transform rigid legacy monoliths into distributed, self-healing agentic workflows with secure, zero-leakage LLM integrations.
          </p>
        </div>

        <div className="cs-matrix-grid">
          {/* Legacy Monolith Column */}
          <div className="cs-matrix-col cs-matrix-legacy">
            <div className="cs-matrix-header">
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                  <line x1="6" y1="6" x2="6.01" y2="6"></line>
                  <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fca5a5' }}>Traditional Legacy Architecture</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Fragile • High Maintenance • Static</span>
              </div>
            </div>

            <ul className="cs-matrix-list">
              <li className="cs-matrix-item">
                <span style={{ color: '#ef4444', fontWeight: 700 }}>✕</span>
                <span style={{ color: '#cbd5e1' }}><strong>Siloed Monoliths:</strong> Rigid monolithic backends difficult to adapt or reconfigure without extensive regressions.</span>
              </li>
              <li className="cs-matrix-item">
                <span style={{ color: '#ef4444', fontWeight: 700 }}>✕</span>
                <span style={{ color: '#cbd5e1' }}><strong>Manual Data Pipelines:</strong> Unmonitored batch scripts prone to silent failures and model drift.</span>
              </li>
              <li className="cs-matrix-item">
                <span style={{ color: '#ef4444', fontWeight: 700 }}>✕</span>
                <span style={{ color: '#cbd5e1' }}><strong>Insecure Third-Party APIs:</strong> Cloud LLM leaks exposing proprietary corporate intellectual property.</span>
              </li>
              <li className="cs-matrix-item">
                <span style={{ color: '#ef4444', fontWeight: 700 }}>✕</span>
                <span style={{ color: '#cbd5e1' }}><strong>Disconnected Portals:</strong> Separate HR, project management, and developer tools with zero telemetry.</span>
              </li>
            </ul>
          </div>

          {/* Softcapphyjas Agentic Column */}
          <div className="cs-matrix-col cs-matrix-softcapphyjas">
            <div className="cs-matrix-header">
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>Softcapphyjas Agentic Systems</h3>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8' }}>Autonomous • Secure • Self-Directing</span>
              </div>
            </div>

            <ul className="cs-matrix-list">
              <li className="cs-matrix-item">
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>✓</span>
                <span style={{ color: '#ffffff' }}><strong>Autonomous Agent Swarms:</strong> Modular micro-agents collaborating dynamically with verified reasoning graphs.</span>
              </li>
              <li className="cs-matrix-item">
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>✓</span>
                <span style={{ color: '#ffffff' }}><strong>Continuous MLOps Pipelines:</strong> Automated telemetry, continuous retraining, automated eval benchmarks, and drift remediation.</span>
              </li>
              <li className="cs-matrix-item">
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>✓</span>
                <span style={{ color: '#ffffff' }}><strong>Secure LLM Integrations:</strong> Air-gapped on-premise inference, zero-trust private RAG, and strict RBAC governance.</span>
              </li>
              <li className="cs-matrix-item">
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>✓</span>
                <span style={{ color: '#ffffff' }}><strong>Unified Client & HR Portal:</strong> Single-pane oversight unifying project KPIs, client milestones, and engineering talent ops.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
