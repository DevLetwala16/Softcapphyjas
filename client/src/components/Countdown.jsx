import { useState, useEffect } from 'react';

export default function Countdown() {
  // Target a realistic milestone release date 42 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 36,
    seconds: 19
  });

  useEffect(() => {
    // Generate target date 42 days in future
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 42);
    targetDate.setHours(targetDate.getHours() + 14);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="cs-countdown-wrap">
      <div className="cs-countdown-header">
        <div className="cs-countdown-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>Target Public Research & Platform Deployment</span>
        </div>
        <div className="cs-countdown-phase">
          <span>Sprint 4.2 • Verification Active</span>
        </div>
      </div>

      <div className="cs-countdown-grid">
        <div className="cs-time-card">
          <div className="cs-time-val">{formatNumber(timeLeft.days)}</div>
          <div className="cs-time-lbl">Days</div>
        </div>
        <div className="cs-time-card">
          <div className="cs-time-val">{formatNumber(timeLeft.hours)}</div>
          <div className="cs-time-lbl">Hours</div>
        </div>
        <div className="cs-time-card">
          <div className="cs-time-val">{formatNumber(timeLeft.minutes)}</div>
          <div className="cs-time-lbl">Minutes</div>
        </div>
        <div className="cs-time-card">
          <div className="cs-time-val">{formatNumber(timeLeft.seconds)}</div>
          <div className="cs-time-lbl">Seconds</div>
        </div>
      </div>

      <div className="cs-progress-container">
        <div className="cs-progress-info">
          <span>System Readiness & Architecture Validation</span>
          <span style={{ color: '#38bdf8' }}>89.4% Complete</span>
        </div>
        <div className="cs-progress-bar">
          <div className="cs-progress-fill" style={{ width: '89.4%' }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
          <span>• Multi-Agent Core: Ready</span>
          <span>• Research Clusters: Online</span>
          <span>• Academy LMS & EMI: Testing</span>
          <span>• Client & HR Portal: Final Audit</span>
        </div>
      </div>
    </div>
  );
}
