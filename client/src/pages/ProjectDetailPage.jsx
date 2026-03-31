import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi';
import { projectAPI } from '../services/api';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectAPI.getById(id)
      .then(res => setProject(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;
  if (!project) return <div className="empty-state"><h3>Project not found</h3></div>;

  return (
    <main>
      <Helmet><title>{project.title} — Sajidullah Khan</title></Helmet>
      <section className="section" style={{ paddingTop: 'calc(var(--navbar-height) + 60px)' }}>
        <div className="container container-narrow">
          <Link to="/projects" className="btn btn-ghost" style={{ marginBottom: 24 }}><FiArrowLeft /> Back to Projects</Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
              <span className="tag">{project.category}</span>
              {project.featured && <span className="featured-badge" style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '3px 10px', borderRadius: 9999, border: '1px solid rgba(245,158,11,0.2)' }}>Featured</span>}
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 16 }}>{project.title}</h1>

            <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
              {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline"><FiGithub /> GitHub</a>}
              {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary"><FiExternalLink /> Live Demo</a>}
            </div>

            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '1.02rem', marginBottom: 40 }} dangerouslySetInnerHTML={{ __html: project.description }} />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
              {project.techStack?.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            {project.features?.length > 0 && (
              <div className="card" style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>Key Features</h3>
                <ul style={{ paddingLeft: 20, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {project.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}

            {project.learnings?.length > 0 && (
              <div className="card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>Learning Outcomes</h3>
                <ul style={{ paddingLeft: 20, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {project.learnings.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
