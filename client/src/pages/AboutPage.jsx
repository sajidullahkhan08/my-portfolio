import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { configAPI } from '../services/api';
import './AboutPage.css';

export default function AboutPage() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    configAPI.getAll()
      .then(res => setAbout(res.data.data?.about))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  return (
    <main className="about-page">
      <Helmet><title>About — Sajidullah Khan</title></Helmet>
      <section className="section" style={{ paddingTop: 'calc(var(--navbar-height) + 60px)' }}>
        <div className="container container-narrow">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="section-header" style={{ textAlign: 'left' }}>
              <span className="section-label">About Me</span>
              <h1 className="section-title">{about?.title || 'About Me'}</h1>
            </div>
            <div className="about-content" dangerouslySetInnerHTML={{ __html: about?.content || '' }} />
          </motion.div>

          {about?.languages?.length > 0 && (
            <motion.div className="about-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="about-section-title">Languages</h3>
              <div className="about-tags">
                {about.languages.map(l => <span key={l} className="tag">{l}</span>)}
              </div>
            </motion.div>
          )}

          {about?.interests?.length > 0 && (
            <motion.div className="about-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="about-section-title">Interests</h3>
              <div className="about-tags">
                {about.interests.map(i => <span key={i} className="tag">{i}</span>)}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
