import React from 'react';

const SpeechBubble = ({
  text,
  character,
  dialogueStyle = 'speech',
  position = 'top-left',
}) => {
  if (!text || text.trim() === '') return null;

  // Determine coordinate positioning inside parent relative panel
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return { top: '16px', left: '16px' };
      case 'top-right':
        return { top: '16px', right: '16px' };
      case 'top-center':
        return { top: '16px', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-left':
        return { bottom: '24px', left: '16px' };
      case 'bottom-right':
        return { bottom: '24px', right: '16px' };
      case 'bottom-center':
        return { bottom: '24px', left: '50%', transform: 'translateX(-50%)' };
      default:
        return { top: '16px', left: '16px' };
    }
  };

  const isShout = dialogueStyle === 'shout';
  const isThought = dialogueStyle === 'thought';
  const isWhisper = dialogueStyle === 'whisper';

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 25,
        maxWidth: '260px',
        ...getPositionStyles(),
      }}
    >
      <div
        className={`speech-bubble ${dialogueStyle}`}
        style={{
          position: 'relative',
          padding: '10px 14px',
          background: isShout ? '#FEF2F2' : isThought ? '#F0F9FF' : '#FFFFFF',
          color: isShout ? '#991B1B' : '#05070B',
          borderRadius: isThought ? '24px' : '16px',
          border: isShout ? '3px dashed #DC2626' : '2px solid #000000',
          boxShadow: '3px 4px 0px rgba(0, 0, 0, 0.75)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.875rem',
          fontWeight: 700,
          lineHeight: 1.35,
          letterSpacing: '0.01em',
        }}
      >
        {/* Speaker Name Tag */}
        {character && (
          <div
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontWeight: 800,
              color: '#0077FF',
              marginBottom: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>{character}</span>
            {isThought && <span style={{ fontSize: '0.65rem', color: '#64748B' }}>[THINKS]</span>}
            {isShout && <span style={{ fontSize: '0.65rem', color: '#DC2626' }}>[SHOUTS]</span>}
          </div>
        )}

        {/* Dialogue Text */}
        <div style={{ wordBreak: 'break-word' }}>{text}</div>

        {/* Comic Speech Pointer Tail (SVG) */}
        {!isThought && (
          <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            style={{
              position: 'absolute',
              bottom: '-12px',
              left: position.includes('right') ? 'auto' : '18px',
              right: position.includes('right') ? '18px' : 'auto',
              filter: 'drop-shadow(1px 2px 0px rgba(0,0,0,0.6))',
            }}
          >
            <polygon
              points="0,0 9,14 18,0"
              fill={isShout ? '#FEF2F2' : '#FFFFFF'}
              stroke="#000000"
              strokeWidth="2"
            />
          </svg>
        )}

        {/* Thought bubbles little dots */}
        {isThought && (
          <div
            style={{
              position: 'absolute',
              bottom: '-14px',
              left: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1.5px solid #000000',
              }}
            />
            <div
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1px solid #000000',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechBubble;
