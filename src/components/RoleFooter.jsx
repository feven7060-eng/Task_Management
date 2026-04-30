import React from 'react';
import { UserCog, User, FileText, HardHat, Hammer, ShieldCheck } from 'lucide-react';
import './RoleFooter.css';

const roles = [

];

const RoleFooter = () => {
  return (
    <div className="role-footer-container">
      <div className="roles-list glass-panel">
        {roles.map((role, index) => (
          <div className="role-item" key={index}>
            <div className="role-icon" style={{ color: role.color, background: `${role.color}15` }}>
              {role.icon}
            </div>
            <div className="role-info">
              <div className="role-title">{role.title}</div>
              <div className="role-level" style={{ color: role.color }}>{role.level}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="footer-copyright">
        © 2025 AI University Construction Project. All rights reserved.
      </div>
    </div>
  );
};

export default RoleFooter;
