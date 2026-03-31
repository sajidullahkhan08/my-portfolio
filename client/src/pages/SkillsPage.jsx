import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { skillAPI } from '../services/api';
import './SkillsPage.css';

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    skillAPI.getAll()
      .then(res => setSkills(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const grouped = skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  return (
    <main>
      <Helmet><title>Skills — Sajidullah Khan</title></Helmet>
      <section className="section" style={{ paddingTop: 'calc(var(--navbar-height) + 60px)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Capabilities</span>
            <h1 className="section-title">Skills & Technologies</h1>
            <p className="section-description">The tools and languages I use to build robust systems.</p>
          </div>

          <div className="skills-categories">
            {Object.entries(grouped).map(([cat, items], ci) => (
              <motion.div key={cat} className="skill-category card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 }}>
                <h3 className="skill-cat-title">{cat}</h3>
                <div className="skill-items">
                  {items.map(s => (
                    <div key={s._id} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{s.name}</span>
                        <span className="skill-pct">{s.proficiency}%</span>
                      </div>
                      <div className="skill-bar">
                        <motion.div className="skill-bar-fill" initial={{ width: 0 }} whileInView={{ width: `${s.proficiency}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
