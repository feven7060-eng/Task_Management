import React, { useState } from 'react';
import { UserPlus, MoreVertical, Mail, Shield, UserCheck, UserX, X } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alex Rivers', email: 'alex@company.com', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Sarah Chen', email: 'sarah@company.com', role: 'Project Manager', status: 'Active' },
    { id: 3, name: 'John Doe', email: 'john@contractor.com', role: 'Contractor', status: 'Inactive' },
    { id: 4, name: 'Elena Rodriguez', email: 'elena@hse.com', role: 'HSE Manager', status: 'Active' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Contractor' });

  const handleCreateUser = (e) => {
    e.preventDefault();
    const userToAdd = {
      id: users.length + 1,
      ...newUser,
      status: 'Active',
      defaultPassword: 'Password123!' // Default password as requested
    };
    setUsers([...users, userToAdd]);
    setShowForm(false);
    setNewUser({ name: '', email: '', role: 'Contractor' });
    alert(`User created! Default password: ${userToAdd.defaultPassword}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      {/* Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 600 }}>System Users</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Manage organizational access and roles</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => setShowForm(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <UserPlus size={18} />
          Create New User
        </button>
      </div>

      {/* Create User Form Overlay */}
      {showForm && (
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
              <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Register New User</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Full Name</label>
                <input 
                  required
                  type="text" 
                  style={{ width: '100%' }} 
                  placeholder="e.g. John Smith" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Email Address</label>
                <input 
                  required
                  type="email" 
                  style={{ width: '100%' }} 
                  placeholder="john@example.com" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Assigned Role</label>
                <select 
                  style={{ width: '100%' }}
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option>Project Manager</option>
                  <option>Contractor</option>
                  <option>Consultant</option>
                  <option>HSE Manager</option>
                </select>
              </div>
              <div style={{ marginTop: '12px' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Note: The user will be created with the default password <strong>Password123!</strong></p>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Register & Send Invitation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {[
          { label: 'Total Users', value: users.length, icon: Shield, color: 'var(--accent-primary)' },
          { label: 'Active Now', value: users.filter(u => u.status === 'Active').length, icon: UserCheck, color: 'var(--accent-secondary)' },
          { label: 'Pending Invitations', value: '5', icon: Mail, color: '#f59e0b' },
          { label: 'Deactivated', value: users.filter(u => u.status === 'Inactive').length, icon: UserX, color: 'var(--accent-danger)' },
        ].map((stat, i) => (
          <div key={i} className="glass" style={{ padding: '20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <stat.icon size={20} color={stat.color} />
            </div>
            <h4 style={{ fontSize: '24px', fontWeight: 700 }}>{stat.value}</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table Container */}
      <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>USER</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>ROLE</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>STATUS</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--surface-border)' }} className="table-row-hover">
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: 'var(--accent-primary)' }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{user.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ fontSize: '13px', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '6px' }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span className={`badge ${user.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <button className="btn-ghost" style={{ padding: '6px' }}><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style>{`
        .table-row-hover:hover {
          background: rgba(255, 255, 255, 0.01);
        }
      `}</style>
    </div>
  );
};

export default UserManagement;
