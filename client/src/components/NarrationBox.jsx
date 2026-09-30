import React from 'react';

const NarrationBox = ({ text }) => {
  if (!text || text.trim() === '') return null;

  return (
    <div
      className="narration-box"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 'auto',
        maxWidth: '85%',
        background: '#0B1118',
        borderLeft: '4px solid var(--accent-cyan)',
        borderBottom: '2px solid #000000',
        borderRight: '2px solid #000000',
        padding: '6px 14px',
        color: '#E2E8F0',
        fontSize: '0.8rem',
        fontWeight: 600,
        fontStyle: 'italic',
        letterSpacing: '0.02em',
        boxShadow: '3px 3px 6px rgba(0,0,0,0.8)',
        zIndex: 20,
      }}
    >
      <span style={{ color: 'var(--accent-cyan)', marginRight: '6px', fontWeight: 800 }}>CAPTION:</span>
      {text}
    </div>
  );
};

export default NarrationBox;
