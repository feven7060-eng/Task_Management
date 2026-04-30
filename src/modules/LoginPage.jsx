import React, { useState } from 'react';
import { Zap, Mail, Lock, ChevronRight, ShieldCheck } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@antigravity.io');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication delay
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top left, #1e1b4b, #050505 50%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Decorative Elements */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', background: 'var(--accent-primary)', opacity: 0.05, filter: 'blur(100px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: '#a855f7', opacity: 0.05, filter: 'blur(100px)', borderRadius: '50%' }} />

      <div className="glass" style={{ 
        width: '440px', 
        padding: '48px', 
        borderRadius: '32px', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10
      }}>
        {/* Logo */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, var(--accent-primary), #a855f7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
        }}>
          <Zap size={32} color="white" fill="white" />
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: 'white' }}>Welcome Back</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', textAlign: 'center', fontSize: '15px' }}>
          Enter your credentials to access the Antigravity Control Center.
        </p>

        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              required
              type="email" 
              placeholder="Email Address" 
              style={{ width: '100%', padding: '14px 14px 14px 48px', fontSize: '15px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              required
              type="password" 
              placeholder="Password" 
              style={{ width: '100%', padding: '14px 14px 14px 48px', fontSize: '15px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <input type="checkbox" style={{ width: 'auto' }} defaultChecked /> Remember me
            </label>
            <a href="#" style={{ fontSize: '13px', color: 'var(--accent-primary)', textDecoration: 'none' }}>Forgot password?</a>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading}
            style={{ 
              width: '100%', 
              padding: '16px', 
              fontSize: '16px', 
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            {isLoading ? 'Signing in...' : <>Sign In <ChevronRight size={18} /></>}
          </button>
        </form>

        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--surface-border)', width: '100%', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#10b981', fontSize: '12px', fontWeight: 600 }}>
             <ShieldCheck size={14} /> 256-bit AES Encrypted Connection
          </div>
        </div>
      </div>

      <p style={{ position: 'absolute', bottom: '32px', color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>
        © 2026 Antigravity Systems. All rights reserved.
      </p>
    </div>
  );
};

export default LoginPage;
