import React, { useState } from 'react';
import { X, Image, User, Check } from 'lucide-react';

const PRESET_BACKGROUNDS = [
  {
    title: 'Neon Cyber City Rain',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
    genre: 'Cyberpunk',
  },
  {
    title: 'Futuristic Command Bridge',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    genre: 'Sci-Fi',
  },
  {
    title: 'Deep Space Cosmic Rift',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    genre: 'Sci-Fi',
  },
  {
    title: 'Cybernetic Tech Lab',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    genre: 'Cyberpunk',
  },
  {
    title: 'Cyberpunk Alleyway Neon',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
    genre: 'Cyberpunk',
  },
  {
    title: 'Derelict Industrial Wasteland',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    genre: 'Dystopian',
  },
];

const PresetModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 11, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0F172A',
          border: '1px solid rgba(0, 191, 255, 0.4)',
          boxShadow: '0 0 35px rgba(0, 191, 255, 0.25)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>
              Sci-Fi & Cyberpunk Asset Presets
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
          Select from our curated sci-fi visual panels to instantly populate your comic scenes:
        </p>

        {/* Presets Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
            overflowY: 'auto',
            paddingRight: '6px',
          }}
        >
          {PRESET_BACKGROUNDS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelect(item.url);
                onClose();
              }}
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s',
                backgroundColor: '#05070B',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={item.url}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '140px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{ padding: '10px' }}>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  {item.title}
                </span>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                  {item.genre}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresetModal;
