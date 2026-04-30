import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  LayoutDashboard, 
  GitBranch, 
  Settings2, 
  Activity,
  ChevronLeft,
  ChevronRight,
  Zap,
  User,
  BookOpen,
  ExternalLink
} from 'lucide-react';

const Sidebar = ({ activeModule, setActiveModule, collapsed, setCollapsed, modules = [] }) => {
  const menuItems = [
    { id: 'overview', label: 'System Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: GitBranch },
    { id: 'users', label: 'Users & Org', icon: Users },
    { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck },
    { id: 'dashboard', label: 'Dashboard Builder', icon: LayoutDashboard },
    { id: 'workflows', label: 'Workflow Engine', icon: GitBranch },
    { id: 'modules', label: 'Feature Flags', icon: Settings2 },
    { id: 'logs', label: 'System Logs', icon: Activity },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'manual', label: 'User Manual', icon: BookOpen },
  ];

  // Filter items based on feature flags (always show overview, modules, profile)
  const filteredItems = menuItems.filter(item => {
    if (['overview', 'modules', 'profile'].includes(item.id)) return true;
    const mod = modules.find(m => m.id === item.id);
    return mod ? mod.enabled : true;
  });

  return (
    <aside className="glass" style={{
      width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
      transition: 'width var(--transition-speed)',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid var(--surface-border)',
      background: 'rgba(5, 5, 5, 0.8)'
    }}>
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent-primary), #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px' }}>CORTEX</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', color: 'white' }}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              background: activeModule === item.id ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.15), transparent)' : 'transparent',
              color: activeModule === item.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left',
              width: '100%',
              position: 'relative'
            }}
          >
            <item.icon size={20} style={{ minWidth: '20px' }} />
            {!collapsed && <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.label}</span>}
            {activeModule === item.id && !collapsed && (
              <div style={{ position: 'absolute', right: '12px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }} />
            )}
          </button>
        ))}
      </nav>

      {/* External Link to Executive View */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--surface-border)' }}>
        <button
          onClick={() => window.open('/executive', '_blank')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            background: 'rgba(16, 185, 129, 0.05)',
            color: '#10b981',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.2s'
          }}
        >
          <ExternalLink size={20} style={{ minWidth: '20px' }} />
          {!collapsed && <span style={{ fontSize: '14px', fontWeight: 600 }}>Live Portfolio</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
