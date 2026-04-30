import React from 'react';
import { Activity, ShieldCheck, Users, Cpu, Shield } from 'lucide-react';
import './HeroSection.css';
import heroBg from '../assets/latest-hero-bg.jpg';

const HeroSection = () => {
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="grid-overlay"></div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content-wrapper">
        <div className="top-logo-container">
          <div className="logo-icon-small">
            <span className="logo-text-ai">AI</span>
          </div>
          <div className="logo-text">
            <div className="logo-title">AI UNIVERSITY</div>
            <div className="logo-subtitle">Construction Project</div>
          </div>
        </div>

        <div className="middle-content">
          <div className="smarter-badge">SMARTER CONSTRUCTION</div>
          <h1 className="hero-heading">
            Building the Future<br />
            with <span className="text-gradient">Intelligence</span>
          </h1>
          <p className="hero-description">
            AI-powered construction management system<br />
            for smarter planning, execution & monitoring.
          </p>

          <div className="feature-row">
            <div className="feature-item">
              <div className="feature-icon"><Activity size={18} /></div>
              <div className="feature-text">Real-time<br/>Insights</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><ShieldCheck size={18} /></div>
              <div className="feature-text">Secure &<br/>Reliable</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Users size={18} /></div>
              <div className="feature-text">Collaborate<br/>Seamlessly</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Cpu size={18} /></div>
              <div className="feature-text">AI-Powered<br/>Decisions</div>
            </div>
          </div>
        </div>

        <div className="bottom-trust">
          <div className="trust-icon"><Shield size={20} /></div>
          <div className="trust-text">
            Trusted by construction professionals<br/>
            to build the future.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
