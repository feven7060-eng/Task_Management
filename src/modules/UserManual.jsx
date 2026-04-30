import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  GitBranch, 
  Users, 
  ShieldCheck, 
  Settings2, 
  Activity, 
  BookOpen, 
  ChevronRight, 
  HelpCircle 
} from 'lucide-react';

const UserManual = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const manualContent = {
    overview: {
      title: 'System Overview',
      icon: LayoutDashboard,
      description: 'The landing page for the admin. It provides a real-time snapshot of the entire operation.',
      points: [
        'Total Stats: View total users, roles, and active workflows.',
        'Project Status: Track progress across all active industrial projects.',
        'Activity Feed: Monitor live updates of actions taken across the system.'
      ]
    },
    projects: {
      title: 'Project Portfolio',
      icon: GitBranch,
      description: 'Manage the lifecycle of industrial projects from initialization to completion.',
      points: [
        'Initialization: Create new projects with custom names and deadlines.',
        'Assignments: Assign a dedicated Project Manager and select team members.',
        'Tracking: Oversee project health, completion percentage, and active phases.'
      ]
    },
    users: {
      title: 'User Management',
      icon: Users,
      description: 'The directory for all organizational and contractor accounts.',
      points: [
        'Registration: Add new users and assign them a default system password.',
        'Monitoring: Track user status (Active/Inactive) and role assignments.',
        'Access Control: Quickly deactivate or reactivate accounts as needed.'
      ]
    },
    roles: {
      title: 'Roles & Permissions',
      icon: ShieldCheck,
      description: 'Define exactly what each user type can see and do in the platform.',
      points: [
        'Role Creation: Build custom roles like "Site Supervisor" or "Finance Auditor".',
        'Granular Control: Toggle specific permissions for Dashboards, Workflows, and Documents.',
        'Instant Updates: Permission changes take effect immediately across the system.'
      ]
    },
    dashboard: {
      title: 'Dashboard Builder',
      icon: LayoutDashboard,
      description: 'The visualization engine to build role-specific interfaces.',
      points: [
        'Drag & Drop: Grab widgets from the library and drop them onto the canvas.',
        'Customization: Choose from Bar Charts, Line Charts, Lists, and more.',
        'Publishing: Deploy customized layouts to specific user roles.'
      ]
    },
    workflows: {
      title: 'Workflow Engine',
      icon: GitBranch,
      description: 'Automate business processes like RFI, IPC, and safety inspections.',
      points: [
        'Step Builder: Define the sequence of approvals and technical reviews.',
        'SLA Management: Set time limits (e.g., 24h) for each step in the process.',
        'Rules: Configure automated logic for escalations and approval requirements.'
      ]
    },
    modules: {
      title: 'Feature Flags',
      icon: Settings2,
      description: 'Customize the platform capabilities for different industries.',
      points: [
        'Capability Toggle: Enable/Disable major modules like Finance or HSE.',
        'Industry Presets: Use one-click configurations for Construction or Oil & Gas.',
        'Optimization: Reduce system clutter by only showing active features.'
      ]
    }
  };

  const current = manualContent[activeSection];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px', height: 'calc(100vh - 150px)' }}>
      
      {/* Navigation */}
      <div className="glass" style={{ borderRadius: '24px', padding: '16px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, padding: '16px', marginBottom: '8px' }}>Manual Sections</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {Object.entries(manualContent).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: 'none',
                background: activeSection === key ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                color: activeSection === key ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
            >
              <section.icon size={18} />
              <span style={{ fontWeight: activeSection === key ? 600 : 400, fontSize: '14px' }}>{section.title}</span>
              {activeSection === key && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="glass" style={{ borderRadius: '24px', padding: '48px', overflowY: 'auto', position: 'relative' }}>
         <div style={{ position: 'absolute', right: '40px', top: '40px', opacity: 0.1 }}>
            <current.icon size={120} color="var(--accent-primary)" />
         </div>

         <div style={{ maxWidth: '700px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <current.icon size={24} color="var(--accent-primary)" />
               </div>
               <h2 style={{ fontSize: '28px', fontWeight: 700 }}>How to use: {current.title}</h2>
            </div>

            <p style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '40px' }}>
              {current.description}
            </p>

            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
              Core Functionalities
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
               {current.points.map((point, i) => (
                 <div key={i} style={{ display: 'flex', gap: '16px', padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                       {i + 1}
                    </div>
                    <span style={{ fontSize: '15px', lineHeight: '1.5' }}>{point}</span>
                 </div>
               ))}
            </div>

            <div style={{ marginTop: '60px', padding: '24px', borderRadius: '16px', background: 'rgba(99, 102, 241, 0.05)', border: '1px dashed var(--accent-primary)', display: 'flex', gap: '16px', alignItems: 'center' }}>
               <HelpCircle size={24} color="var(--accent-primary)" />
               <div>
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>Need further assistance?</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Contact the support team for detailed training on this module.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default UserManual;
