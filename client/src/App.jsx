import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import EarlyAccessForm from './components/EarlyAccessForm';
import DivisionCards from './components/DivisionCards';
import ResearchTabs from './components/ResearchTabs';
import EmiCalculator from './components/EmiCalculator';
import PlatformModernization from './components/PlatformModernization';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import './ComingSoon.css';

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCourse = () => {
    scrollToSection('priority-access');
  };

  return (
    <div className="cs-page">
      {/* Ambient Sci-Fi Glowing Canvas */}
      <div className="ambient-canvas" aria-hidden="true">
        <div className="ambient-grid"></div>
        <div className="ambient-orb ambient-orb-1"></div>
        <div className="ambient-orb ambient-orb-2"></div>
        <div className="ambient-orb ambient-orb-3"></div>
      </div>

      {/* Navigation */}
      <Navbar 
        onOpenContact={() => setContactOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section with Official Mandate */}
      <main>
        <Hero 
          onScrollToSection={scrollToSection}
          onOpenContact={() => setContactOpen(true)}
        />

        <div className="cs-container">
          {/* Target Countdown & Progress Bar */}
          <Countdown />

          {/* Priority Beta Registration */}
          <EarlyAccessForm />
        </div>

        {/* 4 Core Pillars Grid */}
        <DivisionCards 
          onScrollToSection={scrollToSection}
          onOpenContact={() => setContactOpen(true)}
        />

        {/* Deep Dive into Frontier Research: Physics, Med, Math, Agri */}
        <ResearchTabs />

        {/* Legacy Modernization vs AI-Native Agentic Stack */}
        <PlatformModernization />

        {/* Academy Certifications with Interactive EMI Calculator */}
        <EmiCalculator onSelectCourse={handleSelectCourse} />
      </main>

      {/* Footer */}
      <Footer 
        onScrollToSection={scrollToSection}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Contact / Consultation Modal */}
      <ContactModal 
        isOpen={contactOpen} 
        onClose={() => setContactOpen(false)} 
      />

      {/* Mobile Sticky Quick Action Bar */}
      <div className="cs-mobile-floating-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="cs-pulse-dot" style={{ width: '8px', height: '8px' }}></span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff' }}>Coming Soon</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            type="button" 
            className="cs-btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            onClick={() => setContactOpen(true)}
          >
            Inquire
          </button>
          <button 
            type="button" 
            className="cs-btn-primary"
            style={{ padding: '6px 14px', fontSize: '0.78rem' }}
            onClick={() => scrollToSection('priority-access')}
          >
            Join Beta
          </button>
        </div>
      </div>
    </div>
  );
}
