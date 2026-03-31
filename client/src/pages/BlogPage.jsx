import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { blogAPI } from '../services/api';
import './BlogPage.css';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    const params = { page, limit: 6 };
    if (category) params.category = category;
    if (search) params.search = search;

    Promise.all([
      blogAPI.getAll(params),
      blogAPI.getCategories()
    ]).then(([blogRes, catRes]) => {
      setBlogs(blogRes.data.data || []);
      setPagination(blogRes.data.pagination || {});
      setCategories(catRes.data.data || []);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [page, category, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const val = e.target.elements.search.value;
    setSearchParams(prev => { val ? prev.set('search', val) : prev.delete('search'); prev.set('page', '1'); return prev; });
  };

  return (
    <main>
      <Helmet><title>Blog — Sajidullah Khan</title></Helmet>
      <section className="section" style={{ paddingTop: 'calc(var(--navbar-height) + 60px)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Blog</span>
            <h1 className="section-title">Thoughts & Reflections</h1>
            <p className="section-description">On code, philosophy, and the questions that shape understanding.</p>
          </div>

          <div className="blog-controls">
            <form onSubmit={handleSearch} className="blog-search">
              <FiSearch className="search-icon" />
              <input name="search" type="text" placeholder="Search articles..." className="form-input" defaultValue={search} style={{ paddingLeft: 40 }} />
            </form>
            <div className="filter-tabs" style={{ justifyContent: 'flex-start' }}>
              <button className={`filter-tab ${!category ? 'active' : ''}`} onClick={() => setSearchParams({ page: '1' })}>All</button>
              {categories.map(c => (
                <button key={c} className={`filter-tab ${category === c ? 'active' : ''}`} onClick={() => setSearchParams({ category: c, page: '1' })}>{c}</button>
              ))}
            </div>
          </div>

          {loading ? <div className="loading-container"><div className="spinner" /></div> : (
            <>
              <div className="blogs-grid">
                {blogs.map((b, i) => (
                  <motion.article key={b._id} className="blog-card card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <div className="blog-card-meta">
                      <span className="tag">{b.category}</span>
                      <span className="blog-date">{new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <h2 className="blog-card-title"><Link to={`/blog/${b.slug}`}>{b.title}</Link></h2>
                    <p className="blog-card-excerpt">{b.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="reading-time">{b.readingTime}</span>
                      <Link to={`/blog/${b.slug}`} className="read-more">Read More <FiArrowRight /></Link>
                    </div>
                  </motion.article>
                ))}
              </div>

              {blogs.length === 0 && <div className="empty-state"><h3>No articles found</h3><p>Try a different search or category.</p></div>}

              {pagination.pages > 1 && (
                <div className="pagination">
                  {Array.from({ length: pagination.pages }, (_, i) => (
                    <button key={i} className={`pagination-btn ${page === i + 1 ? 'active' : ''}`}
                      onClick={() => setSearchParams(prev => { prev.set('page', String(i + 1)); return prev; })}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
