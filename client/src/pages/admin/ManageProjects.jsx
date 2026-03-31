import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { projectAPI } from '../../services/api';
import './Admin.css';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', shortDescription: '', techStack: '', category: 'Full Stack', featured: false, demoLink: '', githubLink: '', features: '', learnings: '' });

  const fetchData = () => { setLoading(true); projectAPI.getAll().then(res => setProjects(res.data.data || [])).finally(() => setLoading(false)); };
  useEffect(fetchData, []);

  const resetForm = () => { setForm({ title: '', description: '', shortDescription: '', techStack: '', category: 'Full Stack', featured: false, demoLink: '', githubLink: '', features: '', learnings: '' }); setEditing(null); };

  const openEdit = (p) => {
    setForm({ title: p.title, description: p.description, shortDescription: p.shortDescription || '', techStack: p.techStack?.join(', ') || '', category: p.category, featured: p.featured, demoLink: p.demoLink || '', githubLink: p.githubLink || '', features: p.features?.join('\n') || '', learnings: p.learnings?.join('\n') || '' });
    setEditing(p._id); setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean), features: form.features.split('\n').filter(Boolean), learnings: form.learnings.split('\n').filter(Boolean) };
    try { if (editing) await projectAPI.update(editing, data); else await projectAPI.create(data); fetchData(); setShowForm(false); resetForm(); } catch (err) { alert(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id) => { if (!confirm('Delete this project?')) return; try { await projectAPI.delete(id); fetchData(); } catch (err) { alert('Error'); } };

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header"><h1>Manage Projects</h1><button className="btn btn-primary btn-sm" onClick={() => { resetForm(); setShowForm(true); }}><FiPlus /> New Project</button></div>
      <table className="admin-table">
        <thead><tr><th>Title</th><th>Category</th><th>Featured</th><th>Actions</th></tr></thead>
        <tbody>{projects.map(p => (
          <tr key={p._id}>
            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.title}</td>
            <td><span className="tag">{p.category}</span></td>
            <td>{p.featured ? '⭐' : '—'}</td>
            <td><div className="table-actions"><button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}><FiEdit2 /></button><button className="btn btn-ghost btn-sm" onClick={() => handleDelete(p._id)} style={{ color: 'var(--error)' }}><FiTrash2 /></button></div></td>
          </tr>
        ))}</tbody>
      </table>

      {showForm && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="admin-modal" style={{ maxWidth: 700 }}>
            <div className="admin-modal-header"><h2>{editing ? 'Edit Project' : 'New Project'}</h2><button className="modal-close" onClick={() => setShowForm(false)}><FiX /></button></div>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
              <div className="form-group"><label className="form-label">Short Description</label><input className="form-input" value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">Description (HTML)</label><textarea className="form-textarea" style={{ minHeight: 150 }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Category</label><input className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Tech Stack (comma sep.)</label><input className="form-input" value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">GitHub Link</label><input className="form-input" value={form.githubLink} onChange={e => setForm({ ...form, githubLink: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Demo Link</label><input className="form-input" value={form.demoLink} onChange={e => setForm({ ...form, demoLink: e.target.value })} /></div>
              </div>
              <div className="form-group"><label className="form-label">Features (one per line)</label><textarea className="form-textarea" value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">Learnings (one per line)</label><textarea className="form-textarea" value={form.learnings} onChange={e => setForm({ ...form, learnings: e.target.value })} /></div>
              <div className="form-group"><label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /> Featured Project</label></div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}><button type="button" className="btn btn-outline btn-sm" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="btn btn-primary btn-sm">{editing ? 'Update' : 'Create'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
