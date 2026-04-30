import React, { useState } from 'react';
import { User, Mail, Shield, Lock, LogOut, Camera, CheckCircle2 } from 'lucide-react';

const ProfileSettings = ({ onLogout }) => {
  const [profile, setProfile] = useState({
    name: 'Alex Rivers',
    email: 'alex@antigravity.io',
    role: 'Super Admin',
    department: 'Operations',
    avatar: null
  });

  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('Passwords do not match!');
      return;
    }
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setPasswords({ current: '', new: '', confirm: '' });
      alert('Password updated successfully!');
    }, 1500);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      onLogout();
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Profile Info */}
        <div className="glass" style={{ padding: '32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '30px', 
              background: 'linear-gradient(135deg, var(--accent-primary), #a855f7)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)'
            }}>
              <User size={60} color="white" />
            </div>
            <button style={{ 
              position: 'absolute', 
              bottom: '-10px', 
              right: '-10px', 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px', 
              background: 'var(--bg-color)', 
              border: '1px solid var(--surface-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}>
              <Camera size={20} />
            </button>
          </div>
          
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>{profile.name}</h2>
          <p style={{ color: 'var(--accent-primary)', fontSize: '14px', fontWeight: 600, marginBottom: '32px' }}>{profile.role}</p>
          
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
              <Mail size={18} color="var(--text-secondary)" />
              <span style={{ fontSize: '14px' }}>{profile.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
              <Shield size={18} color="var(--text-secondary)" />
              <span style={{ fontSize: '14px' }}>{profile.department}</span>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            style={{ 
              marginTop: '40px', 
              width: '100%', 
              padding: '12px', 
              borderRadius: '12px', 
              background: 'rgba(239, 68, 68, 0.1)', 
              color: '#ef4444', 
              border: '1px solid rgba(239, 68, 68, 0.2)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              fontWeight: 600
            }}
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>

        {/* Password Update */}
        <div className="glass" style={{ padding: '32px', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={20} color="var(--accent-primary)" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Security Settings</h3>
          </div>
          
          <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Current Password</label>
              <input 
                required
                type="password" style={{ width: '100%' }} 
                value={passwords.current}
                onChange={(e) => setPasswords({...passwords, current: e.target.value})}
              />
            </div>
            <div style={{ height: '1px', background: 'var(--surface-border)', margin: '8px 0' }} />
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>New Password</label>
              <input 
                required
                type="password" style={{ width: '100%' }} 
                value={passwords.new}
                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Confirm New Password</label>
              <input 
                required
                type="password" style={{ width: '100%' }} 
                value={passwords.confirm}
                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isUpdating}
              style={{ width: '100%', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              {isUpdating ? 'Updating...' : <><CheckCircle2 size={18} /> Update Password</>}
            </button>
          </form>
          
          <div style={{ marginTop: '32px', padding: '16px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <p style={{ fontSize: '12px', color: '#f59e0b', lineHeight: '1.5' }}>
              <strong>Tip:</strong> Use at least 12 characters with a mix of letters, numbers, and symbols for a strong password.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileSettings;
