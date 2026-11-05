import { useState } from 'react';

const TRACKS = [
  {
    id: 'agentic-architect',
    title: 'Certified Agentic AI Architect',
    level: 'Advanced / Enterprise',
    duration: '16 Weeks Intensive',
    totalFee: 48000, // in INR / units (easily understandable)
    currency: '₹',
    syllabus: ['Multi-Agent Swarm Orchestration', 'Autonomous Tool-Use & Planning', 'vLLM & High-Throughput Serving', 'Production Red-Teaming & Guardrails']
  },
  {
    id: 'mlops-engineer',
    title: 'Advanced MLOps & Production Systems',
    level: 'Professional',
    duration: '14 Weeks Intensive',
    totalFee: 42000,
    currency: '₹',
    syllabus: ['Kubernetes & Ray Distributed Inference', 'Triton Server & TensorRT Optimization', 'Automated Continuous Retraining & Drift', 'Enterprise Cloud & Hybrid Airgap Deploy']
  },
  {
    id: 'frontier-researcher',
    title: 'Frontier AI & Scientific ML Researcher',
    level: 'Masterclass / Research',
    duration: '20 Weeks Fellowship',
    totalFee: 60000,
    currency: '₹',
    syllabus: ['Physics-Informed Neural Networks (PINNs)', 'Generative Diffusion for Biology', 'Formal Mathematical Proof Synthesis', 'Edge AI for Precision Agriculture']
  }
];

export default function EmiCalculator({ onSelectCourse }) {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [tenure, setTenure] = useState(6); // months

  const track = TRACKS[selectedTrackIndex];
  const monthlyEmi = Math.round(track.totalFee / tenure);

  return (
    <section id="emi-calculator" className="cs-section cs-academy-section">
      <div className="cs-container">
        <div className="cs-section-header">
          <div className="cs-section-tag">
            <span>// Softcapphyjas Academy</span>
          </div>
          <h2 className="cs-section-title">
            Expert Certifications in ML & Agentic AI
          </h2>
          <p className="cs-section-desc">
            Empowering engineers and researchers with industry-accredited credentials. Flexible 0% interest EMI options ensure elite AI education is universally accessible.
          </p>
        </div>

        <div className="cs-emi-calculator-card">
          <div className="cs-emi-grid">
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Step 1: Choose Certification Track
              </span>
              <div className="cs-track-selector" style={{ marginTop: '12px' }}>
                {TRACKS.map((t, index) => {
                  const isSelected = selectedTrackIndex === index;
                  return (
                    <div
                      key={t.id}
                      className={`cs-track-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedTrackIndex(index)}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: isSelected ? '#fbbf24' : '#ffffff', fontSize: '1rem' }}>
                          {t.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                          {t.level} • {t.duration}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#e2e8f0' }}>
                          {t.currency}{t.totalFee.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>
                          0% No-Cost EMI
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Step 2: Select Monthly Installment Tenure
              </span>
              <div className="cs-tenure-buttons" style={{ marginTop: '12px' }}>
                {[3, 6, 9, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`cs-tenure-btn ${tenure === m ? 'active' : ''}`}
                    onClick={() => setTenure(m)}
                  >
                    {m} Months
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Curriculum Highlights:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '8px' }}>
                  {track.syllabus.map((s, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#cbd5e1' }}>
                      <span style={{ color: '#fbbf24' }}>✓</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="cs-emi-result-panel">
              <div>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', fontWeight: 600 }}>
                  Estimated Monthly EMI
                </span>
                <div className="cs-emi-amount">
                  {track.currency}{monthlyEmi.toLocaleString()}
                  <span style={{ fontSize: '1rem', fontWeight: 500, color: '#94a3b8' }}> / mo</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '9999px', color: '#34d399', fontSize: '0.78rem', fontWeight: 600, marginTop: '8px' }}>
                  <span>✓ 0% Interest • Zero Processing Fee</span>
                </div>

                <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', textAlign: 'left', fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-dim)' }}>Course Tenure:</span>
                    <span style={{ fontWeight: 600 }}>{tenure} monthly installments</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-dim)' }}>Certification:</span>
                    <span style={{ fontWeight: 600, color: '#38bdf8' }}>Verified Industry Credential</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-dim)' }}>Live Lab GPU:</span>
                    <span style={{ fontWeight: 600 }}>Included (Dedicated Cluster)</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button
                  type="button"
                  className="cs-btn-primary"
                  style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.35)' }}
                  onClick={() => onSelectCourse(track.title)}
                >
                  Reserve Early Bird EMI Slot
                </button>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '8px' }}>
                  Cohort 1 admissions opening with limited seating.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
