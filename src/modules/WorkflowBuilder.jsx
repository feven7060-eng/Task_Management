import React, { useState } from 'react';
import { GitBranch, Plus, ArrowDown, User, Clock, CheckCircle2, X, Trash2, Settings2, Play } from 'lucide-react';

const WorkflowBuilder = () => {
  const [workflowName, setWorkflowName] = useState('Standard RFI Approval (Construction)');
  const [steps, setSteps] = useState([
    { id: 1, name: 'Contractor Submission', role: 'Contractor', type: 'Input', duration: '24h' },
    { id: 2, name: 'Document Controller Review', role: 'Super Admin', type: 'Review', duration: '12h' },
    { id: 3, name: 'Technical Consultant Review', role: 'Consultant', type: 'Review', duration: '48h' },
    { id: 4, name: 'Final PM Approval', role: 'Project Manager', type: 'Approval', duration: '12h' },
  ]);

  const [showStepForm, setShowStepForm] = useState(false);
  const [newStep, setNewStep] = useState({ name: '', role: 'Contractor', type: 'Review', duration: '24h' });

  const handleAddStep = (e) => {
    e.preventDefault();
    const stepToAdd = {
      id: steps.length > 0 ? Math.max(...steps.map(s => s.id)) + 1 : 1,
      ...newStep
    };
    setSteps([...steps, stepToAdd]);
    setShowStepForm(false);
    setNewStep({ name: '', role: 'Contractor', type: 'Review', duration: '24h' });
  };

  const removeStep = (id) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
      {/* Add Step Modal */}
      {showStepForm && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="glass" style={{ width: '450px', padding: '32px', borderRadius: '24px', border: '1px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Add Workflow Step</h3>
              <button onClick={() => setShowStepForm(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddStep} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Step Name</label>
                <input 
                  required
                  type="text" style={{ width: '100%' }} placeholder="e.g. Quality Inspection"
                  value={newStep.name}
                  onChange={(e) => setNewStep({...newStep, name: e.target.value})}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Assigned Role</label>
                  <select style={{ width: '100%' }} value={newStep.role} onChange={(e) => setNewStep({...newStep, role: e.target.value})}>
                    <option>Contractor</option>
                    <option>Consultant</option>
                    <option>Project Manager</option>
                    <option>HSE Manager</option>
                    <option>Super Admin</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Step Type</label>
                  <select style={{ width: '100%' }} value={newStep.type} onChange={(e) => setNewStep({...newStep, type: e.target.value})}>
                    <option>Input</option>
                    <option>Review</option>
                    <option>Approval</option>
                    <option>Notification</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>SLA Duration (e.g. 24h)</label>
                <input 
                  type="text" style={{ width: '100%' }} placeholder="24h"
                  value={newStep.duration}
                  onChange={(e) => setNewStep({...newStep, duration: e.target.value})}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '12px' }}>Add to Workflow</button>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Editing Workflow:</h3>
             <input 
              type="text" 
              value={workflowName} 
              onChange={(e) => setWorkflowName(e.target.value)}
              style={{ background: 'transparent', border: 'none', borderBottom: '1px dashed var(--surface-border)', padding: '2px', fontSize: '20px', fontWeight: 600, width: 'auto', minWidth: '400px' }}
             />
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Automate multi-party approval sequences across the platform</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Play size={16} /> Test Run
          </button>
          <button className="btn-primary" onClick={() => alert('Workflow deployed successfully!')}>Deploy Workflow</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Card */}
            <div className="glass" style={{ 
              width: '100%', 
              padding: '24px', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '24px',
              border: '1px solid var(--surface-border)',
              position: 'relative',
              background: 'rgba(255,255,255,0.02)',
              transition: 'transform 0.2s'
            }}>
              <div style={{ 
                width: '44px', 
                height: '44px', 
                borderRadius: '14px', 
                background: 'linear-gradient(135deg, var(--accent-primary), #a855f7)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 700,
                color: 'white',
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)',
                fontSize: '18px'
              }}>
                {index + 1}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600 }}>{step.name}</h4>
                  <span style={{ 
                    fontSize: '10px', 
                    background: step.type === 'Approval' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)', 
                    color: step.type === 'Approval' ? '#10b981' : 'var(--text-secondary)',
                    padding: '2px 8px', 
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>
                    {step.type.toUpperCase()}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={14} color="var(--accent-primary)" /> {step.role}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="var(--accent-primary)" /> Target SLA: {step.duration}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-ghost" style={{ padding: '8px' }}><Settings2 size={16} /></button>
                <button 
                  className="btn-ghost" 
                  style={{ padding: '8px', color: '#ef4444' }}
                  onClick={() => removeStep(step.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div style={{ height: '40px', width: '2px', background: 'linear-gradient(to bottom, var(--accent-primary), transparent)', margin: '4px 0', opacity: 0.4 }}>
                 <div style={{ marginLeft: '-9px', marginTop: '10px' }}>
                   <ArrowDown size={20} color="var(--accent-primary)" />
                 </div>
              </div>
            )}
          </React.Fragment>
        ))}

        <button 
          onClick={() => setShowStepForm(true)}
          style={{ 
            marginTop: '24px', 
            width: '100%', 
            height: '64px', 
            borderRadius: '16px', 
            border: '2px dashed var(--surface-border)', 
            background: 'transparent', 
            color: 'var(--text-secondary)', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'all 0.2s',
            fontSize: '15px',
            fontWeight: 500
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(99,102,241,0.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--surface-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
        >
          <Plus size={20} />
          Add Next Step in Sequence
        </button>
      </div>

      <div className="glass" style={{ padding: '32px', borderRadius: '24px', marginTop: '16px', border: '1px solid var(--surface-border)' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
           <Settings2 size={18} color="var(--accent-primary)" /> Advanced Workflow Rules
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)' }}>
             <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Auto-Escalation</p>
             <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>If Consultant review exceeds 48h, notify Project Manager immediately.</p>
          </div>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)' }}>
             <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Parallel Review</p>
             <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Allow multiple consultants to review simultaneously for faster technical approval.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
