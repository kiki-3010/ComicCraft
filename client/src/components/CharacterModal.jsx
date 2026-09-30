import React, { useState } from 'react';
import { X, Upload, User, Shield, Sparkles } from 'lucide-react';
import { uploadImage } from '../services/api';
import { useToast } from '../context/ToastContext';

const CharacterModal = ({ isOpen, onClose, onSave, characterToEdit = null }) => {
  const { showToast } = useToast();
  const [name, setName] = useState(characterToEdit?.name || '');
  const [role, setRole] = useState(characterToEdit?.role || 'Protagonist');
  const [description, setDescription] = useState(characterToEdit?.description || '');
  const [image, setImage] = useState(
    characterToEdit?.image || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'
  );
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('File size must be less than 10MB', 'error');
      return;
    }

    try {
      setIsUploading(true);
      const res = await uploadImage(file);
      if (res.success && res.url) {
        setImage(res.url);
        showToast('Character avatar uploaded successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter a character name.', 'error');
      return;
    }

    onSave({
      name: name.trim(),
      role,
      description: description.trim(),
      image,
    });

    onClose();
  };

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
          maxWidth: '520px',
          backgroundColor: '#0F172A',
          border: '1px solid rgba(0, 191, 255, 0.4)',
          boxShadow: '0 0 30px rgba(0, 191, 255, 0.25)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>
              {characterToEdit ? 'Edit Character' : 'Add New Character'}
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

        <form onSubmit={handleSubmit}>
          {/* Character Preview & Upload */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <img
              src={image}
              alt="Character preview"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '12px',
                objectFit: 'cover',
                border: '2px solid var(--accent-cyan)',
                boxShadow: '0 0 15px rgba(0, 191, 255, 0.3)',
              }}
            />
            <div style={{ flex: 1 }}>
              <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>
                Avatar Image
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                  <Upload size={14} />
                  <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div className="form-group">
            <label className="form-label">Character Name *</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. AX-09 Valkyrie, Commander Kaelen"
              required
            />
          </div>

          {/* Role Field */}
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Protagonist">Protagonist (Hero)</option>
              <option value="Antagonist">Antagonist (Rival / Villain)</option>
              <option value="Robot">Robot / Cyber Synth</option>
              <option value="AI Entity">AI Entity / Hologram</option>
              <option value="Sidekick">Sidekick / Partner</option>
              <option value="Mentor">Mentor / Veteran</option>
              <option value="Alien">Alien / Extraterrestrial</option>
              <option value="Supporting">Supporting Cast</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Character Bio & Abilities</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe personality, background, combat skills, or augmentations..."
            />
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading}
            >
              <Sparkles size={16} />
              Save Character
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CharacterModal;
