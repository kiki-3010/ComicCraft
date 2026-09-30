import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Edit3, Trash2, Calendar, Layers, Eye } from 'lucide-react';

const ComicCard = ({ comic, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(comic._id);
    setIsDeleting(false);
    setShowConfirm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Cover Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          overflow: 'hidden',
          backgroundColor: '#0B1118',
        }}
      >
        <img
          src={comic.coverImage || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'}
          alt={comic.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
        />
        {/* Genre Pill */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 10,
          }}
        >
          <span className="badge badge-cyan">{comic.genre || 'Sci-Fi'}</span>
        </div>

        {/* Status Pill */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
          }}
        >
          <span className={`badge ${comic.status === 'Published' ? 'badge-success' : 'badge-draft'}`}>
            {comic.status || 'Draft'}
          </span>
        </div>
      </div>

      {/* Comic Details */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <h3
          style={{
            fontSize: '1.15rem',
            marginBottom: '8px',
            lineHeight: 1.3,
            color: '#FFFFFF',
          }}
        >
          {comic.title}
        </h3>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            lineHeight: 1.5,
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flexGrow: 1,
          }}
        >
          {comic.description || 'No description provided for this comic storyline.'}
        </p>

        {/* Metadata stats */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '12px',
            marginBottom: '16px',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={14} color="var(--accent-cyan)" />
            <span>{comic.panels?.length || 0} Panels</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} />
            <span>{formatDate(comic.updatedAt || comic.createdAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto auto',
            gap: '8px',
          }}
        >
          <Link
            to={`/comic/${comic._id}`}
            className="btn btn-primary btn-sm"
            style={{ width: '100%' }}
          >
            <Eye size={15} />
            Read
          </Link>

          <Link
            to={`/comic/${comic._id}/edit`}
            className="btn btn-secondary btn-sm"
            title="Edit Comic"
          >
            <Edit3 size={15} />
          </Link>

          <button
            onClick={() => setShowConfirm(true)}
            className="btn btn-danger btn-sm"
            title="Delete Comic"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(11, 17, 24, 0.95)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
            zIndex: 30,
          }}
        >
          <Trash2 size={32} color="#EF4444" style={{ marginBottom: '12px' }} />
          <h4 style={{ fontSize: '1rem', marginBottom: '8px', color: '#FFFFFF' }}>
            Delete this comic?
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            This action cannot be undone. All panels and dialogues will be permanently deleted.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowConfirm(false)}
              className="btn btn-secondary btn-sm"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-danger btn-sm"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Confirm Delete'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicCard;
