import React from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';

const Header = ({ title, setActiveModule, onLogout }) => {
  return (
    <header className="glass" style={{
      height: 'var(--header-height)',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--surface-border)',
      background: 'rgba(5, 5, 5, 0.4)'
    }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Admin Control Center</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search system..." 
            style={{ paddingLeft: '40px', width: '240px', height: '40px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="btn-ghost" style={{ padding: '8px', position: 'relative' }}>
            <Bell size={20} />
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              background: 'var(--accent-danger)',
              borderRadius: '50%',
              border: '2px solid var(--bg-color)'
            }} />
          </button>

          <button 
            className="btn-ghost" 
            onClick={() => window.confirm('Log out of system?') && onLogout()}
            style={{ padding: '8px', color: 'var(--text-secondary)' }}
            title="Log Out"
          >
            <LogOut size={20} />
          </button>
          
          <div style={{ height: '24px', width: '1px', background: 'var(--surface-border)' }} />

          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
            onClick={() => setActiveModule('profile')}
          >
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', fontWeight: 600 }}>Alex Rivers</p>
              <p style={{ fontSize: '11px', color: 'var(--accent-primary)' }}>Super Admin</p>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--surface-border)'
            }}>
              <User size={20} color="var(--accent-primary)" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
