import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiGithub, FiSend } from 'react-icons/fi';
import { configAPI } from '../services/api';
import './ContactPage.css';

export default function ContactPage() {
  const [config, setConfig] = useState({});
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    configAPI.getAll()
      .then(res => setConfig(res.data.data || {}))
      .catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = config.contact || {};
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
    }
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <main>
      <Helmet><title>Contact — Sajidullah Khan</title></Helmet>
      <section className="section" style={{ paddingTop: 'calc(var(--navbar-height) + 60px)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Get in Touch</span>
            <h1 className="section-title">Contact</h1>
            <p className="section-description">Have a question or want to work together? I'd love to hear from you.</p>
          </div>

          <div className="contact-grid">
            <motion.div className="contact-info" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="contact-card card">
                <FiMail size={24} className="contact-icon" />
                <h3>Email</h3>
                <p>{config.contact?.email || 'sajidullahkhan@example.com'}</p>
              </div>
              <div className="contact-card card">
                <FiMapPin size={24} className="contact-icon" />
                <h3>Location</h3>
                <p>{config.contact?.location || 'Islamabad, Pakistan'}</p>
              </div>
              {config.social?.github && (
                <div className="contact-card card">
                  <FiGithub size={24} className="contact-icon" />
                  <h3>GitHub</h3>
                  <a href={config.social.github} target="_blank" rel="noopener noreferrer">View Profile</a>
                </div>
              )}
              <div className="contact-card card">
                <span className="contact-icon" style={{ fontSize: 24 }}>💼</span>
                <h3>Availability</h3>
                <p>{config.contact?.availability || 'Open to opportunities'}</p>
              </div>
            </motion.div>

            <motion.form className="contact-form card" onSubmit={handleSubmit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 24 }}>Send a Message</h3>
              {sent && <div className="alert alert-success">Message prepared! Check your email client.</div>}
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}><FiSend /> Send Message</button>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  );
}
