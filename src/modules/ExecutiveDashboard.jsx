import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Settings, 
  Activity, 
  MapPin, 
  Calendar, 
  Filter, 
  Download, 
  Layout,
  ChevronDown,
  Clock,
  Bell,
  User,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lock,
  LogOut,
  ChevronRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileSettings from './ProfileSettings';

const ExecutiveDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [config, setConfig] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Animation States
  const [pieAnimationProgress, setPieAnimationProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  
  // View State: 'dashboard' | 'profile'
  const [activeView, setActiveView] = useState('dashboard');
  
  // Interactive States
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const notifications = [
    { id: 1, text: "New RFI-142 submitted by MEP Contractor", time: "2 mins ago", type: "info", icon: Info, color: "#3b82f6" },
    { id: 2, text: "Budget Alert: Steel costs exceeded threshold", time: "1 hour ago", type: "warning", icon: AlertTriangle, color: "#f59e0b" },
    { id: 3, text: "Safety Milestone: 500k Hours without LTI", time: "3 hours ago", type: "success", icon: CheckCircle2, color: "#10b981" },
    { id: 4, text: "Project Schedule: Concrete pouring delayed in Zone B", time: "5 hours ago", type: "warning", icon: AlertTriangle, color: "#ef4444" }
  ];

  const filters = ["All", "Civil", "MEP", "Structural", "Architectural"];

  useEffect(() => {
    const saved = localStorage.getItem('dashboardConfig');
    if (saved) {
      setConfig(JSON.parse(saved));
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    let startTime = null;
    const duration = 1200;

    const animatePie = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setPieAnimationProgress(percentage);
      if (percentage < 1) requestAnimationFrame(animatePie);
    };
    requestAnimationFrame(animatePie);

    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfileMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDateTime = (date) => {
    const options = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Executive Report Generated Successfully (PDF)");
    }, 2000);
  };

  if (!config) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'rgba(255,255,255,0.3)' }}>
        <p>No dashboard configuration found. Please ask an Admin to publish the design.</p>
      </div>
    );
  }

  const cardStyle = {
    background: '#0a1229', 
    borderRadius: '12px',
    border: '1px solid rgba(59, 130, 246, 0.25)', 
    boxShadow: `
      0 0 20px rgba(0, 0, 0, 0.4), 
      0 0 10px rgba(59, 130, 246, 0.15), 
      inset 0 0 15px rgba(59, 130, 246, 0.05)
    `,
    transition: 'all 0.3s ease',
    cursor: 'default',
    position: 'relative',
    overflow: 'hidden'
  };

  const renderSparkline = (color, type) => {
    const points = type === 'up' 
      ? "0,95 15,92 30,94 45,85 60,88 75,75 90,78 100,60"
      : "0,60 15,65 30,62 45,85 60,80 75,95 90,92 100,98";
    
    return (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50px', overflow: 'hidden', pointerEvents: 'none' }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <path 
            d={`M${points}`} 
            fill="none" 
            stroke={color} 
            strokeWidth="3.5" 
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ opacity: 0.9 }}
          />
        </svg>
      </div>
    );
  };

  const renderWidget = (slotId) => {
    const slot = config.slots[slotId];
    if (!slot) return (
      <div style={{ ...cardStyle, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
         <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.1)' }}>Empty Slot</p>
      </div>
    );

    return (
      <div 
        style={{ ...cardStyle, height: '100%', padding: '24px', display: 'flex', flexDirection: 'column' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.25), inset 0 0 20px rgba(59, 130, 246, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.25)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.4), 0 0 10px rgba(59, 130, 246, 0.15), inset 0 0 15px rgba(59, 130, 246, 0.05)';
        }}
      >
        <h4 style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1.2px' }}>{slot.name}</h4>
        
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', minHeight: 0, paddingTop: '30px' }}>
          {slot.type === 'Pie Chart' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '48px', width: '100%', justifyContent: 'center' }}>
              <div style={{ 
                width: '210px', height: '210px', borderRadius: '50%', 
                background: `conic-gradient(
                  ${config.accentColor} 0% ${45 * pieAnimationProgress}%, 
                  #a855f7 ${45 * pieAnimationProgress}% ${70 * pieAnimationProgress}%, 
                  #0ea5e9 ${70 * pieAnimationProgress}% ${80 * pieAnimationProgress}%, 
                  #06b6d4 ${80 * pieAnimationProgress}% ${90 * pieAnimationProgress}%, 
                  #10b981 ${90 * pieAnimationProgress}% ${100 * pieAnimationProgress}%
                )`, 
                position: 'relative',
                flexShrink: 0,
                boxShadow: '0 0 60px rgba(59, 130, 246, 0.4), inset 0 0 40px rgba(0,0,0,0.6)'
              }}>
                 <div style={{ position: 'absolute', top: '55px', left: '55px', width: '100px', height: '100px', borderRadius: '50%', background: '#0a1229', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 900, color: 'white', border: '1px solid rgba(59, 130, 246, 0.3)', boxShadow: '0 0 25px rgba(0,0,0,0.6)' }}>
                    ETB 2.0B
                 </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(slot.data || []).map(d => (
                  <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: d.color, boxShadow: `0 0 10px ${d.color}` }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{d.label}</span>
                    <span style={{ color: 'white', fontWeight: 800 }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slot.type === 'Discipline Progress' && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {(slot.data || []).map(d => (
                <div key={d.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{d.label}</span>
                    <span style={{ fontWeight: 800, color: 'white' }}>{d.value}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}>
                    <div style={{ width: `${d.value}%`, height: '100%', background: d.color || '#3b82f6', borderRadius: '4px', boxShadow: `0 0 10px ${d.color || '#3b82f6'}80` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {slot.type === 'Insights List' && (
             <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {(slot.data || []).slice(0, 3).map(d => (
                  <div key={d.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: d.color, marginTop: '6px', flexShrink: 0, boxShadow: `0 0 12px ${d.color}` }} />
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>{d.text}</div>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>{d.sub}</p>
                    </div>
                  </div>
                ))}
             </div>
          )}

          {slot.type === 'Double Line Chart' && (
            <div style={{ height: '160px', width: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
               <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                 <path d="M0,40 Q20,35 40,30 T80,20 T100,10" fill="none" stroke={config.accentColor} strokeWidth="3.5" strokeLinecap="round" />
                 <path d="M0,40 Q20,38 40,35 T80,25 T100,15" fill="none" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" />
               </svg>
            </div>
          )}

          {slot.type === 'Alerts List' && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
               {(slot.data || []).map(d => (
                 <div key={d.id} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                   <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${d.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${d.color}30` }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: d.color, boxShadow: `0 0 10px ${d.color}` }} />
                   </div>
                   <div>
                     <p style={{ fontSize: '15px', fontWeight: 700, color: 'white' }}>{d.count}</p>
                     <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{d.sub}</p>
                   </div>
                 </div>
               ))}
            </div>
          )}

          {slot.type === 'Risks Table' && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
               {(slot.data || []).map(d => (
                 <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{d.text}</span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: d.level === 'High' ? '#ef4444' : '#f59e0b' }}>{d.impact}</span>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      background: '#020617', 
      minHeight: '100vh', 
      width: '100%',
      padding: '24px 32px',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      
      <style>
        {`
          @keyframes pulse-green {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
            100% { opacity: 1; transform: scale(1); }
          }
          .pulse-live {
            animation: pulse-green 2s infinite ease-in-out;
          }
        `}
      </style>

      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
           {activeView !== 'dashboard' ? (
              <button 
                onClick={() => setActiveView('dashboard')}
                style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 24px', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}
              >
                 <ArrowLeft size={18} color="#3b82f6" /> Back to Dashboard
              </button>
           ) : (
              <>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `linear-gradient(135deg, #3b82f6, #a855f7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px rgba(59, 130, 246, 0.4)`, flexShrink: 0 }}>
                   <Activity size={28} color="white" />
                </div>
                <div>
                   <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '2px', letterSpacing: '-0.5px' }}>{config.projectName}</h1>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', padding: '2px 10px', borderRadius: '5px' }}>
                         <MapPin size={12} color="#3b82f6" /> {config.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#10b981', fontWeight: 800 }}>
                        <span className="pulse-live">●</span> LIVE
                      </div>
                   </div>
                </div>
              </>
           )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 700 }}>
                 <Clock size={18} color="#3b82f6" />
                 {formatDateTime(currentTime)}
              </div>
              <div ref={notificationRef} style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowNotifications(!showNotifications)}>
                 <Bell size={24} color={showNotifications ? "#3b82f6" : "rgba(255,255,255,0.6)"} />
                 <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: `2px solid #020617` }} />
                 
                 {showNotifications && (
                   <div style={{ position: 'absolute', top: '40px', right: 0, width: '320px', background: '#0a1229', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '12px', zIndex: 100, boxShadow: '0 10px 40px rgba(0,0,0,0.8)', padding: '16px' }}>
                      <h5 style={{ fontSize: '13px', fontWeight: 800, marginBottom: '16px', color: 'rgba(255,255,255,0.5)' }}>NOTIFICATIONS</h5>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {notifications.map(n => (
                          <div key={n.id} style={{ display: 'flex', gap: '12px', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
                             <n.icon size={16} color={n.color} style={{ marginTop: '2px' }} />
                             <div>
                               <p style={{ fontSize: '12px', fontWeight: 600 }}>{n.text}</p>
                               <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{n.time}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                   </div>
                 )}
              </div>
           </div>

           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '10px', gap: '4px' }}>
                 {filters.map(f => (
                   <button 
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: activeFilter === f ? '#3b82f6' : 'transparent', color: activeFilter === f ? 'white' : 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                   >
                     {f}
                   </button>
                 ))}
              </div>
              <button 
                onClick={handleExport}
                disabled={isExporting}
                style={{ ...cardStyle, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                 {isExporting ? <Loader2 size={18} className="spin" /> : <Download size={18} />}
                 {isExporting ? "Exporting..." : "Report"}
              </button>
              <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
              <div ref={profileRef} style={{ position: 'relative' }}>
                <div onClick={() => setShowProfileMenu(!showProfileMenu)} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '4px' }}>
                   <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '12px', fontWeight: 800 }}>Executive</p>
                      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Member</p>
                   </div>
                   <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `linear-gradient(135deg, #3b82f6, #a855f7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)' }}>
                      <User size={22} color="white" />
                   </div>
                </div>
                {showProfileMenu && (
                  <div style={{ position: 'absolute', top: '50px', right: 0, width: '180px', background: '#0a1229', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '12px', zIndex: 100, boxShadow: '0 10px 40px rgba(0,0,0,0.8)', overflow: 'hidden' }}>
                     <button onClick={() => {setActiveView('profile'); setShowProfileMenu(false);}} style={{ width: '100%', padding: '12px 16px', border: 'none', background: 'transparent', color: 'white', fontSize: '13px', fontWeight: 600, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <User size={16} color="#3b82f6" /> Profile
                     </button>
                     <button onClick={handleLogoutClick} style={{ width: '100%', padding: '12px 16px', border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'transparent', color: '#ef4444', fontSize: '13px', fontWeight: 600, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <LogOut size={16} /> Logout
                     </button>
                  </div>
                )}
              </div>
           </div>
        </div>
      </div>

      {/* VIEW CONTENT */}
      {activeView === 'dashboard' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          
          {/* STATS ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
             {[
               { label: 'OVERALL PROGRESS', value: '54%', trend: '▲ 5% from last month', trendColor: '#10b981', graphColor: '#10b981', type: 'up' },
               { label: 'BUDGET UTILIZATION', value: '68%', trend: '● ETB 1.36B / 2.00B', trendColor: '#0ea5e9', graphColor: '#0ea5e9', type: 'up' },
               { label: 'SCHEDULE VARIANCE', value: '-3 Days', trend: '▼ Behind schedule', trendColor: '#ef4444', graphColor: '#ef4444', type: 'down' },
               { label: 'TOTAL COST', value: 'ETB 1.36B', trend: '▲ Variance low', trendColor: '#10b981', graphColor: '#a855f7', type: 'up' },
               { label: 'ACTIVE PACKAGES', value: '124', trend: '▲ 12 active', trendColor: '#10b981', graphColor: '#6366f1', type: 'up' },
               { label: 'SAFETY SCORE', value: '98%', trend: '✓ Excellent', trendColor: '#10b981', graphColor: '#10b981', type: 'up' },
             ].map((stat, i) => (
               <div 
                 key={i} 
                 style={{ ...cardStyle, padding: '24px', height: '170px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
               >
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.5)', marginBottom: '12px', letterSpacing: '1px' }}>{stat.label}</p>
                    <h3 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>{stat.value}</h3>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: stat.trendColor, display: 'flex', alignItems: 'center', gap: '4px' }}>{stat.trend}</p>
                  </div>
                  {renderSparkline(stat.graphColor, stat.type)}
               </div>
             ))}
          </div>

          {/* MIDDLE ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', height: '360px' }}>
             {renderWidget('slot1')}
             {renderWidget('slot2')}
             {renderWidget('slot3')}
          </div>

          {/* BOTTOM ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr', gap: '10px', height: '360px' }}>
             {renderWidget('slot4')}
             {renderWidget('slot5')}
             {renderWidget('slot6')}
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto' }}>
           <ProfileSettings onLogout={onLogout} />
        </div>
      )}

    </div>
  );
};

export default ExecutiveDashboard;
