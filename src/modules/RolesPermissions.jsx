import React, { useState } from 'react';
import { Shield, Plus, Check, ChevronRight, X } from 'lucide-react';

const RolesPermissions = () => {
  const [selectedRole, setSelectedRole] = useState('Project Manager');
  const [roles, setRoles] = useState(['Super Admin', 'Project Manager', 'Contractor', 'Consultant', 'HSE Manager']);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  // Permission state per role
  const [permissionsState, setPermissionsState] = useState({
    'Super Admin': ['view_dashboard', 'customize_widgets', 'export_reports', 'start_workflow', 'approve_steps', 'delete_workflow', 'override_rules', 'submit_rfi', 'submit_ipc', 'view_sensitive'],
    'Project Manager': ['view_dashboard', 'customize_widgets', 'start_workflow', 'approve_steps', 'submit_rfi'],
    'Contractor': ['view_dashboard', 'start_workflow', 'submit_rfi'],
    'Consultant': ['view_dashboard', 'approve_steps'],
    'HSE Manager': ['view_dashboard', 'start_workflow']
  });

  const permissionGroups = [
    {
      name: 'Dashboard',
      permissions: [
        { id: 'view_dashboard', label: 'View Dashboard' },
        { id: 'customize_widgets', label: 'Customize Widgets' },
        { id: 'export_reports', label: 'Export Reports' },
      ]
    },
    {
      name: 'Workflows',
      permissions: [
        { id: 'start_workflow', label: 'Start New Workflow' },
        { id: 'approve_steps', label: 'Approve Workflow Steps' },
        { id: 'delete_workflow', label: 'Delete Workflows' },
        { id: 'override_rules', label: 'Override Rules' },
      ]
    },
    {
      name: 'Documents',
      permissions: [
        { id: 'submit_rfi', label: 'Submit RFI' },
        { id: 'submit_ipc', label: 'Submit IPC' },
        { id: 'view_sensitive', label: 'View Sensitive Docs' },
      ]
    }
  ];

  const handleCreateRole = (e) => {
    e.preventDefault();
    if (newRoleName && !roles.includes(newRoleName)) {
      setRoles([...roles, newRoleName]);
      setPermissionsState({ ...permissionsState, [newRoleName]: [] });
      setSelectedRole(newRoleName);
      setShowRoleForm(false);
      setNewRoleName('');
    }
  };

  const togglePermission = (permId) => {
    const currentPerms = permissionsState[selectedRole] || [];
    const newPerms = currentPerms.includes(permId)
      ? currentPerms.filter(id => id !== permId)
      : [...currentPerms, permId];
    
    setPermissionsState({
      ...permissionsState,
      [selectedRole]: newPerms
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', height: '100%', position: 'relative' }}>
      {/* Role Creation Modal */}
      {showRoleForm && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="glass" style={{ width: '400px', padding: '32px', borderRadius: '24px', border: '1px solid var(--accent-primary)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Create New Role</h3>
              <button onClick={() => setShowRoleForm(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateRole}>
               <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Role Name</label>
               <input 
                required
                type="text" 
                style={{ width: '100%', marginBottom: '24px' }} 
                placeholder="e.g. Finance Officer"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
               />
               <button type="submit" className="btn-primary" style={{ width: '100%' }}>Create Role</button>
            </form>
          </div>
        </div>
      )}

      {/* Roles List */}
      <div className="glass" style={{ borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Roles</h3>
          <button 
            className="btn-ghost" 
            onClick={() => setShowRoleForm(true)}
            style={{ padding: '4px 8px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Plus size={14} /> Add
          </button>
        </div>
        <div style={{ padding: '12px', overflowY: 'auto' }}>
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                borderRadius: '10px',
                border: 'none',
                background: selectedRole === role ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                color: selectedRole === role ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '4px'
              }}
            >
              <span style={{ fontWeight: selectedRole === role ? 600 : 400 }}>{role}</span>
              {selectedRole === role && <ChevronRight size={16} />}
            </button>
          ))}
        </div>
      </div>

      {/* Permissions Builder */}
      <div className="glass" style={{ borderRadius: '16px', padding: '32px', overflowY: 'auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={20} color="var(--accent-primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 600 }}>{selectedRole} Permissions</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Define granular access levels for this role</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {permissionGroups.map((group) => (
            <div key={group.name}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                {group.name}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {group.permissions.map((perm) => {
                  const isEnabled = (permissionsState[selectedRole] || []).includes(perm.id);
                  return (
                    <div 
                      key={perm.id} 
                      onClick={() => togglePermission(perm.id)}
                      style={{ 
                        padding: '16px', 
                        borderRadius: '12px', 
                        border: '1px solid var(--surface-border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: isEnabled ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        border: `2px solid ${isEnabled ? 'var(--accent-secondary)' : 'var(--surface-border)'}`,
                        background: isEnabled ? 'var(--accent-secondary)' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isEnabled && <Check size={14} color="white" strokeWidth={4} />}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500 }}>{perm.label}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{perm.id}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <button className="btn-ghost">Reset Changes</button>
          <button className="btn-primary" onClick={() => alert('Permissions saved successfully!')}>Save Permissions</button>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissions;
