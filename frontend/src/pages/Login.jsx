import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImpactBanner from '../components/ImpactBanner';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No auth logic — just demo
    alert(`Login attempted with: ${form.email}`);
  };

  return (
    <main className="rb-auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-5">
            <div className="rb-auth-card">
              {/* Header */}
              <div className="rb-auth-header">
                <Link to="/" className="rb-auth-logo">
                  <span className="rb-auth-logo-icon">
                    <i className="bi bi-car-front-fill"></i>
                  </span>
                  <span className="rb-auth-logo-text">
                    Ride<span className="rb-auth-logo-highlight">Buddy</span>
                  </span>
                </Link>
                <h1 className="rb-auth-title">Welcome back</h1>
                <p className="rb-auth-subtitle">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Social Buttons */}
              <div className="rb-social-auth">
                <button type="button" className="rb-social-btn">
                  <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
                  Continue with Google
                </button>
              </div>

              {/* Divider */}
              <div className="rb-auth-divider">
                <span>or sign in with email</span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="rb-auth-form">
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">
                    Email address
                  </label>
                  <div className="rb-input-group">
                    <i className="bi bi-envelope rb-input-icon"></i>
                    <input
                      type="email"
                      className="form-control rb-input-with-icon"
                      id="loginEmail"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="loginPassword" className="form-label mb-0">
                      Password
                    </label>
                    <a href="#" className="rb-forgot-link">
                      Forgot password?
                    </a>
                  </div>
                  <div className="rb-input-group">
                    <i className="bi bi-lock rb-input-icon"></i>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control rb-input-with-icon"
                      id="loginPassword"
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="rb-toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                    />
                    <label className="form-check-label rb-check-label" htmlFor="rememberMe">
                      Remember me for 30 days
                    </label>
                  </div>
                </div>

                <button type="submit" className="rb-btn-primary rb-btn-full">
                  Sign In
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>

              {/* Footer */}
              <p className="rb-auth-footer-text">
                Don't have an account?{' '}
                <Link to="/register" className="rb-auth-link">
                  Create one free
                </Link>
              </p>
            </div>
          </div>
        </div>

        <ImpactBanner variant="community" size="minimal" />
      </div>
    </main>
  );
}

export default Login;
