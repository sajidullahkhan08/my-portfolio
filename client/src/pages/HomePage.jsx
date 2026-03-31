import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiExternalLink } from 'react-icons/fi';
import { configAPI, projectAPI, blogAPI, skillAPI } from '../services/api';
import './HomePage.css';

export default function HomePage() {
  const [hero, setHero] = useState(null);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      configAPI.getAll(),
      projectAPI.getAll({ featured: true }),
      blogAPI.getAll({ limit: 3 }),
      skillAPI.getAll()
    ]).then(([configRes, projRes, blogRes, skillRes]) => {
      setHero(configRes.data.data?.hero);
      setProjects(projRes.data.data?.slice(0, 3) || []);
      setBlogs(blogRes.data.data || []);
      setSkills(skillRes.data.data || []);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;

  return (
    <main>
      <Helmet><title>Sajidullah Khan — Full-Stack Developer</title></Helmet>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-glow" />
        <div className="container hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="hero-label">Full-Stack Developer</span>
            <h1 className="hero-title">{hero?.headline || 'Building the Future with Code'}</h1>
            <p className="hero-subtitle">{hero?.subtext || ''}</p>
            <div className="hero-actions">
              <Link to={hero?.ctaLink || '/projects'} className="btn btn-primary">
                {hero?.cta || 'View My Work'} <FiArrowRight />
              </Link>
              <Link to="/blog" className="btn btn-outline">Read My Blog</Link>
            </div>
          </motion.div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="code-window">
              <div className="code-dots"><span /><span /><span /></div>
              <pre className="code-block"><code>{`const developer = {
  name: "Sajidullah Khan",
  role: "Full-Stack Developer",
  passion: ["Code", "Philosophy", "Truth"],
  building: async () => {
    return meaningfulSystems();
  }
};`}</code></pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-description">A selection of systems I've built with care and purpose.</p>
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <motion.div key={p._id} className="project-card card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="project-card-header">
                  <span className="tag">{p.category}</span>
                  <div className="project-links">
                    {p.githubLink && <a href={p.githubLink} target="_blank" rel="noopener noreferrer"><FiGithub /></a>}
                    {p.demoLink && <a href={p.demoLink} target="_blank" rel="noopener noreferrer"><FiExternalLink /></a>}
                  </div>
                </div>
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-desc">{p.shortDescription || p.description?.replace(/<[^>]*>/g, '').slice(0, 120) + '...'}</p>
                <div className="project-tech">
                  {p.techStack?.slice(0, 4).map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <Link to={`/projects/${p._id}`} className="project-card-link">View Details <FiArrowRight /></Link>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/projects" className="btn btn-outline">View All Projects <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Capabilities</span>
            <h2 className="section-title">Skills & Technologies</h2>
          </div>
          <div className="skills-cloud">
            {skills.map((s, i) => (
              <motion.div key={s._id} className="skill-chip" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                {s.name}
                <span className="skill-level" style={{ width: `${s.proficiency}%` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Writing</span>
            <h2 className="section-title">Recent Thoughts</h2>
            <p className="section-description">Reflections on code, philosophy, and the questions that matter.</p>
          </div>
          <div className="blogs-grid">
            {blogs.map((b, i) => (
              <motion.article key={b._id} className="blog-card card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="blog-card-meta">
                  <span className="tag">{b.category}</span>
                  <span className="blog-date">{new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h3 className="blog-card-title">
                  <Link to={`/blog/${b.slug}`}>{b.title}</Link>
                </h3>
                <p className="blog-card-excerpt">{b.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="reading-time">{b.readingTime}</span>
                  <Link to={`/blog/${b.slug}`} className="read-more">Read More <FiArrowRight /></Link>
                </div>
              </motion.article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/blog" className="btn btn-outline">All Articles <FiArrowRight /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
