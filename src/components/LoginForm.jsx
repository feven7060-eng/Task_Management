import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, Users } from 'lucide-react';
import './LoginForm.css';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-side">
      <div className="login-form-container">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to your dashboard</p>
        </div>

        <form className="form-body" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input type="email" placeholder="Enter your email" required />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                required 
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" defaultChecked />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="btn-primary">
            Sign In
            <span className="btn-arrow">→</span>
          </button>
        </form>

      </div>
    </div>
  );
};

export default LoginForm;
