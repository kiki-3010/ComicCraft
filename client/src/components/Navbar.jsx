import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Zap, Menu, X, PlusCircle, LayoutDashboard, BookOpen, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully.', 'info');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(5, 7, 11, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 24px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Brand Logo */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #00BFFF 0%, #0077FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 191, 255, 0.5)',
          }}
        >
          <Zap size={22} color="#05070B" fill="#05070B" />
        </div>
        <span
          className="font-sci-fi"
          style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '0.08em',
          }}
        >
          COMIC<span className="text-cyan">CRAFT</span>
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}
        className="desktop-nav"
      >
        <Link
          to="/"
          style={{
            color: isActive('/') ? 'var(--accent-cyan)' : 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.925rem',
            fontWeight: 600,
            transition: 'color 0.2s',
          }}
        >
          Home
        </Link>

        {isAuthenticated && (
          <>
            <Link
              to="/dashboard"
              style={{
                color: isActive('/dashboard') ? 'var(--accent-cyan)' : 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.925rem',
                fontWeight: 600,
                transition: 'color 0.2s',
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/create-comic"
              style={{
                color: isActive('/create-comic') ? 'var(--accent-cyan)' : 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.925rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
            >
              <PlusCircle size={16} color="var(--accent-cyan)" />
              Create Comic
            </Link>
            <Link
              to="/comics"
              style={{
                color: isActive('/comics') ? 'var(--accent-cyan)' : 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.925rem',
                fontWeight: 600,
                transition: 'color 0.2s',
              }}
            >
              My Comics
            </Link>
            <Link
              to="/profile"
              style={{
                color: isActive('/profile') ? 'var(--accent-cyan)' : 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.925rem',
                fontWeight: 600,
                transition: 'color 0.2s',
              }}
            >
              Profile
            </Link>
          </>
        )}
      </div>

      {/* Right Action / Auth Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link
              to="/profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                color: '#FFFFFF',
              }}
            >
              <img
                src={user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={user?.name}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent-cyan)',
                  boxShadow: '0 0 10px rgba(0, 191, 255, 0.4)',
                }}
              />
              <span
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
                className="desktop-only"
              >
                {user?.name?.split(' ')[0]}
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-secondary btn-sm"
              title="Sign Out"
            >
              <LogOut size={16} />
              <span className="desktop-only">Logout</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/login" className="btn btn-secondary btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          </div>
        )}

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-cyan)',
            cursor: 'pointer',
            padding: '4px',
            display: 'none',
          }}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: 0,
            right: 0,
            backgroundColor: '#0B1118',
            borderBottom: '1px solid var(--border-color)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 49,
            boxShadow: '0 20px 30px rgba(0,0,0,0.8)',
          }}
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}
              >
                Dashboard
              </Link>
              <Link
                to="/create-comic"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600 }}
              >
                + Create Comic
              </Link>
              <Link
                to="/comics"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}
              >
                My Comics
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="btn btn-danger btn-sm"
                style={{ marginTop: '10px' }}
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
