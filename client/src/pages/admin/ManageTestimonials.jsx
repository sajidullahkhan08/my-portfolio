import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { testimonialAPI } from '../../services/api';
import './Admin.css';

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', company: '', content: '', rating: 5 });

  const fetchData = () => { setLoading(true); testimonialAPI.getAll().then(res => setTestimonials(res.data.data || [])).finally(() => setLoading(false)); };
  useEffect(fetchData, []);

  const resetForm = () => { setForm({ name: '', role: '', company: '', content: '', rating: 5 }); setEditing(null); };

  const openEdit = (t) => { setForm({ name: t.name, role: t.role || '', company: t.company || '', content: t.content, rating: t.rating }); setEditing(t._id); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { if (editing) await testimonialAPI.update(editing, form); else await testimonialAPI.create(form); fetchData(); setShowForm(false); resetForm(); } catch (err) { alert('Error'); }
  };

  const handleDelete = async (id) => { if (!confirm('Delete?')) return; try { await testimonialAPI.delete(id); fetchData(); } catch (err) { alert('Error'); } };

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header"><h1>Manage Testimonials</h1><button className="btn btn-primary btn-sm" onClick={() => { resetForm(); setShowForm(true); }}><FiPlus /> Add Testimonial</button></div>
      <table className="admin-table">
        <thead><tr><th>Name</th><th>Role</th><th>Rating</th><th>Actions</th></tr></thead>
        <tbody>{testimonials.map(t => (
          <tr key={t._id}>
            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</td>
            <td>{t.role}{t.company ? ` at ${t.company}` : ''}</td>
            <td>{'⭐'.repeat(t.rating)}</td>
            <td><div className="table-actions"><button className="btn btn-ghost btn-sm" onClick={() => openEdit(t)}><FiEdit2 /></button><button className="btn btn-ghost btn-sm" onClick={() => handleDelete(t._id)} style={{ color: 'var(--error)' }}><FiTrash2 /></button></div></td>
          </tr>
        ))}</tbody>
      </table>
      {testimonials.length === 0 && <div className="empty-state"><h3>No testimonials yet</h3></div>}
      {showForm && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="admin-modal" style={{ maxWidth: 500 }}>
            <div className="admin-modal-header"><h2>{editing ? 'Edit' : 'Add'} Testimonial</h2><button className="modal-close" onClick={() => setShowForm(false)}><FiX /></button></div>
            <form onSubmit={handleSubmit}>
              <div className="form-row"><div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div><div className="form-group"><label className="form-label">Role</label><input className="form-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></div></div>
              <div className="form-group"><label className="form-label">Company</label><input className="form-input" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">Content</label><textarea className="form-textarea" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required /></div>
              <div className="form-group"><label className="form-label">Rating ({form.rating}/5)</label><input type="range" min="1" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })} style={{ width: '100%' }} /></div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}><button type="button" className="btn btn-outline btn-sm" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="btn btn-primary btn-sm">{editing ? 'Update' : 'Create'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
