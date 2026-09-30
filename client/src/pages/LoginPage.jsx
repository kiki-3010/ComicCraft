import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const LoginPage = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const redirectPath = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!email.trim()) {
      setErrorMessage('Please enter your email.');
      return;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await login(email, password);
      showToast(res.message || 'Logged in successfully!', 'success');
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Incorrect email or password. Please try again.');
      showToast(err.message || 'Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        backgroundColor: '#05070B',
        backgroundImage:
          'radial-gradient(circle at 10% 20%, rgba(0, 191, 255, 0.08) 0%, transparent 50%)',
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '1000px',
          padding: '0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          backgroundColor: '#0B1118',
          border: '1px solid rgba(0, 191, 255, 0.3)',
          boxShadow: '0 0 40px rgba(0, 191, 255, 0.15)',
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        {/* Left Side: Sci-Fi Branding & Atmospheric Visual */}
        <div
          style={{
            position: 'relative',
            padding: '48px',
            backgroundColor: '#070B11',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundImage:
              'linear-gradient(rgba(7, 11, 17, 0.75), rgba(7, 11, 17, 0.9)), url(https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 191, 255, 0.15)',
                border: '1px solid rgba(0, 191, 255, 0.4)',
                marginBottom: '28px',
              }}
            >
              <Zap size={16} color="var(--accent-cyan)" />
              <span
                className="font-sci-fi"
                style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}
              >
                COMICCRAFT SUITE
              </span>
            </div>

            <h2
              className="font-sci-fi"
              style={{
                fontSize: '2.2rem',
                lineHeight: 1.2,
                marginBottom: '16px',
                color: '#FFFFFF',
              }}
            >
              Enter The <br />
              <span className="text-gradient">Digital Canvas.</span>
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Craft high-contrast sci-fi panels, cast cybernetic entities, and publish
              immersive digital comics seamlessly.
            </p>
          </div>

          <div
            style={{
              marginTop: '40px',
              padding: '16px',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={18} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                Secure Cloud Storage
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Encrypted credentials, JWT session security, and automated project saving.
            </p>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '28px' }}>
            <h3 className="font-sci-fi" style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '8px' }}>
              Welcome Back
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Log in to access your comics and active creator studio.
            </p>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#F87171',
                fontSize: '0.875rem',
                marginBottom: '20px',
              }}
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={18}
                  color="var(--text-dim)"
                  style={{ position: 'absolute', left: '14px', top: '14px' }}
                />
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', cursor: 'pointer' }}>
                  Forgot Password?
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  color="var(--text-dim)"
                  style={{ position: 'absolute', left: '14px', top: '14px' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingLeft: '44px', paddingRight: '44px' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '12px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-dim)',
                    cursor: 'pointer',
                  }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', marginTop: '10px' }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'LOGIN TO COMICCRAFT'}
            </button>
          </form>

          {/* Social login visual buttons */}
          <div style={{ margin: '24px 0', textAlign: 'center', position: 'relative' }}>
            <div style={{ borderTop: '1px solid var(--border-color)', position: 'absolute', top: '50%', left: 0, right: 0 }} />
            <span
              style={{
                position: 'relative',
                backgroundColor: '#0B1118',
                padding: '0 12px',
                color: 'var(--text-dim)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Or connect via
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => showToast('Social logins are managed via your ComicCraft master key.', 'info')}
            >
              GitHub
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => showToast('Social logins are managed via your ComicCraft master key.', 'info')}
            >
              Google
            </button>
          </div>

          {/* Link to Register */}
          <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 700 }}
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
