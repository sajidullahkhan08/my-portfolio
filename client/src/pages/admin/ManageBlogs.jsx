import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { blogAPI } from '../../services/api';
import './Admin.css';

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', excerpt: '', category: 'General', tags: '', status: 'draft', featuredImage: '', seoTitle: '', seoDescription: '', seoKeywords: '', series: '' });

  const fetchBlogs = () => {
    setLoading(true);
    blogAPI.getAll({ limit: 100 }).then(res => setBlogs(res.data.data || [])).finally(() => setLoading(false));
  };

  useEffect(fetchBlogs, []);

  const resetForm = () => {
    setForm({ title: '', content: '', excerpt: '', category: 'General', tags: '', status: 'draft', featuredImage: '', seoTitle: '', seoDescription: '', seoKeywords: '', series: '' });
    setEditing(null);
  };

  const openEdit = (blog) => {
    setForm({
      title: blog.title, content: blog.content, excerpt: blog.excerpt || '', category: blog.category,
      tags: blog.tags?.join(', ') || '', status: blog.status, featuredImage: blog.featuredImage || '',
      seoTitle: blog.seoTitle || '', seoDescription: blog.seoDescription || '', seoKeywords: blog.seoKeywords?.join(', ') || '', series: blog.series || ''
    });
    setEditing(blog._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), seoKeywords: form.seoKeywords.split(',').map(k => k.trim()).filter(Boolean) };
    try {
      if (editing) await blogAPI.update(editing, data);
      else await blogAPI.create(data);
      fetchBlogs();
      setShowForm(false);
      resetForm();
    } catch (err) { alert(err.response?.data?.message || 'Error saving blog'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    try { await blogAPI.delete(id); fetchBlogs(); } catch (err) { alert('Error deleting'); }
  };

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1>Manage Blogs</h1>
        <button className="btn btn-primary btn-sm" onClick={() => { resetForm(); setShowForm(true); }}><FiPlus /> New Post</button>
      </div>

      <table className="admin-table">
        <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Views</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          {blogs.map(b => (
            <tr key={b._id}>
              <td style={{ fontWeight: 600, color: 'var(--text-primary)', maxWidth: 300 }}>{b.title}</td>
              <td><span className="tag">{b.category}</span></td>
              <td><span className={`status-badge ${b.status === 'published' ? 'status-published' : 'status-draft'}`}>{b.status}</span></td>
              <td>{b.views}</td>
              <td style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>{new Date(b.createdAt).toLocaleDateString()}</td>
              <td><div className="table-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => openEdit(b)}><FiEdit2 /></button>
                <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(b._id)} style={{ color: 'var(--error)' }}><FiTrash2 /></button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      {blogs.length === 0 && <div className="empty-state"><h3>No blog posts yet</h3></div>}

      {showForm && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="admin-modal" style={{ maxWidth: 800 }}>
            <div className="admin-modal-header">
              <h2>{editing ? 'Edit Post' : 'New Post'}</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
              <div className="form-group"><label className="form-label">Content (HTML)</label><textarea className="form-textarea" style={{ minHeight: 200, fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required /></div>
              <div className="form-group"><label className="form-label">Excerpt</label><textarea className="form-textarea" style={{ minHeight: 80 }} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Category</label><input className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Status</label>
                  <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option value="draft">Draft</option><option value="published">Published</option></select>
                </div>
              </div>
              <div className="form-group"><label className="form-label">Tags (comma separated)</label><input className="form-input" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">Featured Image URL</label><input className="form-input" value={form.featuredImage} onChange={e => setForm({ ...form, featuredImage: e.target.value })} /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">SEO Title</label><input className="form-input" value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Series</label><input className="form-input" value={form.series} onChange={e => setForm({ ...form, series: e.target.value })} /></div>
              </div>
              <div className="form-group"><label className="form-label">SEO Description</label><textarea className="form-textarea" style={{ minHeight: 60 }} value={form.seoDescription} onChange={e => setForm({ ...form, seoDescription: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">SEO Keywords (comma separated)</label><input className="form-input" value={form.seoKeywords} onChange={e => setForm({ ...form, seoKeywords: e.target.value })} /></div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
