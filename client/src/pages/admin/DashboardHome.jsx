import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiFolder, FiStar, FiBriefcase, FiImage, FiMessageSquare, FiEye } from 'react-icons/fi';
import { dashboardAPI } from '../../services/api';
import './Admin.css';

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardAPI.getStats()
      .then(res => setStats(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  const counts = stats?.counts || {};
  const blogStats = stats?.blogStats || {};

  return (
    <div>
      <div className="admin-page-header"><h1>Dashboard</h1></div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-number">{counts.blogs || 0}</div><div className="stat-label">Blog Posts</div></div>
        <div className="stat-card"><div className="stat-number">{counts.projects || 0}</div><div className="stat-label">Projects</div></div>
        <div className="stat-card"><div className="stat-number">{counts.skills || 0}</div><div className="stat-label">Skills</div></div>
        <div className="stat-card"><div className="stat-number">{counts.experiences || 0}</div><div className="stat-label">Experience</div></div>
        <div className="stat-card"><div className="stat-number">{counts.media || 0}</div><div className="stat-label">Media Files</div></div>
        <div className="stat-card"><div className="stat-number">{blogStats.totalViews || 0}</div><div className="stat-label">Total Views</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Recent Blog Posts</h3>
          {stats?.recent?.blogs?.map(b => (
            <div key={b._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{b.title}</div>
                <span className={`status-badge ${b.status === 'published' ? 'status-published' : 'status-draft'}`}>{b.status}</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}><FiEye size={12} /> {b.views}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Recent Projects</h3>
          {stats?.recent?.projects?.map(p => (
            <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.title}</div>
              <span className="tag">{p.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
