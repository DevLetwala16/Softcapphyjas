import { useState } from 'react';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: 'Enterprise Agentic Systems & MLOps',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="cs-modal-backdrop" onClick={onClose}>
      <div className="cs-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="cs-modal-close" 
          onClick={onClose}
          aria-label="Close dialog"
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Inquiry Dispatched
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '24px' }}>
              Thank you, <strong>{formData.name}</strong>. Our research and engineering leadership will review your inquiry and follow up at <strong>{formData.email}</strong> within 24 business hours.
            </p>
            <button type="button" className="cs-btn-primary" onClick={handleReset}>
              Close Window
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '6px' }}>
                <span>● Executive Briefing & Partnership</span>
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
                Schedule a Consultation
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Discuss custom agentic pipelines, legacy modernization, research fellowships, or enterprise portal access with Softcapphyjas leadership.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Full Name / Principal Investigator
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Jane Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', height: '46px', padding: '0 14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#ffffff', fontSize: '0.92rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', height: '46px', padding: '0 14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#ffffff', fontSize: '0.92rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Organization / Institute
                  </label>
                  <input
                    type="text"
                    placeholder="Company, University or Lab"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    style={{ width: '100%', height: '46px', padding: '0 14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#ffffff', fontSize: '0.92rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Primary Objective
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{ width: '100%', height: '46px', padding: '0 14px', background: '#0b101c', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#ffffff', fontSize: '0.92rem' }}
                >
                  <option value="Enterprise Agentic Systems & MLOps">Custom Agentic Systems & MLOps Pipelines</option>
                  <option value="Legacy Platform Modernization">Legacy Platform Modernization & LLMs</option>
                  <option value="Frontier Research Collaboration">Frontier Research (Physics, Med, Math, Agri)</option>
                  <option value="Academy EMI Certifications">Academy Certification & EMI Options</option>
                  <option value="Unified Portal Access">Unified Client & HR Portal Demo</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Project Overview / Requirements
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Describe your research goals, existing tech stack, or team training requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#ffffff', fontSize: '0.92rem', resize: 'vertical' }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="cs-btn-primary"
                disabled={loading}
                style={{ height: '48px', marginTop: '6px' }}
              >
                {loading ? 'Submitting Inquiry...' : 'Transmit Briefing Request →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
