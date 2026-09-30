import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#05070B',
        borderTop: '1px solid var(--border-color)',
        padding: '60px 24px 30px',
        marginTop: 'auto',
      }}
    >
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}
      >
        {/* Brand Col */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00BFFF 0%, #0077FF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={18} color="#05070B" fill="#05070B" />
            </div>
            <span
              className="font-sci-fi"
              style={{
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#FFFFFF',
              }}
            >
              COMIC<span className="text-cyan">CRAFT</span>
            </span>
          </div>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              maxWidth: '280px',
            }}
          >
            Turn Your Stories Into Comics.
            AI-powered digital canvas for comic creators, storytellers, and visual artists.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-cyan)',
              marginBottom: '16px',
            }}
          >
            Platform
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/create-comic" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Create Comic
              </Link>
            </li>
            <li>
              <Link to="/comics" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                My Comics
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Support */}
        <div>
          <h4
            style={{
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-cyan)',
              marginBottom: '16px',
            }}
          >
            Resources
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <a href="#features" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                How It Works
              </a>
            </li>
            <li>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Privacy Policy
              </span>
            </li>
            <li>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Terms of Service
              </span>
            </li>
          </ul>
        </div>

        {/* Sci-Fi Motto */}
        <div>
          <h4
            style={{
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-cyan)',
              marginBottom: '16px',
            }}
          >
            Studio
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            Designed with dark cyber-comic aesthetics, high-voltage speech bubbles, and reactive panels.
          </p>
          <div
            style={{
              display: 'inline-block',
              marginTop: '12px',
              padding: '6px 12px',
              borderRadius: '6px',
              backgroundColor: '#111827',
              border: '1px solid var(--border-color)',
              color: 'var(--accent-cyan)',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            v1.0.0 PRODUCTION BUILD
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          color: 'var(--text-dim)',
          fontSize: '0.85rem',
        }}
      >
        <span>&copy; {new Date().getFullYear()} ComicCraft Inc. All rights reserved.</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Crafted for creators everywhere
        </span>
      </div>
    </footer>
  );
};

export default Footer;
