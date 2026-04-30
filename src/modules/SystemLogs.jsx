import React from 'react';
import { Terminal, Filter, Download, Search, AlertCircle, Info, CheckCircle } from 'lucide-react';

const SystemLogs = () => {
  const logs = [
    { id: 1, type: 'info', user: 'Alex Rivers', action: 'Modified Workflow [RFI]', time: '2 mins ago', ip: '192.168.1.1' },
    { id: 2, type: 'warning', user: 'System', action: 'Failed login attempt', time: '15 mins ago', ip: '45.12.33.102' },
    { id: 3, type: 'success', user: 'Sarah Chen', action: 'Created New User [Elena R.]', time: '1 hour ago', ip: '192.168.1.5' },
    { id: 4, type: 'info', user: 'Alex Rivers', action: 'Enabled Module [Finance]', time: '3 hours ago', ip: '192.168.1.1' },
    { id: 5, type: 'error', user: 'System', action: 'Database connection timeout', time: '5 hours ago', ip: 'Internal' },
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'info': return <Info size={14} color="#3b82f6" />;
      case 'warning': return <AlertCircle size={14} color="#f59e0b" />;
      case 'success': return <CheckCircle size={14} color="#10b981" />;
      case 'error': return <AlertCircle size={14} color="#ef4444" />;
      default: return <Info size={14} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Audit Logs</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Complete history of system changes and user activities</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} />
            Filter
          </button>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div className="glass" style={{ padding: '20px', borderRadius: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Logs Today</p>
          <h4 style={{ fontSize: '24px', fontWeight: 700 }}>1,284</h4>
          <div style={{ marginTop: '12px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
            <div style={{ width: '70%', height: '100%', background: 'var(--accent-primary)', borderRadius: '2px' }} />
          </div>
        </div>
        <div className="glass" style={{ padding: '20px', borderRadius: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Security Alerts</p>
          <h4 style={{ fontSize: '24px', fontWeight: 700, color: '#f59e0b' }}>12</h4>
          <div style={{ marginTop: '12px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
            <div style={{ width: '30%', height: '100%', background: '#f59e0b', borderRadius: '2px' }} />
          </div>
        </div>
        <div className="glass" style={{ padding: '20px', borderRadius: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>System Uptime</p>
          <h4 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-secondary)' }}>99.98%</h4>
          <div style={{ marginTop: '12px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
            <div style={{ width: '99%', height: '100%', background: 'var(--accent-secondary)', borderRadius: '2px' }} />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
           <Terminal size={18} color="var(--text-secondary)" />
           <span style={{ fontSize: '14px', fontWeight: 600 }}>Live Feed</span>
           <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Search size={14} color="var(--text-secondary)" />
             <input type="text" placeholder="Search logs..." style={{ height: '32px', fontSize: '12px', width: '200px' }} />
           </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.01)', borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '12px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>TYPE</th>
              <th style={{ padding: '12px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>USER</th>
              <th style={{ padding: '12px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>ACTION</th>
              <th style={{ padding: '12px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>TIMESTAMP</th>
              <th style={{ padding: '12px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>IP ADDRESS</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid var(--surface-border)', fontSize: '13px' }}>
                <td style={{ padding: '12px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {getTypeIcon(log.type)}
                    <span style={{ textTransform: 'capitalize' }}>{log.type}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 24px', fontWeight: 500 }}>{log.user}</td>
                <td style={{ padding: '12px 24px', color: 'var(--text-primary)' }}>{log.action}</td>
                <td style={{ padding: '12px 24px', color: 'var(--text-secondary)' }}>{log.time}</td>
                <td style={{ padding: '12px 24px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '12px 24px', textAlign: 'center' }}>
          <button className="btn-ghost" style={{ width: '100%', fontSize: '12px' }}>Load More Logs</button>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;
