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
  BookOpen
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
      {/* Logo Section */}
      <div style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid var(--surface-border)',
        height: 'var(--header-height)',
        overflow: 'hidden'
      }}>
        <div style={{
          minWidth: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--accent-primary), #a855f7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
        }}>
          <Zap size={20} color="white" fill="white" />
        </div>
        {!collapsed && (
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '0.5px' }}>
            ANTIGRAVITY <span style={{ color: 'var(--accent-primary)', fontSize: '12px', verticalAlign: 'super' }}>PRO</span>
          </span>
        )}
      </div>

      {/* Menu Items */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                marginBottom: '8px',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
                if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {!collapsed && <span style={{ fontWeight: isActive ? 600 : 400 }}>{item.label}</span>}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  left: '-12px',
                  width: '4px',
                  height: '24px',
                  background: 'var(--accent-primary)',
                  borderRadius: '0 4px 4px 0',
                  boxShadow: '0 0 10px var(--accent-primary)'
                }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        style={{
          padding: '20px',
          border: 'none',
          background: 'transparent',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-end',
          borderTop: '1px solid var(--surface-border)'
        }}
      >
        {collapsed ? <ChevronRight size={20} /> : <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ChevronLeft size={20} /> <span>Collapse</span></div>}
      </button>
    </aside>
  );
};

export default Sidebar;
