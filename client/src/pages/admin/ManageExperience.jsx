import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { experienceAPI } from '../../services/api';
import './Admin.css';

export default function ManageExperience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ type: 'work', title: '', organization: '', location: '', startDate: '', endDate: '', current: false, description: '', highlights: '' });

  const fetchData = () => { setLoading(true); experienceAPI.getAll().then(res => setExperiences(res.data.data || [])).finally(() => setLoading(false)); };
  useEffect(fetchData, []);

  const resetForm = () => { setForm({ type: 'work', title: '', organization: '', location: '', startDate: '', endDate: '', current: false, description: '', highlights: '' }); setEditing(null); };

  const openEdit = (e) => {
    setForm({ type: e.type, title: e.title, organization: e.organization, location: e.location || '', startDate: e.startDate?.split('T')[0] || '', endDate: e.endDate?.split('T')[0] || '', current: e.current, description: e.description || '', highlights: e.highlights?.join('\n') || '' });
    setEditing(e._id); setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, highlights: form.highlights.split('\n').filter(Boolean), endDate: form.current ? null : form.endDate || null };
    try { if (editing) await experienceAPI.update(editing, data); else await experienceAPI.create(data); fetchData(); setShowForm(false); resetForm(); } catch (err) { alert('Error'); }
  };

  const handleDelete = async (id) => { if (!confirm('Delete?')) return; try { await experienceAPI.delete(id); fetchData(); } catch (err) { alert('Error'); } };

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header"><h1>Manage Experience</h1><button className="btn btn-primary btn-sm" onClick={() => { resetForm(); setShowForm(true); }}><FiPlus /> Add Entry</button></div>
      <table className="admin-table">
        <thead><tr><th>Title</th><th>Organization</th><th>Type</th><th>Period</th><th>Actions</th></tr></thead>
        <tbody>{experiences.map(e => (
          <tr key={e._id}>
            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{e.title}</td>
            <td>{e.organization}</td>
            <td><span className="tag">{e.type}</span></td>
            <td style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>{new Date(e.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — {e.current ? 'Present' : e.endDate ? new Date(e.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}</td>
            <td><div className="table-actions"><button className="btn btn-ghost btn-sm" onClick={() => openEdit(e)}><FiEdit2 /></button><button className="btn btn-ghost btn-sm" onClick={() => handleDelete(e._id)} style={{ color: 'var(--error)' }}><FiTrash2 /></button></div></td>
          </tr>
        ))}</tbody>
      </table>
      {showForm && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="admin-modal">
            <div className="admin-modal-header"><h2>{editing ? 'Edit Entry' : 'New Entry'}</h2><button className="modal-close" onClick={() => setShowForm(false)}><FiX /></button></div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Type</label><select className="form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option value="work">Work</option><option value="education">Education</option></select></div>
                <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Organization</label><input className="form-input" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} required /></div>
                <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Start Date</label><input className="form-input" type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required /></div>
                <div className="form-group"><label className="form-label">End Date</label><input className="form-input" type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} disabled={form.current} /></div>
              </div>
              <div className="form-group"><label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}><input type="checkbox" checked={form.current} onChange={e => setForm({ ...form, current: e.target.checked })} /> Currently here</label></div>
              <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">Highlights (one per line)</label><textarea className="form-textarea" value={form.highlights} onChange={e => setForm({ ...form, highlights: e.target.value })} /></div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}><button type="button" className="btn btn-outline btn-sm" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="btn btn-primary btn-sm">{editing ? 'Update' : 'Create'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
