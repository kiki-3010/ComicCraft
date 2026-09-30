import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowLeft, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        backgroundColor: '#05070B',
        textAlign: 'center',
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '560px',
          width: '100%',
          backgroundColor: '#0B1118',
          border: '1px solid rgba(0, 191, 255, 0.4)',
          boxShadow: '0 0 50px rgba(0, 191, 255, 0.15)',
          padding: '48px 32px',
        }}
      >
        <div
          className="font-comic"
          style={{
            fontSize: '6rem',
            lineHeight: 1,
            color: 'var(--accent-cyan)',
            textShadow: '3px 3px 0px #DC2626, -1px -1px 0px #000000',
            marginBottom: '16px',
            letterSpacing: '0.05em',
          }}
        >
          404!
        </div>

        <h1
          className="font-sci-fi"
          style={{
            fontSize: '1.8rem',
            color: '#FFFFFF',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}
        >
          PAGE NOT FOUND
        </h1>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}
        >
          "Looks like this panel is missing from the multiverse narrative."
        </p>

        <Link to="/" className="btn btn-primary btn-lg font-sci-fi">
          <ArrowLeft size={18} /> BACK TO HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
