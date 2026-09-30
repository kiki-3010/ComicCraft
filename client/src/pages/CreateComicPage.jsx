import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BookOpen,
  Users,
  LayoutGrid,
  Eye,
  Plus,
  Trash2,
  Upload,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Save,
  CheckCircle,
  Copy,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import {
  createComic,
  getComic,
  updateComic,
  uploadImage,
  getAiSuggestion,
} from '../services/api';
import { useToast } from '../context/ToastContext';
import ComicPanel from '../components/ComicPanel';
import CharacterModal from '../components/CharacterModal';
import PresetModal from '../components/PresetModal';

const GENRES = [
  'Sci-Fi',
  'Cyberpunk',
  'Mecha',
  'Superhero',
  'Action',
  'Mystery',
  'Fantasy',
  'Horror',
  'Dystopian',
  'Other',
];

const CreateComicPage = () => {
  const { id } = useParams(); // If present, edit mode
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isEditMode = !!id;

  // Wizard Step (1: Story, 2: Characters, 3: Panels Studio, 4: Preview)
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('Sci-Fi');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
  );
  const [status, setStatus] = useState('Draft');

  // Characters List
  const [characters, setCharacters] = useState([
    {
      name: 'AX-09 Valkyrie',
      role: 'Robot',
      description: 'Tactical cyborg with optic sensor overclocking.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    },
  ]);

  // Panels List
  const [panels, setPanels] = useState([
    {
      panelNumber: 1,
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
      scene: 'Rain slicking the elevated mag-rail tracks as drone searchlights sweep below.',
      character: 'AX-09 Valkyrie',
      dialogue: 'Optics locked. The target has bypassed the security firewall.',
      narration: 'Neo-Avalon, 02:44 AM. The data stream never stops pulsing.',
      dialogueStyle: 'speech',
      bubblePosition: 'top-left',
      soundEffect: 'BZZZT!',
    },
  ]);

  // Active panel being edited in Studio (Step 3)
  const [selectedPanelIndex, setSelectedPanelIndex] = useState(0);

  // Modals & Loaders
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [presetTarget, setPresetTarget] = useState(null); // 'cover' or 'panel'
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingComic, setIsLoadingComic] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Fetch comic if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchExistingComic = async () => {
        try {
          setIsLoadingComic(true);
          const res = await getComic(id);
          if (res.success && res.comic) {
            const c = res.comic;
            setTitle(c.title || '');
            setDescription(c.description || '');
            setGenre(c.genre || 'Sci-Fi');
            setCoverImage(c.coverImage || '');
            setStatus(c.status || 'Draft');
            if (c.characters && c.characters.length > 0) setCharacters(c.characters);
            if (c.panels && c.panels.length > 0) setPanels(c.panels);
          }
        } catch (err) {
          showToast(err.message || 'Failed to load comic for editing', 'error');
          navigate('/comics');
        } finally {
          setIsLoadingComic(false);
        }
      };

      fetchExistingComic();
    }
  }, [id, isEditMode]);

  // Current Panel Reference
  const activePanel = panels[selectedPanelIndex] || panels[0] || {};

  const updateActivePanelField = (field, value) => {
    setPanels((prev) => {
      const updated = [...prev];
      if (updated[selectedPanelIndex]) {
        updated[selectedPanelIndex] = {
          ...updated[selectedPanelIndex],
          [field]: value,
        };
      }
      return updated;
    });
  };

  const handleAddPanel = () => {
    const nextNumber = panels.length + 1;
    const newPanel = {
      panelNumber: nextNumber,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      scene: 'Inside the corporate server nexus.',
      character: characters[0]?.name || '',
      dialogue: 'Deploying extraction sequence now.',
      narration: 'Every second counted before the lockdown sealed them in.',
      dialogueStyle: 'speech',
      bubblePosition: 'top-right',
      soundEffect: '',
    };
    setPanels((prev) => [...prev, newPanel]);
    setSelectedPanelIndex(panels.length);
    showToast(`Panel #${nextNumber} added!`, 'info');
  };

  const handleDuplicatePanel = (index) => {
    const source = panels[index];
    const newPanel = {
      ...source,
      panelNumber: panels.length + 1,
    };
    setPanels((prev) => [...prev, newPanel]);
    setSelectedPanelIndex(panels.length);
    showToast(`Panel duplicated!`, 'info');
  };

  const handleDeletePanel = (index) => {
    if (panels.length <= 1) {
      showToast('Comic must have at least one panel.', 'error');
      return;
    }
    const updated = panels.filter((_, i) => i !== index).map((p, i) => ({
      ...p,
      panelNumber: i + 1,
    }));
    setPanels(updated);
    setSelectedPanelIndex(Math.max(0, index - 1));
    showToast('Panel removed.', 'info');
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const res = await uploadImage(file);
      if (res.success && res.url) {
        setCoverImage(res.url);
        showToast('Cover image uploaded successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Cover upload failed', 'error');
    }
  };

  const handlePanelImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const res = await uploadImage(file);
      if (res.success && res.url) {
        updateActivePanelField('image', res.url);
        showToast('Panel image uploaded!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Image upload failed', 'error');
    }
  };

  const handleAiSuggest = async () => {
    try {
      setIsAiLoading(true);
      const res = await getAiSuggestion(genre);
      if (res.success && res.suggestion) {
        const s = res.suggestion;
        // Apply suggestion to active panel or story
        updateActivePanelField('scene', s.scene);
        updateActivePanelField('dialogue', s.dialogue);
        updateActivePanelField('soundEffect', s.soundEffect);
        showToast('AI suggestion applied to current panel!', 'success');
      }
    } catch (err) {
      showToast('AI Assistant unavailable right now.', 'info');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSaveComic = async (finalStatus = status) => {
    if (!title.trim()) {
      showToast('Please provide a comic title.', 'error');
      setCurrentStep(1);
      return;
    }

    if (panels.length === 0) {
      showToast('Please add at least one panel to your comic.', 'error');
      setCurrentStep(3);
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        title: title.trim(),
        description: description.trim(),
        genre,
        coverImage,
        status: finalStatus,
        characters,
        panels,
      };

      if (isEditMode) {
        await updateComic(id, payload);
        showToast('Comic saved successfully!', 'success');
        navigate(`/comic/${id}`);
      } else {
        const res = await createComic(payload);
        showToast('Comic created successfully!', 'success');
        navigate(`/comic/${res.comic._id}`);
      }
    } catch (err) {
      showToast(err.message || 'Failed to save comic', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingComic) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="font-sci-fi" style={{ color: 'var(--accent-cyan)' }}>
          LOADING COMIC STUDIO ARCHIVE...
        </span>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '30px 24px 80px' }}>
      {/* Studio Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px',
        }}
      >
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
            {isEditMode ? 'EDITING COMIC' : 'CREATOR STUDIO'}
          </span>
          <h1 className="font-sci-fi" style={{ fontSize: '1.8rem', color: '#FFFFFF' }}>
            {title ? title : 'Untitled Comic Project'}
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => handleSaveComic('Draft')}
            className="btn btn-secondary"
            disabled={isSaving}
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={() => handleSaveComic('Published')}
            className="btn btn-primary"
            disabled={isSaving}
          >
            <CheckCircle size={16} />
            {isSaving ? 'Publishing...' : 'Publish Comic'}
          </button>
        </div>
      </div>

      {/* 4-Step Navigation Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          marginBottom: '32px',
        }}
      >
        {[
          { num: 1, label: 'Story & Lore', icon: BookOpen },
          { num: 2, label: 'Characters', icon: Users },
          { num: 3, label: 'Panel Studio', icon: LayoutGrid },
          { num: 4, label: 'Preview & Finish', icon: Eye },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentStep === tab.num;
          return (
            <button
              key={tab.num}
              onClick={() => setCurrentStep(tab.num)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px',
                borderRadius: '10px',
                border: isActive
                  ? '2px solid var(--accent-cyan)'
                  : '1px solid var(--border-color)',
                backgroundColor: isActive ? 'rgba(0, 191, 255, 0.12)' : '#0F172A',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={18} />
              <span className="font-sci-fi desktop-only">STEP {tab.num}:</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==============================================
          STEP 1: STORY
      ============================================== */}
      {currentStep === 1 && (
        <div
          className="card"
          style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#0B1118' }}
        >
          <h2 className="font-sci-fi" style={{ fontSize: '1.4rem', marginBottom: '20px' }}>
            Step 1 — Story Premise & Cover
          </h2>

          <div className="form-group">
            <label className="form-label">Comic Title *</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. CYBERNETIC HORIZON: 2099"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Genre</label>
            <select
              className="form-select"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Story Synopsis / World Lore</label>
            <textarea
              className="form-textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the setting, the conflict, the overarching mystery, or stakes..."
            />
          </div>

          {/* Cover Image Selector */}
          <div className="form-group">
            <label className="form-label">Cover Artwork</label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                marginTop: '8px',
              }}
            >
              <img
                src={coverImage}
                alt="Cover preview"
                style={{
                  width: '140px',
                  height: '180px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  border: '2px solid var(--accent-cyan)',
                  boxShadow: '0 0 15px rgba(0, 191, 255, 0.3)',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                    <Upload size={14} /> Upload Custom Cover
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setPresetTarget('cover');
                      setIsPresetModalOpen(true);
                    }}
                    className="btn btn-outline btn-sm"
                  >
                    <ImageIcon size={14} /> Choose Preset
                  </button>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Recommended: Portrait or 16:9 ratio, max 10MB (JPG, PNG, WEBP).
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '28px' }}>
            <button
              onClick={() => setCurrentStep(2)}
              className="btn btn-primary"
            >
              Continue to Characters <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ==============================================
          STEP 2: CHARACTERS
      ============================================== */}
      {currentStep === 2 && (
        <div className="card" style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#0B1118' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <div>
              <h2 className="font-sci-fi" style={{ fontSize: '1.4rem', color: '#FFFFFF' }}>
                Step 2 — Cast Your Characters
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Create characters that will speak through your panels' dialogue bubbles.
              </p>
            </div>
            <button
              onClick={() => setIsCharacterModalOpen(true)}
              className="btn btn-primary btn-sm"
            >
              <Plus size={16} /> Add Character
            </button>
          </div>

          {/* Characters Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
              marginBottom: '30px',
            }}
          >
            {characters.map((char, index) => (
              <div
                key={index}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: '#0F172A',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <img
                  src={char.image}
                  alt={char.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    border: '2px solid var(--accent-cyan)',
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.95rem' }}>
                    {char.name}
                  </div>
                  <span className="badge badge-cyan" style={{ fontSize: '0.65rem', margin: '3px 0' }}>
                    {char.role}
                  </span>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {char.description || 'No bio'}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCharacters(characters.filter((_, i) => i !== index));
                    showToast(`Removed character ${char.name}`, 'info');
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#EF4444',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                  title="Remove character"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
            <button onClick={() => setCurrentStep(1)} className="btn btn-secondary">
              <ArrowLeft size={16} /> Back to Story
            </button>
            <button onClick={() => setCurrentStep(3)} className="btn btn-primary">
              Continue to Panel Studio <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ==============================================
          STEP 3: 3-COLUMN STUDIO LAYOUT
      ============================================== */}
      {currentStep === 3 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr 340px',
            gap: '20px',
            alignItems: 'start',
          }}
          className="studio-grid"
        >
          {/* LEFT COLUMN: Panel sequence manager */}
          <div
            className="card"
            style={{
              padding: '16px',
              backgroundColor: '#0B1118',
              maxHeight: 'calc(100vh - 200px)',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={16} color="var(--accent-cyan)" />
                <span className="font-sci-fi" style={{ fontSize: '0.9rem', color: '#FFFFFF' }}>
                  Panels ({panels.length})
                </span>
              </div>
              <button
                onClick={handleAddPanel}
                className="btn btn-primary btn-sm"
                title="Add New Panel"
              >
                <Plus size={14} /> Add
              </button>
            </div>

            {/* List of Panel Thumbnails */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {panels.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPanelIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor:
                      selectedPanelIndex === idx ? 'rgba(0, 191, 255, 0.15)' : '#0F172A',
                    border:
                      selectedPanelIndex === idx
                        ? '1px solid var(--accent-cyan)'
                        : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <img
                    src={p.image}
                    alt={`Thumb ${p.panelNumber}`}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '6px',
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                      Panel #{p.panelNumber}
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {p.dialogue || p.scene || 'Empty panel'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicatePanel(idx);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-dim)',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                      title="Duplicate"
                    >
                      <Copy size={13} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePanel(idx);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#EF4444',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER COLUMN: Interactive Live Comic Canvas */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              className="card"
              style={{
                backgroundColor: '#070B11',
                padding: '24px',
                border: '1px solid rgba(0, 191, 255, 0.3)',
                boxShadow: '0 0 35px rgba(0, 0, 0, 0.9)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <span className="font-sci-fi" style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>
                  CANVAS: PANEL #{activePanel.panelNumber || 1}
                </span>

                <button
                  type="button"
                  onClick={handleAiSuggest}
                  className="btn btn-secondary btn-sm"
                  disabled={isAiLoading}
                  style={{
                    borderColor: 'rgba(0, 191, 255, 0.5)',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  <Sparkles size={14} />
                  {isAiLoading ? 'Synthesizing...' : 'AI Auto-Suggest Scene'}
                </button>
              </div>

              {/* Live Rendered Comic Panel */}
              <ComicPanel panel={activePanel} height="480px" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setCurrentStep(2)} className="btn btn-secondary">
                <ArrowLeft size={16} /> Back to Characters
              </button>
              <button onClick={() => setCurrentStep(4)} className="btn btn-primary">
                Preview Final Comic <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Property Inspector & Dialogue Controls */}
          <div
            className="card"
            style={{
              padding: '20px',
              backgroundColor: '#0B1118',
              maxHeight: 'calc(100vh - 200px)',
              overflowY: 'auto',
            }}
          >
            <h3
              className="font-sci-fi"
              style={{
                fontSize: '1.05rem',
                marginBottom: '16px',
                color: '#FFFFFF',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '8px',
              }}
            >
              Panel Properties
            </h3>

            {/* Image Source */}
            <div className="form-group">
              <label className="form-label">Panel Background Artwork</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', flex: 1 }}>
                  <Upload size={14} /> Upload File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePanelImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setPresetTarget('panel');
                    setIsPresetModalOpen(true);
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  <ImageIcon size={14} /> Presets
                </button>
              </div>
            </div>

            {/* Speaking Character */}
            <div className="form-group">
              <label className="form-label">Speaking Character</label>
              <select
                className="form-select"
                value={activePanel.character || ''}
                onChange={(e) => updateActivePanelField('character', e.target.value)}
              >
                <option value="">No Speaker (Ambient / Sound only)</option>
                {characters.map((c, i) => (
                  <option key={i} value={c.name}>
                    {c.name} ({c.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Dialogue */}
            <div className="form-group">
              <label className="form-label">Dialogue Text</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={activePanel.dialogue || ''}
                onChange={(e) => updateActivePanelField('dialogue', e.target.value)}
                placeholder="What does the character say or think?"
              />
            </div>

            {/* Bubble Style & Position */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label className="form-label">Bubble Style</label>
                <select
                  className="form-select"
                  value={activePanel.dialogueStyle || 'speech'}
                  onChange={(e) => updateActivePanelField('dialogueStyle', e.target.value)}
                >
                  <option value="speech">Speech (Normal)</option>
                  <option value="thought">Thought (Cloud)</option>
                  <option value="shout">Shout (Jagged)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Bubble Position</label>
                <select
                  className="form-select"
                  value={activePanel.bubblePosition || 'top-left'}
                  onChange={(e) => updateActivePanelField('bubblePosition', e.target.value)}
                >
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="top-center">Top Center</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-center">Bottom Center</option>
                </select>
              </div>
            </div>

            {/* Narration Box */}
            <div className="form-group">
              <label className="form-label">Narration Caption</label>
              <input
                type="text"
                className="form-input"
                value={activePanel.narration || ''}
                onChange={(e) => updateActivePanelField('narration', e.target.value)}
                placeholder="e.g. Neo-Avalon. 02:44 AM..."
              />
            </div>

            {/* Sound Effect */}
            <div className="form-group">
              <label className="form-label">Sound FX Text</label>
              <input
                type="text"
                className="form-input"
                value={activePanel.soundEffect || ''}
                onChange={(e) => updateActivePanelField('soundEffect', e.target.value)}
                placeholder="e.g. BZZZT!, KRAAA-KOW!, VOOOM!"
              />
            </div>

            {/* Scene Notes */}
            <div className="form-group">
              <label className="form-label">Scene Storyboard Notes</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={activePanel.scene || ''}
                onChange={(e) => updateActivePanelField('scene', e.target.value)}
                placeholder="Describe lighting, action, cinematic camera angles..."
              />
            </div>
          </div>
        </div>
      )}

      {/* ==============================================
          STEP 4: PREVIEW & FINAL PUBLISHING
      ============================================== */}
      {currentStep === 4 && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            className="card"
            style={{
              backgroundColor: '#0B1118',
              padding: '30px',
              border: '2px solid rgba(0, 191, 255, 0.4)',
              boxShadow: '0 0 40px rgba(0, 191, 255, 0.2)',
              marginBottom: '30px',
            }}
          >
            {/* Header info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '20px',
                marginBottom: '28px',
              }}
            >
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
                  {genre}
                </span>
                <h2 className="font-sci-fi" style={{ fontSize: '2rem', color: '#FFFFFF' }}>
                  {title || 'Untitled Comic'}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
                  {description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleSaveComic('Draft')}
                  className="btn btn-secondary"
                  disabled={isSaving}
                >
                  <Save size={16} /> Save Draft
                </button>
                <button
                  onClick={() => handleSaveComic('Published')}
                  className="btn btn-primary"
                  disabled={isSaving}
                >
                  <CheckCircle size={16} />
                  {isSaving ? 'Publishing...' : 'Publish Comic'}
                </button>
              </div>
            </div>

            {/* All Panels Stacked Vertically */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {panels.map((p, index) => (
                <ComicPanel
                  key={index}
                  panel={p}
                  height="420px"
                  showPanelNumber={true}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => setCurrentStep(3)} className="btn btn-secondary">
              <ArrowLeft size={16} /> Back to Panel Studio
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <CharacterModal
        isOpen={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
        onSave={(newChar) => {
          setCharacters([...characters, newChar]);
          showToast(`Added character ${newChar.name}!`, 'success');
        }}
      />

      <PresetModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onSelect={(selectedUrl) => {
          if (presetTarget === 'cover') {
            setCoverImage(selectedUrl);
            showToast('Cover preset applied!', 'success');
          } else {
            updateActivePanelField('image', selectedUrl);
            showToast('Panel preset applied!', 'success');
          }
        }}
      />

      <style>{`
        @media (max-width: 1024px) {
          .studio-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateComicPage;
