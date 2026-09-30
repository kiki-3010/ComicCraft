import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit3,
  Printer,
  Share2,
  Calendar,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { getComic } from '../services/api';
import { useToast } from '../context/ToastContext';
import ComicPanel from '../components/ComicPanel';

const ComicViewerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [comic, setComic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        setIsLoading(true);
        const res = await getComic(id);
        if (res.success && res.comic) {
          setComic(res.comic);
        }
      } catch (err) {
        showToast(err.message || 'Failed to load comic.', 'error');
        navigate('/comics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComic();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Comic link copied to clipboard!', 'success');
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '3px solid rgba(0, 191, 255, 0.2)',
              borderTopColor: 'var(--accent-cyan)',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <span className="font-sci-fi" style={{ color: 'var(--accent-cyan)' }}>
            LOADING COMIC VIEWER...
          </span>
        </div>
      </div>
    );
  }

  if (!comic) return null;

  return (
    <div className="container" style={{ padding: '30px 24px 80px' }}>
      {/* Top Action Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <Link to="/dashboard" className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleShare} className="btn btn-secondary btn-sm" title="Share Comic">
            <Share2 size={16} /> Share
          </button>
          <button onClick={handlePrint} className="btn btn-secondary btn-sm" title="Print Comic">
            <Printer size={16} /> Print / Export
          </button>
          <Link to={`/comic/${comic._id}/edit`} className="btn btn-primary btn-sm">
            <Edit3 size={16} /> Edit Comic
          </Link>
        </div>
      </div>

      {/* Comic Page Reader Container */}
      <div
        className="card"
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          backgroundColor: '#070B11',
          padding: '36px',
          borderRadius: '16px',
          border: '2px solid rgba(0, 191, 255, 0.35)',
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.95), 0 0 25px rgba(0, 191, 255, 0.15)',
        }}
      >
        {/* Comic Header Header */}
        <div
          style={{
            borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '24px',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge badge-cyan">{comic.genre || 'Sci-Fi'}</span>
            <span className={`badge ${comic.status === 'Published' ? 'badge-success' : 'badge-draft'}`}>
              {comic.status || 'Draft'}
            </span>
          </div>

          <h1
            className="font-sci-fi"
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: '#FFFFFF',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            {comic.title}
          </h1>

          {comic.description && (
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.95rem',
                maxWidth: '650px',
                margin: '0 auto 18px',
                lineHeight: 1.6,
              }}
            >
              {comic.description}
            </p>
          )}

          {/* Cast of characters tag row */}
          {comic.characters && comic.characters.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px dashed var(--border-color)',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Starring:
              </span>
              {comic.characters.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#0F172A',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF' }}>{c.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comic Panels Displayed Vertically */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {comic.panels && comic.panels.length > 0 ? (
            comic.panels.map((panel, idx) => (
              <ComicPanel
                key={panel._id || idx}
                panel={panel}
                height="440px"
                showPanelNumber={true}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              No panels added to this comic yet.
            </div>
          )}
        </div>

        {/* Comic Ending Marker */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <div
            className="font-comic"
            style={{
              fontSize: '1.8rem',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.1em',
            }}
          >
            — END OF EPISODE —
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: '6px' }}>
            Created with ComicCraft AI-Powered Studio Engine
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComicViewerPage;
