import React, { useState } from 'react';
import { 
  Layout, 
  Maximize, 
  BarChart3, 
  PieChart, 
  LineChart,
  MousePointer2, 
  Settings, 
  Plus, 
  X, 
  Move,
  ChevronDown,
  Clock,
  User,
  AlertCircle,
  Palette,
  Calendar,
  Filter,
  Download,
  Activity,
  MapPin,
  Image
} from 'lucide-react';

const DashboardBuilder = () => {
  // Load initial state from localStorage if available
  const savedConfig = JSON.parse(localStorage.getItem('dashboardConfig') || '{}');

  const [dashboardColor, setDashboardColor] = useState(savedConfig.accentColor || '#6366f1');
  const [canvasBgColor, setCanvasBgColor] = useState(savedConfig.bgColor || '#020617');
  const [projectName, setProjectName] = useState(savedConfig.projectName || 'Enter Your Project Name');
  const [location, setLocation] = useState(savedConfig.location || 'Enter Your Location');

  const getDemoData = (type) => {
    switch(type) {
      case 'Pie Chart':
        return [
          { label: 'Construction', value: 45, color: dashboardColor },
          { label: 'MEP Works', value: 25, color: '#a855f7' },
          { label: 'Design', value: 10, color: '#0ea5e9' },
          { label: 'Procurement', value: 10, color: '#06b6d4' },
          { label: 'Others', value: 10, color: '#10b981' }
        ];
      case 'Discipline Progress':
        return [
          { label: 'Civil Works', value: 65 },
          { label: 'MEP Works', value: 52 },
          { label: 'Architectural', value: 48 },
          { label: 'Structural Steel', value: 41 },
          { label: 'Finishes', value: 30 }
        ];
      case 'Insights List':
        return [
          { id: 1, type: 'High', text: 'Schedule Risk Detected', sub: 'Delay in Zone B may affect completion by 5 days.', color: '#ef4444' },
          { id: 2, type: 'Medium', text: 'Budget Alert', sub: 'Steel cost escalation may overrun ETB 45M.', color: '#f59e0b' },
          { id: 3, type: 'Positive', text: 'Safety Performance', sub: 'Safety score is excellent this month.', color: '#10b981' }
        ];
      case 'Alerts List':
        return [
          { id: 1, count: '3 critical tasks', sub: 'Action required', color: '#ef4444' },
          { id: 2, count: '24 pending approvals', sub: 'Review your attention', color: '#f59e0b' },
          { id: 3, count: 'New RFI submitted', sub: 'RFI-145 from MEP Contractor', color: dashboardColor }
        ];
      case 'Risks Table':
        return [
          { id: 1, text: 'Delay in MEP installation', level: 'High', impact: '12 Days' },
          { id: 2, text: 'Material price escalation', level: 'Medium', impact: '18 Days' },
          { id: 3, text: 'Adverse weather impact', level: 'Medium', impact: '9 Days' }
        ];
      default: return [];
    }
  };

  const [slots, setSlots] = useState(savedConfig.slots || {
    slot1: { name: 'Budget Breakdown', type: 'Pie Chart', data: getDemoData('Pie Chart') },
    slot2: { name: 'Progress by Discipline', type: 'Discipline Progress', data: getDemoData('Discipline Progress') },
    slot3: { name: 'AI Insights', type: 'Insights List', data: getDemoData('Insights List') },
    slot4: { name: 'Cost Performance (ETB)', type: 'Double Line Chart', data: [] },
    slot5: { name: 'Alerts & Notifications', type: 'Alerts List', data: getDemoData('Alerts List') },
    slot6: { name: 'Top Risks', type: 'Risks Table', data: getDemoData('Risks Table') }
  });

  // Save to localStorage whenever anything changes
  React.useEffect(() => {
    const config = {
      accentColor: dashboardColor,
      bgColor: canvasBgColor,
      projectName,
      location,
      slots
    };
    localStorage.setItem('dashboardConfig', JSON.stringify(config));
  }, [dashboardColor, canvasBgColor, projectName, location, slots]);

  const [draggedWidget, setDraggedWidget] = useState(null);
  const [editingWidgetId, setEditingWidgetId] = useState(null);

  const visualizationTypes = [
    { label: 'Bar Chart', icon: BarChart3 },
    { label: 'Line Chart', icon: LineChart },
    { label: 'Pie Chart', icon: PieChart },
    { label: 'List View', icon: Settings },
    { label: 'Discipline Progress', icon: Layout },
    { label: 'Insights List', icon: Activity },
  ];

  const widgetLibrary = [
    { id: 'budget', name: 'Budget Breakdown', type: 'Pie Chart' },
    { id: 'discipline', name: 'Discipline Progress', type: 'Discipline Progress' },
    { id: 'insights', name: 'AI Insights', type: 'Insights List' },
    { id: 'cost', name: 'Cost Performance', type: 'Double Line Chart' },
    { id: 'alerts', name: 'Alerts & Notifications', type: 'Alerts List' },
    { id: 'risks', name: 'Top Risks', type: 'Risks Table' }
  ];

  const onDragStart = (widget) => setDraggedWidget(widget);

  const onDrop = (slotId) => {
    if (draggedWidget) {
      const widgetWithData = { id: Date.now(), ...draggedWidget, data: getDemoData(draggedWidget.type) };
      setSlots({ ...slots, [slotId]: widgetWithData });
      setDraggedWidget(null);
    }
  };

  const changeVizType = (slotId, newType) => {
    setSlots({ 
      ...slots, 
      [slotId]: { ...slots[slotId], type: newType, data: getDemoData(newType) } 
    });
    setEditingWidgetId(null);
  };

  const renderSlot = (slotId, title) => {
    const slot = slots[slotId];
    return (
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => onDrop(slotId)}
        className="glass" 
        style={{ 
          height: '100%', 
          borderRadius: '16px', 
          padding: '18px', 
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: 'rgba(5, 10, 20, 0.4)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{slot?.name || title}</h4>
            {slot && (
              <div 
                onClick={() => setEditingWidgetId(editingWidgetId === slotId ? null : slotId)}
                style={{ fontSize: '9px', color: dashboardColor, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px', fontWeight: 700 }}
              >
                {slot.type} <ChevronDown size={10} />
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
             {slot && <X size={12} color="rgba(255,255,255,0.2)" style={{ cursor: 'pointer' }} onClick={() => setSlots({...slots, [slotId]: null})} />}
             <Settings size={12} color="rgba(255,255,255,0.2)" />
          </div>
        </div>

        {/* Visualization Selector Dropdown */}
        {editingWidgetId === slotId && (
          <div className="glass" style={{ 
            position: 'absolute', 
            top: '50px', 
            left: '12px', 
            right: '12px', 
            zIndex: 100, 
            borderRadius: '12px', 
            padding: '10px',
            background: 'rgba(10, 15, 30, 0.98)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            border: `1px solid ${dashboardColor}`,
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {visualizationTypes.map((vType) => (
                <button
                  key={vType.label}
                  onClick={() => changeVizType(slotId, vType.label)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    background: slot.type === vType.label ? `${dashboardColor}10` : 'transparent',
                    color: slot.type === vType.label ? dashboardColor : 'white',
                    cursor: 'pointer',
                    fontSize: '10px',
                    textAlign: 'left'
                  }}
                >
                  <vType.icon size={12} /> {vType.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {!slot ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(255,255,255,0.05)', borderRadius: '12px' }}>
             <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>Drop Widget</p>
          </div>
        ) : (
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {slot.type === 'Pie Chart' && (
               <div style={{ display: 'flex', alignItems: 'center', gap: '20px', height: '100%' }}>
                  <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: `conic-gradient(${dashboardColor} 0% 45%, #a855f7 45% 70%, #0ea5e9 70% 80%, #06b6d4 80% 90%, #10b981 90% 100%)`, position: 'relative', flexShrink: 0 }}>
                    <div style={{ position: 'absolute', top: '18px', left: '18px', width: '54px', height: '54px', borderRadius: '50%', background: '#050a14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700 }}>ETB 2.0B</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {(slot.data || []).map(d => (
                      <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: d.color }} />
                        <span style={{ color: d.color, opacity: 0.8 }}>{d.value}%</span>
                      </div>
                    ))}
                  </div>
               </div>
             )}

             {slot.type === 'Discipline Progress' && (
               <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                 {(slot.data || []).map(d => (
                   <div key={d.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)' }}>{d.label}</span>
                        <span style={{ fontWeight: 600 }}>{d.value}%</span>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                        <div style={{ width: `${d.value}%`, height: '100%', background: '#10b981', borderRadius: '2px' }} />
                      </div>
                   </div>
                 ))}
               </div>
             )}

             {slot.type === 'Insights List' && (
               <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(slot.data || []).slice(0, 3).map(d => (
                    <div key={d.id} style={{ display: 'flex', gap: '10px' }}>
                       <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color, marginTop: '2px', flexShrink: 0 }} />
                       <div>
                          <div style={{ fontSize: '12px', fontWeight: 600 }}>{d.text}</div>
                          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{d.sub}</p>
                       </div>
                    </div>
                  ))}
               </div>
             )}

             {slot.type === 'Double Line Chart' && (
               <div style={{ height: '100px', width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                  <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0,40 Q20,35 40,30 T80,20 T100,10" fill="none" stroke={dashboardColor} strokeWidth="1" />
                    <path d="M0,40 Q20,38 40,35 T80,25 T100,15" fill="none" stroke="#a855f7" strokeWidth="1" />
                  </svg>
               </div>
             )}

             {slot.type === 'Alerts List' && (
               <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(slot.data || []).map(d => (
                    <div key={d.id} style={{ display: 'flex', gap: '12px' }}>
                       <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: d.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '8px' }}>!</div>
                       <div>
                          <p style={{ fontSize: '12px', fontWeight: 600 }}>{d.count}</p>
                          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{d.sub}</p>
                       </div>
                    </div>
                  ))}
               </div>
             )}

             {slot.type === 'Risks Table' && (
               <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(slot.data || []).map(d => (
                    <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                       <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{d.text}</span>
                       <span style={{ fontSize: '10px', fontWeight: 700, color: d.level === 'High' ? '#ef4444' : '#f59e0b' }}>{d.impact}</span>
                    </div>
                  ))}
               </div>
             )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '240px 1fr 280px', 
      gap: '16px', 
      height: 'calc(100vh - 100px)',
      padding: '0',
      color: 'white',
      overflow: 'hidden'
    }}>
      
      {/* Widget Library (Left) */}
      <div className="glass" style={{ borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '20px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>WIDGET LIBRARY</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
          {widgetLibrary.map(w => (
            <div 
              key={w.id}
              draggable
              onDragStart={() => onDragStart(w)}
              style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', cursor: 'grab', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <Move size={14} color={dashboardColor} />
              {w.name}
            </div>
          ))}
        </div>
      </div>

      {/* Executive Canvas (Center) */}
      <div 
        className="glass"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px', 
          overflowY: 'auto', 
          padding: '28px', 
          borderRadius: '32px',
          background: canvasBgColor, 
          border: `1px solid rgba(255,255,255,0.05)`,
          transition: 'background 0.5s ease'
        }}
      >
        
        {/* Executive Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `linear-gradient(135deg, ${dashboardColor}, #a855f7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 14px ${dashboardColor}30` }}>
                <Activity size={24} color="white" />
              </div>
              <div>
                 <input 
                  type="text" 
                  value={projectName} 
                  onChange={(e) => setProjectName(e.target.value)}
                  style={{ background: 'transparent', border: 'none', fontSize: '24px', fontWeight: 800, color: 'white', outline: 'none', width: 'auto', minWidth: '400px' }}
                  onFocus={(e) => e.target.value === 'Enter Your Project Name' && setProjectName('')}
                  onBlur={(e) => e.target.value === '' && setProjectName('Enter Your Project Name')}
                 />
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', padding: '2px 10px', borderRadius: '6px' }}>
                       <MapPin size={12} color={dashboardColor} />
                       <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: 'inherit', fontSize: 'inherit', outline: 'none', width: '150px' }}
                        onFocus={(e) => e.target.value === 'Enter Your Location' && setLocation('')}
                        onBlur={(e) => e.target.value === '' && setLocation('Enter Your Location')}
                       />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 10px', borderRadius: '6px', fontWeight: 700 }}>
                       <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} /> Live
                    </div>
                 </div>
              </div>
           </div>
           <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>AD</div>
           </div>
        </div>

        {/* Static Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px' }}>
           {[
             { label: 'PROGRESS', value: '54%', color: '#10b981' },
             { label: 'BUDGET', value: '68%', color: dashboardColor },
             { label: 'VARIANCE', value: '-3d', color: '#ef4444' },
             { label: 'COST', value: '1.36B', color: '#10b981' },
             { label: 'PACKAGES', value: '124', color: dashboardColor },
             { label: 'SAFETY', value: '98%', color: '#10b981' },
           ].map((stat, i) => (
             <div key={i} className="glass" style={{ padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(5, 10, 20, 0.2)', textAlign: 'center' }}>
                <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>{stat.label}</p>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>{stat.value}</h3>
                <div style={{ height: '3px', background: stat.color, marginTop: '10px', width: '30%', margin: '10px auto 0', borderRadius: '2px' }} />
             </div>
           ))}
        </div>

        {/* Configurable Slots */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', height: '210px' }}>
           {renderSlot('slot1', 'Budget Breakdown')}
           {renderSlot('slot2', 'Progress by Discipline')}
           {renderSlot('slot3', 'AI Insights')}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '16px', height: '210px' }}>
           {renderSlot('slot4', 'Cost Performance (ETB)')}
           {renderSlot('slot5', 'Alerts & Notifications')}
           {renderSlot('slot6', 'Top Risks')}
        </div>
      </div>

      {/* Master Configuration Panel (Right) */}
      <div className="glass" style={{ borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '12px', fontWeight: 700, marginBottom: '24px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '10px' }}>
           <Palette size={16} color={dashboardColor} /> STYLING ENGINE
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '10px' }}>ACCENT COLOR</label>
            <input 
              type="color" 
              value={dashboardColor} 
              onChange={(e) => setDashboardColor(e.target.value)}
              style={{ width: '100%', height: '40px', padding: '0', background: 'transparent', border: 'none', cursor: 'pointer' }} 
            />
          </div>

          <div>
            <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '10px' }}>CANVAS BACKGROUND</label>
            <input 
              type="color" 
              value={canvasBgColor} 
              onChange={(e) => setCanvasBgColor(e.target.value)}
              style={{ width: '100%', height: '40px', padding: '0', background: 'transparent', border: 'none', cursor: 'pointer' }} 
            />
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <button className="btn-primary" style={{ width: '100%', padding: '14px', background: `linear-gradient(to right, ${dashboardColor}, #a855f7)`, border: 'none', fontWeight: 700, fontSize: '12px' }} onClick={() => alert('Configuration Saved!')}>
               SAVE DASHBOARD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBuilder;
