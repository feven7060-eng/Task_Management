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
  AlertCircle
} from 'lucide-react';

const DashboardBuilder = () => {
  const initialData = [
    { 
      id: 1, 
      name: 'Monthly Completion Velocity', 
      type: 'Bar Chart', 
      h: 70,
      data: [
        { label: 'Jan', value: 45 },
        { label: 'Feb', value: 72 },
        { label: 'Mar', value: 58 },
        { label: 'Apr', value: 85 },
        { label: 'May', value: 92 }
      ]
    },
    { 
      id: 2, 
      name: 'High Priority Approval Queue', 
      type: 'List View', 
      h: 40,
      data: [
        { id: 'A', text: 'RFI #104: Structural Integrity', status: 'Pending', time: '2h ago' },
        { id: 'B', text: 'IPC #022: Payment Milestone 4', status: 'Urgent', time: '5h ago' },
        { id: 'C', text: 'HSE Report: Site Inspection', status: 'Review', time: '1d ago' }
      ]
    },
  ];

  const [canvasWidgets, setCanvasWidgets] = useState(initialData);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);
  const [editingWidgetId, setEditingWidgetId] = useState(null);

  const visualizationTypes = [
    { label: 'Bar Chart', icon: BarChart3 },
    { label: 'Line Chart', icon: LineChart },
    { label: 'Pie Chart', icon: PieChart },
    { label: 'List View', icon: Settings },
  ];

  const widgetLibrary = [
    { id: 'task-status', name: 'Task Distribution', type: 'Pie Chart' },
    { id: 'workflow-velocity', name: 'Approval Speed', type: 'Line Chart' },
    { id: 'resource-allocation', name: 'Man-Hours Usage', type: 'Bar Chart' },
    { id: 'recent-activity', name: 'Recent Critical Events', type: 'List View' },
  ];

  const generateDemoData = (type) => {
    switch(type) {
      case 'Bar Chart':
        return [
          { label: 'A', value: 40 }, { label: 'B', value: 65 }, { label: 'C', value: 50 }, { label: 'D', value: 80 }
        ];
      case 'Line Chart':
        return [
          { x: 0, y: 30 }, { x: 25, y: 70 }, { x: 50, y: 40 }, { x: 75, y: 90 }, { x: 100, y: 60 }
        ];
      case 'Pie Chart':
        return [
          { label: 'Done', value: 45, color: 'var(--accent-primary)' },
          { label: 'In Progress', value: 35, color: '#f59e0b' },
          { label: 'Blocked', value: 20, color: '#ef4444' }
        ];
      case 'List View':
        return [
          { id: 1, text: 'Safety audit completed in Zone 4', time: '1h ago', icon: AlertCircle },
          { id: 2, text: 'New contractor onboarded', time: '4h ago', icon: User },
          { id: 3, text: 'System backup finalized', time: '8h ago', icon: Clock }
        ];
      default: return [];
    }
  };

  const getIconForType = (type) => {
    const found = visualizationTypes.find(t => t.label === type);
    return found ? found.icon : Settings;
  };

  // Drag and Drop Handlers
  const onDragStart = (e, widget) => {
    e.dataTransfer.setData('widget', JSON.stringify({ name: widget.name, type: widget.type }));
  };

  const onCanvasDragOver = (e) => {
    e.preventDefault();
  };

  const onWidgetDragOver = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOverIndex(index);
  };

  const onCanvasDrop = (e) => {
    e.preventDefault();
    const widgetData = e.dataTransfer.getData('widget');
    if (widgetData) {
      const data = JSON.parse(widgetData);
      setCanvasWidgets([
        ...canvasWidgets,
        { 
          id: Date.now(), 
          name: data.name, 
          type: data.type, 
          h: 70, 
          data: generateDemoData(data.type) 
        }
      ]);
    }
    setDraggedOverIndex(null);
  };

  const onWidgetDrop = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const widgetData = e.dataTransfer.getData('widget');
    if (widgetData) {
      const data = JSON.parse(widgetData);
      const newWidgets = [...canvasWidgets];
      newWidgets.splice(index, 0, { 
        id: Date.now(), 
        name: data.name, 
        type: data.type, 
        h: 70, 
        data: generateDemoData(data.type) 
      });
      setCanvasWidgets(newWidgets);
    }
    setDraggedOverIndex(null);
  };

  const changeVizType = (widgetId, newType) => {
    setCanvasWidgets(canvasWidgets.map(w => 
      w.id === widgetId ? { ...w, type: newType, data: generateDemoData(newType) } : w
    ));
    setEditingWidgetId(null);
  };

  const removeWidget = (id) => {
    setCanvasWidgets(canvasWidgets.filter(w => w.id !== id));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 280px', gap: '20px', height: 'calc(100vh - 120px)' }}>
      {/* Widget Library */}
      <div className="glass" style={{ borderRadius: '16px', padding: '20px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px' }}>Widget Library</h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Drag widgets to the canvas</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {widgetLibrary.map((w) => {
            const Icon = getIconForType(w.type);
            return (
              <div 
                key={w.id} 
                draggable
                onDragStart={(e) => onDragStart(e, w)}
                style={{ 
                  padding: '12px', 
                  borderRadius: '12px', 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid var(--surface-border)',
                  cursor: 'grab',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>
                  <Move size={14} color="var(--text-secondary)" />
                </div>
                <Icon size={18} color="var(--accent-primary)" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{w.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{w.type}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Canvas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
        <div 
          className="glass" 
          onDragOver={onCanvasDragOver}
          onDrop={onCanvasDrop}
          onDragLeave={() => setDraggedOverIndex(null)}
          style={{ 
            flex: 1, 
            borderRadius: '24px', 
            position: 'relative', 
            border: '2px dashed var(--surface-border)', 
            background: 'rgba(255,255,255,0.01)', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gridAutoRows: '220px',
            gap: '16px', 
            padding: '20px',
            overflowY: 'auto'
          }}
        >
          {canvasWidgets.length === 0 && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', opacity: 0.3 }}>
              <MousePointer2 size={48} style={{ marginBottom: '16px' }} />
              <p>Drag widgets here to build the layout</p>
            </div>
          )}
          
          {canvasWidgets.map((w, index) => {
            const Icon = getIconForType(w.type);
            return (
              <div 
                key={w.id} 
                onDragOver={(e) => onWidgetDragOver(e, index)}
                onDrop={(e) => onWidgetDrop(e, index)}
                className="glass" 
                style={{ 
                  borderRadius: '16px', 
                  padding: '20px', 
                  border: draggedOverIndex === index ? '2px solid var(--accent-primary)' : '1px solid var(--surface-border)',
                  background: draggedOverIndex === index ? 'rgba(99, 102, 241, 0.1)' : 'var(--surface-color)',
                  position: 'relative', 
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Widget Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{w.name}</span>
                    <div 
                      onClick={() => setEditingWidgetId(editingWidgetId === w.id ? null : w.id)}
                      style={{ fontSize: '10px', color: 'var(--accent-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}
                    >
                      <Icon size={12} /> {w.type} <ChevronDown size={10} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <X size={14} color="var(--text-secondary)" style={{ cursor: 'pointer' }} onClick={() => removeWidget(w.id)} />
                  </div>
                </div>

                {/* Visualization Selector Dropdown */}
                {editingWidgetId === w.id && (
                  <div className="glass" style={{ 
                    position: 'absolute', 
                    top: '60px', 
                    left: '20px', 
                    right: '20px', 
                    zIndex: 100, 
                    borderRadius: '12px', 
                    padding: '8px',
                    background: 'rgba(10, 10, 15, 0.95)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    border: '1px solid var(--accent-primary)'
                  }}>
                    <p style={{ fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '8px', padding: '0 8px' }}>Select Visualization</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                      {visualizationTypes.map((vType) => (
                        <button
                          key={vType.label}
                          onClick={() => changeVizType(w.id, vType.label)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px',
                            borderRadius: '8px',
                            border: 'none',
                            background: w.type === vType.label ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                            color: w.type === vType.label ? 'var(--accent-primary)' : 'white',
                            cursor: 'pointer',
                            fontSize: '11px',
                            textAlign: 'left'
                          }}
                        >
                          <vType.icon size={14} /> {vType.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Widget Content (Demo Data) */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {w.type === 'Bar Chart' && (
                    <div style={{ height: '100px', width: '100%', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                      {(w.data || []).map((item, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <div style={{ width: '100%', height: `${item.value}%`, background: 'var(--accent-primary)', borderRadius: '4px 4px 0 0', opacity: 0.8 }} />
                          <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {w.type === 'Line Chart' && (
                    <div style={{ width: '100%', height: '80px', position: 'relative' }}>
                       <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0,35 Q20,10 40,25 T80,10 T100,20" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="20" cy="10" r="2" fill="var(--accent-primary)" />
                        <circle cx="80" cy="10" r="2" fill="var(--accent-primary)" />
                      </svg>
                    </div>
                  )}
                  {w.type === 'Pie Chart' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                       <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'conic-gradient(var(--accent-primary) 0% 45%, #f59e0b 45% 80%, #ef4444 80% 100%)', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '15px', left: '15px', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-color)' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {(w.data || []).map((item, i) => (
                           <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                              <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{item.label}: {item.value}%</span>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {w.type === 'List View' && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {(w.data || []).slice(0, 3).map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)' }}>
                          <div style={{ color: 'var(--accent-primary)' }}>
                             {item.icon ? <item.icon size={14} /> : <AlertCircle size={14} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '11px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.text}</div>
                            <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn-ghost" style={{ borderRadius: '20px' }} onClick={() => setCanvasWidgets([])}>Clear Canvas</button>
        </div>
      </div>

      {/* Settings Panel */}
      <div className="glass" style={{ borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px' }}>Dashboard Settings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Target Role</label>
            <select style={{ width: '100%' }}>
              <option>Project Manager</option>
              <option>Contractor</option>
              <option>Consultant</option>
            </select>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => alert('Dashboard published!')}>Publish Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBuilder;
