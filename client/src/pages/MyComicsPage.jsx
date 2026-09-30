import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  PlusCircle,
  BookOpen,
  SlidersHorizontal,
  Layers,
} from 'lucide-react';
import { getComics, deleteComic } from '../services/api';
import { useToast } from '../context/ToastContext';
import ComicCard from '../components/ComicCard';

const GENRES = [
  'All',
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

const MyComicsPage = () => {
  const { showToast } = useToast();

  const [comics, setComics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserComics = async () => {
    try {
      setIsLoading(true);
      const res = await getComics({
        search: searchTerm,
        genre: selectedGenre,
        sort: sortBy,
      });

      if (res.success && res.comics) {
        setComics(res.comics);
      }
    } catch (err) {
      showToast(err.message || 'Failed to fetch your comics', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserComics();
  }, [selectedGenre, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUserComics();
  };

  const handleDeleteComic = async (id) => {
    try {
      const res = await deleteComic(id);
      showToast(res.message || 'Comic deleted successfully.', 'success');
      setComics((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      showToast(err.message || 'Failed to delete comic', 'error');
    }
  };

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
            CREATOR ARCHIVES
          </span>
          <h1 className="font-sci-fi" style={{ fontSize: '2.2rem', color: '#FFFFFF' }}>
            My Comic Library
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage, edit, read, and organize your digital comic creations.
          </p>
        </div>

        <Link to="/create-comic" className="btn btn-primary font-sci-fi">
          <PlusCircle size={18} /> CREATE NEW COMIC
        </Link>
      </div>

      {/* Filters & Search Bar */}
      <div
        className="card"
        style={{
          padding: '20px',
          backgroundColor: '#0B1118',
          marginBottom: '36px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Search Input */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            position: 'relative',
            flex: '1 1 300px',
          }}
        >
          <Search
            size={18}
            color="var(--text-dim)"
            style={{ position: 'absolute', left: '14px', top: '14px' }}
          />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '44px' }}
            placeholder="Search comics by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Filter Dropdowns */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="var(--accent-cyan)" />
            <select
              className="form-select"
              style={{ width: 'auto', minWidth: '130px' }}
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g === 'All' ? 'All Genres' : g}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={16} color="var(--accent-cyan)" />
            <select
              className="form-select"
              style={{ width: 'auto', minWidth: '140px' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
              <option value="panels">Most Panels</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comics Grid or Empty State */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: '3px solid rgba(0, 191, 255, 0.2)',
              borderTopColor: 'var(--accent-cyan)',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <span className="font-sci-fi" style={{ color: 'var(--text-muted)' }}>
            LOADING ARCHIVES...
          </span>
        </div>
      ) : comics.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: '70px 24px',
            backgroundColor: '#0B1118',
            border: '1px dashed rgba(0, 191, 255, 0.3)',
          }}
        >
          <BookOpen size={48} color="var(--accent-cyan)" style={{ marginBottom: '16px' }} />
          <h3 className="font-sci-fi" style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '8px' }}>
            No Comics Found
          </h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 24px', fontSize: '0.9rem' }}>
            {searchTerm || selectedGenre !== 'All'
              ? 'No comics match your current filters. Try changing your search query.'
              : 'You have not created any comics yet. Begin building your first sci-fi narrative today.'}
          </p>
          <Link to="/create-comic" className="btn btn-primary font-sci-fi">
            <PlusCircle size={18} /> CREATE A COMIC
          </Link>
        </div>
      ) : (
        <div className="grid-cols-3">
          {comics.map((comic) => (
            <ComicCard
              key={comic._id}
              comic={comic}
              onDelete={handleDeleteComic}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComicsPage;
