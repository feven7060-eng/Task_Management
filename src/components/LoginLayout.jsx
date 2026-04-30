import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import LoginForm from './LoginForm';
import './LoginLayout.css';

const LoginLayout = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Slide in automatically on first load
    const timer = setTimeout(() => setOpen(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="login-layout">
      <HeroSection />
      
      <div className={`sliding-panel transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
        {/* Vertical Divider */}
        <div className="vertical-divider"></div>

        {/* Floating Center Logo acting as toggle */}
        <div 
          className="center-logo-wrapper" 
          onClick={() => setOpen(!open)}
          title="Toggle Login Panel"
        >
          <div className="center-logo">
            <span className="logo-text-ai">AI</span>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginLayout;
