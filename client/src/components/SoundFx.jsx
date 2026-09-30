import React from 'react';

const SoundFx = ({ text }) => {
  if (!text || text.trim() === '') return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '16px',
        right: '20px',
        zIndex: 22,
        pointerEvents: 'none',
      }}
    >
      <div
        className="sound-fx"
        style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '2.2rem',
          color: '#FACC15',
          textShadow: '3px 3px 0px #DC2626, -1px -1px 0px #000000, 2px 2px 8px rgba(0,0,0,0.9)',
          transform: 'rotate(-10deg)',
          letterSpacing: '0.08em',
          filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.4))',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default SoundFx;
