import React, { useState } from 'react';
import { Plus, Users, User, Calendar, MoreVertical, X, Check, Search } from 'lucide-react';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Dubai Creek Harbor', pm: 'Alex Rivers', members: 12, status: 'Active', deadline: '2026-12-15' },
    { id: 2, name: 'NEOM Line Phase 1', pm: 'Sarah Chen', members: 45, status: 'Planning', deadline: '2027-01-20' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', pm: 'Sarah Chen', members: [], deadline: '' });

  const pmOptions = ['Alex Rivers', 'Sarah Chen', 'John Doe', 'Elena Rodriguez'];
  const userOptions = ['Michael Scott', 'Jim Halpert', 'Pam Beesly', 'Dwight Schrute', 'Stanley Hudson'];

  const handleCreateProject = (e) => {
    e.preventDefault();
    setProjects([
      ...projects,
      {
        id: projects.length + 1,
        ...newProject,
        members: Math.floor(Math.random() * 10) + 5, // Random member count for mock
        status: 'Active'
      }
    ]);
    setShowForm(false);
    setNewProject({ name: '', pm: 'Sarah Chen', members: [], deadline: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Project Portfolio</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Oversee and manage industrial project deployments</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} />
          Create New Project
        </button>
      </div>

      {/* Create Project Modal */}
      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="glass" style={{ width: '500px', padding: '32px', borderRadius: '24px', border: '1px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Launch New Project</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Project Name</label>
                <input 
                  required
                  type="text" 
                  style={{ width: '100%' }} 
                  placeholder="e.g. Solar Farm Phase II"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Project Manager</label>
                  <select style={{ width: '100%' }} value={newProject.pm} onChange={(e) => setNewProject({...newProject, pm: e.target.value})}>
                    {pmOptions.map(pm => <option key={pm} value={pm}>{pm}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Deadline</label>
                  <input 
                    type="date" 
                    style={{ width: '100%' }}
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Assign Team Members</label>
                <div style={{ maxHeight: '120px', overflowY: 'auto', border: '1px solid var(--surface-border)', borderRadius: '8px', padding: '8px' }}>
                   {userOptions.map(user => (
                     <div key={user} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px' }}>
                        <input type="checkbox" style={{ width: 'auto' }} />
                        <span style={{ fontSize: '13px' }}>{user}</span>
                     </div>
                   ))}
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Initialize Project</button>
            </form>
          </div>
        </div>
      )}

      {/* Project Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {projects.map(project => (
          <div key={project.id} className="glass" style={{ padding: '24px', borderRadius: '20px', border: '1px solid var(--surface-border)', transition: 'transform 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{project.name}</h4>
                <span style={{ 
                  fontSize: '11px', 
                  padding: '3px 8px', 
                  borderRadius: '6px', 
                  background: project.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  color: project.status === 'Active' ? '#10b981' : '#f59e0b',
                  fontWeight: 600
                }}>
                  {project.status.toUpperCase()}
                </span>
              </div>
              <button className="btn-ghost" style={{ padding: '4px' }}><MoreVertical size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={16} color="var(--accent-primary)" />
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>PM: <strong>{project.pm}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={16} color="var(--accent-primary)" />
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Team: <strong>{project.members} Members</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={16} color="var(--accent-primary)" />
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Deadline: <strong>{project.deadline}</strong></span>
              </div>
            </div>

            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginBottom: '8px' }}>
               <div style={{ width: '45%', height: '100%', background: 'var(--accent-primary)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <span>Phase: Construction</span>
              <span>45% Complete</span>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
               <button className="btn-primary" style={{ flex: 1, padding: '8px', fontSize: '13px' }}>Dashboard</button>
               <button className="btn-ghost" style={{ flex: 1, padding: '8px', fontSize: '13px' }}>Resources</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement;
