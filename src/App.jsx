import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './modules/LoginPage';
import SystemOverview from './modules/SystemOverview';
import ProjectManagement from './modules/ProjectManagement';
import UserManagement from './modules/UserManagement';
import RolesPermissions from './modules/RolesPermissions';
import DashboardBuilder from './modules/DashboardBuilder';
import WorkflowBuilder from './modules/WorkflowBuilder';
import ModuleManagement from './modules/ModuleManagement';
import SystemLogs from './modules/SystemLogs';
import ProfileSettings from './modules/ProfileSettings';
import UserManual from './modules/UserManual';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModule, setActiveModule] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Global Module State (Feature Flags)
  const [modules, setModules] = useState([
    { id: 'projects', name: 'Project Management', enabled: true, category: 'Core' },
    { id: 'users', name: 'User & Org Control', enabled: true, category: 'Core' },
    { id: 'roles', name: 'Permission Builder', enabled: true, category: 'Security' },
    { id: 'workflows', name: 'Workflow Engine', enabled: true, category: 'Automation' },
    { id: 'dashboard', name: 'Dashboard Builder', enabled: true, category: 'Visualization' },
    { id: 'logs', name: 'Audit Logs', enabled: true, category: 'System' },
    { id: 'manual', name: 'Documentation', enabled: true, category: 'Support' }
  ]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveModule('overview');
  };

  const toggleModule = (id) => {
    setModules(modules.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'overview': return <SystemOverview />;
      case 'projects': return <ProjectManagement />;
      case 'users': return <UserManagement />;
      case 'roles': return <RolesPermissions />;
      case 'dashboard': return <DashboardBuilder />;
      case 'workflows': return <WorkflowBuilder />;
      case 'modules': return <ModuleManagement modules={modules} toggleModule={toggleModule} />;
      case 'logs': return <SystemLogs />;
      case 'profile': return <ProfileSettings onLogout={handleLogout} />;
      case 'manual': return <UserManual />;
      default: return <SystemOverview />;
    }
  };

  const getModuleTitle = () => {
    const titles = {
      overview: 'System Overview',
      projects: 'Project Portfolio Management',
      users: 'Organization & User Management',
      roles: 'Roles & Permissions Builder',
      dashboard: 'Dashboard Configuration',
      workflows: 'Workflow Builder',
      modules: 'Modules & Features',
      logs: 'System Monitoring & Logs',
      profile: 'Account Settings',
      manual: 'Platform User Manual'
    };
    return titles[activeModule] || 'Dashboard';
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule} 
        collapsed={isSidebarCollapsed}
        setCollapsed={setIsSidebarCollapsed}
        modules={modules}
      />
      
      <div className="main-layout" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        marginLeft: isSidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        transition: 'margin-left var(--transition-speed)',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <Header title={getModuleTitle()} setActiveModule={setActiveModule} onLogout={handleLogout} />
        
        <main style={{ 
          flex: 1, 
          padding: '24px', 
          overflowY: 'auto',
          background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 40%)'
        }}>
          {renderModule()}
        </main>
      </div>
    </div>
  );
}

export default App;
