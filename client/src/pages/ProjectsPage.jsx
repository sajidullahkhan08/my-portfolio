import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { projectAPI } from '../services/api';
import './ProjectsPage.css';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      projectAPI.getAll(),
      projectAPI.getCategories()
    ]).then(([projRes, catRes]) => {
      setProjects(projRes.data.data || []);
      setCategories(['All', ...(catRes.data.data || [])]);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  return (
    <main>
      <Helmet><title>Projects — Sajidullah Khan</title></Helmet>
      <section className="section" style={{ paddingTop: 'calc(var(--navbar-height) + 60px)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Portfolio</span>
            <h1 className="section-title">Projects</h1>
            <p className="section-description">Systems I've built with purpose and precision.</p>
          </div>

          <div className="filter-tabs">
            {categories.map(c => (
              <button key={c} className={`filter-tab ${activeCategory === c ? 'active' : ''}`} onClick={() => setActiveCategory(c)}>{c}</button>
            ))}
          </div>

          <div className="projects-list">
            {filtered.map((p, i) => (
              <motion.div key={p._id} className="project-item card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="project-item-content">
                  <div className="project-item-header">
                    <span className="tag">{p.category}</span>
                    {p.featured && <span className="featured-badge">Featured</span>}
                  </div>
                  <h3 className="project-item-title">{p.title}</h3>
                  <p className="project-item-desc">{p.shortDescription || p.description?.replace(/<[^>]*>/g, '').slice(0, 180) + '...'}</p>
                  <div className="project-tech">
                    {p.techStack?.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  <div className="project-item-actions">
                    <Link to={`/projects/${p._id}`} className="btn btn-sm btn-primary">Details <FiArrowRight /></Link>
                    {p.githubLink && <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline"><FiGithub /> Code</a>}
                    {p.demoLink && <a href={p.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline"><FiExternalLink /> Demo</a>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
