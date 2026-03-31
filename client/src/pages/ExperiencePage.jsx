import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiBriefcase, FiBookOpen } from 'react-icons/fi';
import { experienceAPI } from '../services/api';
import './ExperiencePage.css';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    experienceAPI.getAll()
      .then(res => setExperiences(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const work = experiences.filter(e => e.type === 'work');
  const education = experiences.filter(e => e.type === 'education');

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present';

  return (
    <main>
      <Helmet><title>Experience — Sajidullah Khan</title></Helmet>
      <section className="section" style={{ paddingTop: 'calc(var(--navbar-height) + 60px)' }}>
        <div className="container container-narrow">
          <div className="section-header">
            <span className="section-label">Journey</span>
            <h1 className="section-title">Experience & Education</h1>
          </div>

          {work.length > 0 && (
            <div className="timeline-section">
              <h2 className="timeline-heading"><FiBriefcase /> Work Experience</h2>
              <div className="timeline">
                {work.map((e, i) => (
                  <motion.div key={e._id} className="timeline-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="timeline-dot" />
                    <div className="timeline-content card">
                      <div className="timeline-date">{formatDate(e.startDate)} — {e.current ? 'Present' : formatDate(e.endDate)}</div>
                      <h3 className="timeline-title">{e.title}</h3>
                      <p className="timeline-org">{e.organization}{e.location ? ` · ${e.location}` : ''}</p>
                      <p className="timeline-desc">{e.description}</p>
                      {e.highlights?.length > 0 && (
                        <ul className="timeline-highlights">
                          {e.highlights.map((h, j) => <li key={j}>{h}</li>)}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="timeline-section">
              <h2 className="timeline-heading"><FiBookOpen /> Education</h2>
              <div className="timeline">
                {education.map((e, i) => (
                  <motion.div key={e._id} className="timeline-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="timeline-dot" />
                    <div className="timeline-content card">
                      <div className="timeline-date">{formatDate(e.startDate)} — {e.current ? 'Present' : formatDate(e.endDate)}</div>
                      <h3 className="timeline-title">{e.title}</h3>
                      <p className="timeline-org">{e.organization}{e.location ? ` · ${e.location}` : ''}</p>
                      <p className="timeline-desc">{e.description}</p>
                      {e.highlights?.length > 0 && (
                        <ul className="timeline-highlights">
                          {e.highlights.map((h, j) => <li key={j}>{h}</li>)}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
