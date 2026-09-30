import React from 'react';
import SpeechBubble from './SpeechBubble';
import NarrationBox from './NarrationBox';
import SoundFx from './SoundFx';

const ComicPanel = ({
  panel,
  isSelected = false,
  onClick,
  showPanelNumber = true,
  height = '380px',
}) => {
  return (
    <div
      onClick={onClick}
      className="comic-panel"
      style={{
        position: 'relative',
        width: '100%',
        height: height,
        backgroundColor: '#0B1118',
        border: isSelected ? '4px solid var(--accent-cyan)' : '4px solid #000000',
        boxShadow: isSelected
          ? '0 0 20px rgba(0, 191, 255, 0.4), 0 8px 24px rgba(0,0,0,0.85)'
          : '0 8px 24px rgba(0, 0, 0, 0.85)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Panel Image */}
      <img
        src={panel.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80'}
        alt={panel.scene || `Panel ${panel.panelNumber}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Narration Box */}
      {panel.narration && <NarrationBox text={panel.narration} />}

      {/* Speech Bubble */}
      {panel.dialogue && (
        <SpeechBubble
          text={panel.dialogue}
          character={panel.character}
          dialogueStyle={panel.dialogueStyle || 'speech'}
          position={panel.bubblePosition || 'top-left'}
        />
      )}

      {/* Sound FX */}
      {panel.soundEffect && <SoundFx text={panel.soundEffect} />}

      {/* Panel Number Badge */}
      {showPanelNumber && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            zIndex: 15,
            backgroundColor: 'rgba(5, 7, 11, 0.85)',
            border: '1px solid rgba(0, 191, 255, 0.5)',
            color: 'var(--accent-cyan)',
            padding: '2px 8px',
            borderRadius: '4px',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          #{panel.panelNumber || 1}
        </div>
      )}
    </div>
  );
};

export default ComicPanel;
