import React from 'react';
import { Settings2, Zap, Layout, Shield, GitBranch, Database, BookOpen, ToggleRight, ToggleLeft } from 'lucide-react';

const ModuleManagement = ({ modules, toggleModule }) => {
  const getIcon = (id) => {
    switch (id) {
      case 'projects': return <GitBranch size={20} />;
      case 'users': return <Zap size={20} />;
      case 'roles': return <Shield size={20} />;
      case 'workflows': return <Database size={20} />;
      case 'dashboard': return <Layout size={20} />;
      case 'manual': return <BookOpen size={20} />;
      default: return <Settings2 size={20} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Feature Flags & Modules</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Toggle system capabilities to optimize performance and UI clutter</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-ghost">Reset Defaults</button>
          <button className="btn-primary" onClick={() => alert('Configuration saved and applied to all users!')}>Save Config</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {modules.map((module) => (
          <div 
            key={module.id} 
            className="glass" 
            style={{ 
              padding: '24px', 
              borderRadius: '20px', 
              border: '1px solid var(--surface-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              transition: 'all 0.3s',
              background: module.enabled ? 'rgba(99, 102, 241, 0.03)' : 'rgba(255, 255, 255, 0.01)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ 
                width: '44px', 
                height: '44px', 
                borderRadius: '12px', 
                background: module.enabled ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: module.enabled ? 'var(--accent-primary)' : 'var(--text-secondary)'
              }}>
                {getIcon(module.id)}
              </div>
              <button 
                onClick={() => toggleModule(module.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: module.enabled ? '#10b981' : 'var(--text-secondary)',
                  transition: 'all 0.3s',
                  transform: 'scale(1.2)'
                }}
              >
                {module.enabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
              </button>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h4 style={{ fontWeight: 600 }}>{module.name}</h4>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                  {module.category}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {module.enabled 
                  ? `The ${module.name} module is active and visible to all authorized users.` 
                  : `The ${module.name} module is currently hibernating and hidden from navigation.`}
              </p>
            </div>

            {module.enabled && (
              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                   <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} /> Running
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>v1.4.2</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="glass" style={{ padding: '32px', borderRadius: '24px', border: '1px dashed var(--accent-primary)', textAlign: 'center' }}>
         <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Advanced Optimization</h4>
         <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 24px' }}>
           When you disable a module, all associated background processes and UI elements are completely removed from the client bundle for maximum speed.
         </p>
         <button className="btn-ghost" style={{ border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)' }}>Run System Audit</button>
      </div>
    </div>
  );
};

export default ModuleManagement;
