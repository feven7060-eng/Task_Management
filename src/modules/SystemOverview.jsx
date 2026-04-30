import React from 'react';
import { 
  Users, 
  Shield, 
  Database, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp,
  Box,
  Cpu,
  Globe
} from 'lucide-react';

const SystemOverview = () => {
  const stats = [
    { label: 'Total Users', value: '1,284', change: '+12%', trend: 'up', icon: Users, color: '#6366f1' },
    { label: 'Active Roles', value: '14', change: '+2', trend: 'up', icon: Shield, color: '#a855f7' },
    { label: 'Workflows', value: '85', change: '-3%', trend: 'down', icon: Database, color: '#ec4899' },
    { label: 'System Uptime', value: '99.9%', change: '+0.1%', trend: 'up', icon: Activity, color: '#10b981' },
  ];

  const recentActivity = [
    { id: 1, user: 'Alex Rivers', action: 'Created new project', target: 'NEOM Line Phase 1', time: '2m ago' },
    { id: 2, user: 'Sarah Chen', action: 'Updated permissions', target: 'Contractor Role', time: '15m ago' },
    { id: 3, user: 'System', action: 'Automated backup', target: 'Database Cluster B', time: '1h ago' },
    { id: 4, user: 'Elena Rodriguez', action: 'Approved IPC', target: 'Dubai Creek Harbor', time: '2h ago' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass" style={{ padding: '24px', borderRadius: '24px', border: '1px solid var(--surface-border)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.05 }}>
               <stat.icon size={80} color={stat.color} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={24} color={stat.color} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: stat.trend === 'up' ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                {stat.change} {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>{stat.value}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Project Performance Chart (Mock) */}
        <div className="glass" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--surface-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Platform Velocity</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Transaction throughput across all active projects</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-ghost" style={{ fontSize: '12px', padding: '6px 12px' }}>Weekly</button>
              <button className="btn-primary" style={{ fontSize: '12px', padding: '6px 12px' }}>Monthly</button>
            </div>
          </div>
          
          <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '0 10px' }}>
            {[35, 65, 45, 90, 55, 80, 40, 70, 85, 60, 75, 95].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <div style={{ 
                  width: '100%', 
                  height: `${h}%`, 
                  background: 'linear-gradient(to top, var(--accent-primary), #a855f7)', 
                  borderRadius: '6px 6px 0 0',
                  opacity: 0.8,
                  position: 'relative'
                }}>
                   <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: 'var(--text-secondary)' }}>{h}%</div>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity */}
        <div className="glass" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--surface-border)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Live Activity Feed</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {recentActivity.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', lineHeight: '1.4' }}>
                    <strong>{item.user}</strong> {item.action} <strong>{item.target}</strong>
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-ghost" style={{ width: '100%', marginTop: '32px', border: '1px solid var(--surface-border)' }}>View All Activity</button>
        </div>
      </div>

      {/* Global Status Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
         <div className="glass" style={{ padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Globe size={20} color="#10b981" />
            </div>
            <div>
               <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Region</p>
               <p style={{ fontSize: '15px', fontWeight: 600 }}>Middle East & North Africa</p>
            </div>
         </div>
         <div className="glass" style={{ padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Box size={20} color="#f59e0b" />
            </div>
            <div>
               <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Active Assets</p>
               <p style={{ fontSize: '15px', fontWeight: 600 }}>4,250 Managed Units</p>
            </div>
         </div>
         <div className="glass" style={{ padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Cpu size={20} color="var(--accent-primary)" />
            </div>
            <div>
               <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Processing</p>
               <p style={{ fontSize: '15px', fontWeight: 600 }}>AI Performance Analysis Active</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SystemOverview;
