import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  BookOpen,
  FileText,
  CheckCircle,
  Users,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { getProfile, getComics, deleteComic } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ComicCard from '../components/ComicCard';

const DashboardPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalComics: 0,
    draftComics: 0,
    publishedComics: 0,
    charactersCount: 0,
  });
  const [recentComics, setRecentComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [profileRes, comicsRes] = await Promise.all([
        getProfile(),
        getComics({ sort: 'newest' }),
      ]);

      if (profileRes.success && profileRes.stats) {
        setStats(profileRes.stats);
      }

      if (comicsRes.success && comicsRes.comics) {
        setRecentComics(comicsRes.comics.slice(0, 6)); // Top recent comics
      }
    } catch (err) {
      showToast(err.message || 'Failed to load dashboard data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleDeleteComic = async (id) => {
    try {
      const res = await deleteComic(id);
      showToast(res.message || 'Comic deleted successfully.', 'success');
      // Refresh list & stats
      loadDashboardData();
    } catch (err) {
      showToast(err.message || 'Failed to delete comic', 'error');
    }
  };

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      {/* Welcome Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #0B1118 100%)',
          border: '1px solid rgba(0, 191, 255, 0.3)',
          boxShadow: '0 0 30px rgba(0, 191, 255, 0.1)',
          padding: '36px',
          marginBottom: '36px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-cyan">CREATOR WORKSPACE</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Online & Synchronized
            </span>
          </div>
          <h1 className="font-sci-fi" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
            Welcome back, <span className="text-cyan">{user?.name || 'Creator'}</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '560px' }}>
            Your digital studio is ready. Build new panel sequences, update dialogues,
            or publish your ongoing comic storylines.
          </p>
        </div>

        <Link to="/create-comic" className="btn btn-primary btn-lg font-sci-fi">
          <PlusCircle size={20} /> CREATE NEW COMIC
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        {/* Total Comics */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 191, 255, 0.12)',
              border: '1px solid rgba(0, 191, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BookOpen size={24} color="var(--accent-cyan)" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Comics
            </div>
            <div className="font-sci-fi" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>
              {isLoading ? '...' : stats.totalComics}
            </div>
          </div>
        </div>

        {/* Draft Comics */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FileText size={24} color="#FBBF24" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Draft Comics
            </div>
            <div className="font-sci-fi" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>
              {isLoading ? '...' : stats.draftComics}
            </div>
          </div>
        </div>

        {/* Published Comics */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle size={24} color="#4ADE80" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Published
            </div>
            <div className="font-sci-fi" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>
              {isLoading ? '...' : stats.publishedComics}
            </div>
          </div>
        </div>

        {/* Total Characters */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(168, 85, 247, 0.12)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Users size={24} color="#C084FC" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Characters
            </div>
            <div className="font-sci-fi" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>
              {isLoading ? '...' : stats.charactersCount}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Comics Section */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          <div>
            <h2 className="font-sci-fi" style={{ fontSize: '1.5rem', color: '#FFFFFF' }}>
              Recent Comics
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Latest digital storyboards and comic creations.
            </p>
          </div>

          {recentComics.length > 0 && (
            <Link
              to="/comics"
              style={{
                color: 'var(--accent-cyan)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              View All Comics <ArrowRight size={16} />
            </Link>
          )}
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 0',
              color: 'var(--text-muted)',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '3px solid rgba(0, 191, 255, 0.2)',
                borderTopColor: 'var(--accent-cyan)',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto 16px',
              }}
            />
            <span className="font-sci-fi" style={{ letterSpacing: '0.05em' }}>
              RETRIEVING COMIC ARCHIVES...
            </span>
          </div>
        ) : recentComics.length === 0 ? (
          /* Empty State */
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: '60px 24px',
              backgroundColor: '#0B1118',
              border: '1px dashed rgba(0, 191, 255, 0.3)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: 'rgba(0, 191, 255, 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <BookOpen size={32} color="var(--accent-cyan)" />
            </div>
            <h3 className="font-sci-fi" style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#FFFFFF' }}>
              No comics yet
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 24px', fontSize: '0.9rem' }}>
              Your creative journey starts here. Construct your first digital comic with
              speech bubbles, characters, and futuristic panels.
            </p>
            <Link to="/create-comic" className="btn btn-primary font-sci-fi">
              <PlusCircle size={18} /> CREATE YOUR FIRST COMIC
            </Link>
          </div>
        ) : (
          <div className="grid-cols-3">
            {recentComics.map((comic) => (
              <ComicCard
                key={comic._id}
                comic={comic}
                onDelete={handleDeleteComic}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
