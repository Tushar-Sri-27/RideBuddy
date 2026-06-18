import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImpactBanner from '../components/ImpactBanner';
import './Login.css';

function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordsMatch = form.confirmPassword === '' || form.password === form.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    // No auth logic — just demo
    alert(`Account created for: ${form.fullName} (${form.email})`);
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
                <h1 className="rb-auth-title">Create your account</h1>
                <p className="rb-auth-subtitle">
                  Join thousands of smart commuters today
                </p>
              </div>

              {/* Social Button */}
              <div className="rb-social-auth">
                <button type="button" className="rb-social-btn">
                  <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
                  Sign up with Google
                </button>
              </div>

              {/* Divider */}
              <div className="rb-auth-divider">
                <span>or register with email</span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="rb-auth-form">
                {/* Full Name */}
                <div className="mb-3">
                  <label htmlFor="regName" className="form-label">Full name</label>
                  <div className="rb-input-group">
                    <i className="bi bi-person rb-input-icon"></i>
                    <input
                      type="text"
                      className="form-control rb-input-with-icon"
                      id="regName"
                      name="fullName"
                      placeholder="John Doe"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="regEmail" className="form-label">Email address</label>
                  <div className="rb-input-group">
                    <i className="bi bi-envelope rb-input-icon"></i>
                    <input
                      type="email"
                      className="form-control rb-input-with-icon"
                      id="regEmail"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label htmlFor="regPhone" className="form-label">
                    Phone number <span className="rb-optional-tag">Optional</span>
                  </label>
                  <div className="rb-input-group">
                    <i className="bi bi-phone rb-input-icon"></i>
                    <input
                      type="tel"
                      className="form-control rb-input-with-icon"
                      id="regPhone"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="regPassword" className="form-label">Password</label>
                  <div className="rb-input-group">
                    <i className="bi bi-lock rb-input-icon"></i>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control rb-input-with-icon"
                      id="regPassword"
                      name="password"
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={handleChange}
                      minLength={8}
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
                  {form.password && form.password.length < 8 && (
                    <small className="rb-field-hint rb-field-hint-warn">
                      <i className="bi bi-info-circle me-1"></i>
                      Must be at least 8 characters
                    </small>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label htmlFor="regConfirm" className="form-label">Confirm password</label>
                  <div className="rb-input-group">
                    <i className="bi bi-lock-fill rb-input-icon"></i>
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      className={`form-control rb-input-with-icon ${!passwordsMatch ? 'rb-input-error' : ''}`}
                      id="regConfirm"
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="rb-toggle-password"
                      onClick={() => setShowConfirm(!showConfirm)}
                      aria-label="Toggle confirm password visibility"
                    >
                      <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                  {!passwordsMatch && (
                    <small className="rb-field-hint rb-field-hint-error">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      Passwords do not match
                    </small>
                  )}
                </div>

                {/* Terms */}
                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="agreeTerms"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                    />
                    <label className="form-check-label rb-check-label" htmlFor="agreeTerms">
                      I agree to the <a href="#" className="rb-auth-link">Terms of Service</a> and{' '}
                      <a href="#" className="rb-auth-link">Privacy Policy</a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="rb-btn-primary rb-btn-full"
                  disabled={!agreed || !passwordsMatch}
                >
                  Create Account
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>

              {/* Footer */}
              <p className="rb-auth-footer-text">
                Already have an account?{' '}
                <Link to="/login" className="rb-auth-link">
                  Sign in
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

export default Register;
