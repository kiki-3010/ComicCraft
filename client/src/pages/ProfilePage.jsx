import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Calendar,
  Lock,
  Upload,
  Save,
  CheckCircle,
  KeyRound,
  Shield,
  BookOpen,
} from 'lucide-react';
import {
  getProfile,
  updateProfile,
  updatePassword,
  uploadImage,
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileImage, setProfileImage] = useState(
    user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [stats, setStats] = useState({
    totalComics: 0,
    draftComics: 0,
    publishedComics: 0,
    charactersCount: 0,
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getProfile();
        if (res.success) {
          if (res.user) {
            setName(res.user.name || '');
            setBio(res.user.bio || '');
            setProfileImage(res.user.profileImage || '');
          }
          if (res.stats) {
            setStats(res.stats);
          }
        }
      } catch (err) {
        showToast(err.message || 'Failed to load user profile.', 'error');
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const res = await uploadImage(file);
      if (res.success && res.url) {
        setProfileImage(res.url);
        showToast('Avatar uploaded! Click "Save Changes" to apply.', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name cannot be empty.', 'error');
      return;
    }

    try {
      setIsSavingProfile(true);
      const res = await updateProfile({
        name: name.trim(),
        bio: bio.trim(),
        profileImage,
      });

      if (res.success && res.user) {
        updateUser(res.user);
        showToast('Profile updated successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update profile.', 'error');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      showToast('Please provide both current and new password.', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters long.', 'error');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }

    try {
      setIsSavingPassword(true);
      const res = await updatePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      showToast(res.message || 'Password changed successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      showToast(err.message || 'Password update failed.', 'error');
    } finally {
      setIsSavingPassword(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recent';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="container" style={{ padding: '40px 24px 80px', maxWidth: '960px' }}>
      <div style={{ marginBottom: '36px' }}>
        <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
          USER SETTINGS
        </span>
        <h1 className="font-sci-fi" style={{ fontSize: '2.2rem', color: '#FFFFFF' }}>
          Creator Profile
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Manage your account credentials, avatar, and personal creator identity.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        {/* Left Column: Profile Card & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ backgroundColor: '#0B1118', textAlign: 'center', padding: '36px 24px' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
              <img
                src={profileImage}
                alt={name}
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--accent-cyan)',
                  boxShadow: '0 0 25px rgba(0, 191, 255, 0.35)',
                }}
              />
              <label
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  backgroundColor: '#0F172A',
                  border: '1px solid var(--accent-cyan)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--accent-cyan)',
                }}
                title="Upload Avatar"
              >
                <Upload size={15} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  disabled={isUploadingImage}
                />
              </label>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '4px' }}>
              {name || 'Creator'}
            </h3>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '12px' }}>
              {user?.email}
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-dim)',
                fontSize: '0.8rem',
              }}
            >
              <Calendar size={13} />
              <span>Joined {formatDate(user?.createdAt)}</span>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="card" style={{ backgroundColor: '#0B1118' }}>
            <h4
              className="font-sci-fi"
              style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', marginBottom: '16px' }}
            >
              STUDIO TELEMETRY
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Comics</span>
                <strong style={{ color: '#FFFFFF' }}>{stats.totalComics}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Published Comics</span>
                <strong style={{ color: '#4ADE80' }}>{stats.publishedComics}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Draft Comics</span>
                <strong style={{ color: '#FBBF24' }}>{stats.draftComics}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Characters Created</span>
                <strong style={{ color: '#C084FC' }}>{stats.charactersCount}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Forms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Edit Profile Form */}
          <div className="card" style={{ backgroundColor: '#0B1118' }}>
            <h3 className="font-sci-fi" style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#FFFFFF' }}>
              Edit Details
            </h3>

            <form onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (Read-only)</label>
                <input
                  type="email"
                  className="form-input"
                  value={user?.email || ''}
                  disabled
                  style={{ opacity: 0.6, cursor: 'not-allowed' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Creator Bio</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a short bio or your comic storytelling focus..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSavingProfile || isUploadingImage}
              >
                <Save size={16} />
                {isSavingProfile ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="card" style={{ backgroundColor: '#0B1118' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <KeyRound size={20} color="var(--accent-cyan)" />
              <h3 className="font-sci-fi" style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>
                Change Password
              </h3>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password (Min. 6 chars)</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isSavingPassword}
              >
                <Lock size={16} />
                {isSavingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
