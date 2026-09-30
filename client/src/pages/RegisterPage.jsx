import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, User, Mail, Lock, Eye, EyeOff, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        confirmPassword,
      });

      showToast(res.message || 'Account created successfully! Welcome to ComicCraft.', 'success');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please check your credentials.');
      showToast(err.message || 'Registration failed', 'error');
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
          'radial-gradient(circle at 90% 10%, rgba(0, 191, 255, 0.08) 0%, transparent 50%)',
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: '#0B1118',
          border: '1px solid rgba(0, 191, 255, 0.3)',
          boxShadow: '0 0 40px rgba(0, 191, 255, 0.15)',
          borderRadius: '20px',
          padding: '40px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #00BFFF 0%, #0077FF 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <Zap size={24} color="#05070B" fill="#05070B" />
          </div>
          <h2 className="font-sci-fi" style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '8px' }}>
            CREATE YOUR ACCOUNT
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Join ComicCraft and bring your stories to life with digital comics.
          </p>
        </div>

        {/* Error message */}
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
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <User
                size={18}
                color="var(--text-dim)"
                style={{ position: 'absolute', left: '14px', top: '14px' }}
              />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '44px' }}
                placeholder="e.g. Maya Chen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password (Min. 6 characters)</label>
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

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                color="var(--text-dim)"
                style={{ position: 'absolute', left: '14px', top: '14px' }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: '44px' }}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', marginTop: '12px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 700 }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
