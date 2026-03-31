import { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';
import { configAPI } from '../../services/api';
import './Admin.css';

export default function SiteSettings() {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    configAPI.getAll()
      .then(res => setConfig(res.data.data || {}))
      .finally(() => setLoading(false));
  }, []);

  const updateField = (section, key, value) => {
    setConfig(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      const configs = Object.entries(config).map(([key, value]) => ({ key, value, label: key }));
      await configAPI.updateBulk(configs);
      setMsg('Settings saved successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) { setMsg('Error saving settings'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  const hero = config.hero || {};
  const about = config.about || {};
  const contact = config.contact || {};
  const social = config.social || {};

  return (
    <div>
      <div className="admin-page-header"><h1>Site Settings</h1><button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}><FiSave /> {saving ? 'Saving...' : 'Save All'}</button></div>
      {msg && <div className={`alert ${msg.includes('Error') ? 'alert-error' : 'alert-success'}`}>{msg}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 20 }}>Hero Section</h3>
          <div className="form-group"><label className="form-label">Headline</label><input className="form-input" value={hero.headline || ''} onChange={e => updateField('hero', 'headline', e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Subtext</label><textarea className="form-textarea" value={hero.subtext || ''} onChange={e => updateField('hero', 'subtext', e.target.value)} /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">CTA Text</label><input className="form-input" value={hero.cta || ''} onChange={e => updateField('hero', 'cta', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">CTA Link</label><input className="form-input" value={hero.ctaLink || ''} onChange={e => updateField('hero', 'ctaLink', e.target.value)} /></div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 20 }}>About Section</h3>
          <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={about.title || ''} onChange={e => updateField('about', 'title', e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Content (HTML)</label><textarea className="form-textarea" style={{ minHeight: 200, fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }} value={about.content || ''} onChange={e => updateField('about', 'content', e.target.value)} /></div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 20 }}>Contact Info</h3>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={contact.email || ''} onChange={e => updateField('contact', 'email', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={contact.location || ''} onChange={e => updateField('contact', 'location', e.target.value)} /></div>
          </div>
          <div className="form-group"><label className="form-label">Availability</label><input className="form-input" value={contact.availability || ''} onChange={e => updateField('contact', 'availability', e.target.value)} /></div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 20 }}>Social Links</h3>
          <div className="form-row">
            <div className="form-group"><label className="form-label">GitHub</label><input className="form-input" value={social.github || ''} onChange={e => updateField('social', 'github', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">LinkedIn</label><input className="form-input" value={social.linkedin || ''} onChange={e => updateField('social', 'linkedin', e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Twitter</label><input className="form-input" value={social.twitter || ''} onChange={e => updateField('social', 'twitter', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={social.email || ''} onChange={e => updateField('social', 'email', e.target.value)} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
