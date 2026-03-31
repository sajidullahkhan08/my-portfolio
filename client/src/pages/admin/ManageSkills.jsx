import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { skillAPI } from '../../services/api';
import './Admin.css';

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Frontend', proficiency: 50 });

  const fetchData = () => { setLoading(true); skillAPI.getAll().then(res => setSkills(res.data.data || [])).finally(() => setLoading(false)); };
  useEffect(fetchData, []);

  const resetForm = () => { setForm({ name: '', category: 'Frontend', proficiency: 50 }); setEditing(null); };

  const openEdit = (s) => { setForm({ name: s.name, category: s.category, proficiency: s.proficiency }); setEditing(s._id); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { if (editing) await skillAPI.update(editing, form); else await skillAPI.create(form); fetchData(); setShowForm(false); resetForm(); } catch (err) { alert('Error'); }
  };

  const handleDelete = async (id) => { if (!confirm('Delete?')) return; try { await skillAPI.delete(id); fetchData(); } catch (err) { alert('Error'); } };

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header"><h1>Manage Skills</h1><button className="btn btn-primary btn-sm" onClick={() => { resetForm(); setShowForm(true); }}><FiPlus /> Add Skill</button></div>
      <table className="admin-table">
        <thead><tr><th>Name</th><th>Category</th><th>Proficiency</th><th>Actions</th></tr></thead>
        <tbody>{skills.map(s => (
          <tr key={s._id}>
            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</td>
            <td><span className="tag">{s.category}</span></td>
            <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 80, height: 6, background: 'var(--bg-tertiary)', borderRadius: 99, overflow: 'hidden' }}><div style={{ width: `${s.proficiency}%`, height: '100%', background: 'var(--gradient-primary)', borderRadius: 99 }} /></div><span style={{ fontSize: '0.82rem' }}>{s.proficiency}%</span></div></td>
            <td><div className="table-actions"><button className="btn btn-ghost btn-sm" onClick={() => openEdit(s)}><FiEdit2 /></button><button className="btn btn-ghost btn-sm" onClick={() => handleDelete(s._id)} style={{ color: 'var(--error)' }}><FiTrash2 /></button></div></td>
          </tr>
        ))}</tbody>
      </table>
      {showForm && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="admin-modal" style={{ maxWidth: 440 }}>
            <div className="admin-modal-header"><h2>{editing ? 'Edit Skill' : 'Add Skill'}</h2><button className="modal-close" onClick={() => setShowForm(false)}><FiX /></button></div>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="form-group"><label className="form-label">Category</label>
                <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}><option>Frontend</option><option>Backend</option><option>Database</option><option>Languages</option><option>Tools</option><option>Other</option></select>
              </div>
              <div className="form-group"><label className="form-label">Proficiency ({form.proficiency}%)</label><input type="range" min="0" max="100" value={form.proficiency} onChange={e => setForm({ ...form, proficiency: parseInt(e.target.value) })} style={{ width: '100%' }} /></div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}><button type="button" className="btn btn-outline btn-sm" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="btn btn-primary btn-sm">{editing ? 'Update' : 'Create'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
