import { useState } from 'react';

const INTEREST_OPTIONS = [
  { id: 'research', label: 'Frontier Research (Physics, Med, Math, Agri)', icon: '🔬' },
  { id: 'agentic', label: 'Custom Agentic Systems & MLOps', icon: '🤖' },
  { id: 'academy', label: 'Academy Certifications (with EMI)', icon: '🎓' },
  { id: 'portal', label: 'Unified Client & HR Portal', icon: '🌐' },
  { id: 'modernize', label: 'Legacy Modernization & LLMs', icon: '⚡' },
];

export default function EarlyAccessForm() {
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState(['research', 'agentic']);
  const [registeredData, setRegisteredData] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('softcapphyjas_early_access') : null;
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [status, setStatus] = useState(() => (registeredData ? 'success' : 'idle')); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((item) => item !== id));
      }
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid business or academic email address.');
      return;
    }

    setStatus('loading');

    // Simulate fast reliable registration
    setTimeout(() => {
      const newRecord = {
        email,
        interests: selectedInterests,
        registeredAt: new Date().toISOString(),
        ticketId: 'SCJ-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-2026',
      };

      try {
        localStorage.setItem('softcapphyjas_early_access', JSON.stringify(newRecord));
      } catch {
        // ignore
      }

      setRegisteredData(newRecord);
      setStatus('success');
    }, 700);
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('softcapphyjas_early_access');
    } catch {
      // ignore
    }
    setRegisteredData(null);
    setStatus('idle');
    setEmail('');
  };

  return (
    <div id="priority-access" className="cs-early-access-card">
      {status === 'success' && registeredData ? (
        <div className="cs-success-card">
          <div className="cs-success-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
            Priority Access Granted
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 12px' }}>
            Thank you for registering <strong>{registeredData.email}</strong>. You are in queue for the closed Alpha research briefings and portal onboarding.
          </p>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Priority Reservation ID: </span>
            <span className="cs-access-id">{registeredData.ticketId}</span>
          </div>
          <button 
            type="button" 
            onClick={handleReset} 
            className="cs-btn-secondary"
            style={{ marginTop: '16px', fontSize: '0.82rem', padding: '6px 16px' }}
          >
            Register Another Email
          </button>
        </div>
      ) : (
        <>
          <div className="cs-ea-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>Confidential Beta & Research Invitation</span>
          </div>

          <h2 className="cs-ea-title">Join the Closed Priority Beta</h2>
          <p className="cs-ea-desc">
            Get early access to our agentic systems, scientific research preprints, academy EMI admissions, and client portal preview.
          </p>

          <span className="cs-interests-label">Select Your Domains of Interest:</span>
          <div className="cs-interest-chips">
            {INTEREST_OPTIONS.map((opt) => {
              const active = selectedInterests.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`cs-chip ${active ? 'active' : ''}`}
                  onClick={() => toggleInterest(opt.id)}
                >
                  <span style={{ marginRight: '6px' }}>{opt.icon}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="cs-form-row">
              <div className="cs-input-group">
                <svg className="cs-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  type="email"
                  className="cs-input-email"
                  placeholder="Enter your academic or corporate email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  required
                />
              </div>

              <button
                type="submit"
                className="cs-btn-submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
                      <path d="M12 2a10 10 0 0 1 10 10"></path>
                    </svg>
                    <span>Securing Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Request Priority Access</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </div>

            {errorMsg && (
              <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '10px' }}>
                {errorMsg}
              </p>
            )}

            <div className="cs-ea-footnote">
              <span>🔒 Zero-spam assurance</span>
              <span>• Direct communications only</span>
              <span>• Priority onboarding for researchers & enterprises</span>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
