import { useState, useEffect, useRef } from 'react';
import { FiUpload, FiTrash2, FiCopy } from 'react-icons/fi';
import { mediaAPI } from '../../services/api';
import './Admin.css';

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const fetchData = () => { setLoading(true); mediaAPI.getAll({ limit: 50 }).then(res => setMedia(res.data.data || [])).finally(() => setLoading(false)); };
  useEffect(fetchData, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    try { await mediaAPI.upload(formData); fetchData(); } catch (err) { alert('Upload failed'); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ''; }
  };

  const handleDelete = async (id) => { if (!confirm('Delete this media?')) return; try { await mediaAPI.delete(id); fetchData(); } catch (err) { alert('Error'); } };

  const copyUrl = (url) => { navigator.clipboard.writeText(url); };

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1>Media Library</h1>
        <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
          <FiUpload /> {uploading ? 'Uploading...' : 'Upload'}
          <input type="file" ref={fileRef} onChange={handleUpload} accept="image/*,video/*,.pdf" style={{ display: 'none' }} disabled={uploading} />
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
        {media.map(m => (
          <div key={m._id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {m.resourceType === 'image' ? (
              <img src={m.secureUrl || m.url} alt={m.alt || m.originalFilename} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{m.format?.toUpperCase()}</div>
            )}
            <div style={{ padding: 12 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 8 }}>{m.originalFilename}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => copyUrl(m.secureUrl || m.url)} title="Copy URL"><FiCopy size={14} /></button>
                <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(m._id)} style={{ color: 'var(--error)' }} title="Delete"><FiTrash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {media.length === 0 && <div className="empty-state"><h3>No media uploaded</h3><p>Upload images, videos, or documents.</p></div>}
    </div>
  );
}
