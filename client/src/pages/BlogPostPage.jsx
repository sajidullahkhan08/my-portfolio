import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiArrowLeft, FiClock, FiEye, FiCalendar } from 'react-icons/fi';
import { blogAPI } from '../services/api';
import './BlogPostPage.css';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      blogAPI.getBySlug(slug),
      blogAPI.getRelated(slug).catch(() => ({ data: { data: [] } }))
    ]).then(([blogRes, relRes]) => {
      setBlog(blogRes.data.data);
      setRelated(relRes.data.data || []);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('blog-content');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const h = el.scrollHeight;
      const scrolled = Math.max(0, -rect.top);
      setProgress(Math.min(100, (scrolled / (h - window.innerHeight)) * 100));
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [blog]);

  const toc = useMemo(() => {
    if (!blog?.content) return [];
    const matches = [...blog.content.matchAll(/<h([2-3])[^>]*>(.*?)<\/h[2-3]>/gi)];
    return matches.map((m, i) => ({
      level: parseInt(m[1]),
      text: m[2].replace(/<[^>]*>/g, ''),
      id: `heading-${i}`
    }));
  }, [blog]);

  const processedContent = useMemo(() => {
    if (!blog?.content) return '';
    let content = blog.content;
    let idx = 0;
    content = content.replace(/<h([2-3])([^>]*)>(.*?)<\/h[2-3]>/gi, (match, level, attrs, text) => {
      const id = `heading-${idx++}`;
      return `<h${level} id="${id}"${attrs}>${text}</h${level}>`;
    });
    // Transform code blocks for syntax highlighting placeholder
    content = content.replace(/<pre><code(?:\s+class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/gi, (match, lang, code) => {
      const escapedCode = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      return `<div class="code-highlight" data-lang="${lang || 'text'}">${escapedCode}</div>`;
    });
    return content;
  }, [blog]);

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;
  if (!blog) return <div className="empty-state"><h3>Post not found</h3></div>;

  return (
    <main>
      <Helmet>
        <title>{blog.seoTitle || blog.title} — Sajidullah Khan</title>
        <meta name="description" content={blog.seoDescription || blog.excerpt} />
        <meta name="keywords" content={blog.seoKeywords?.join(', ') || blog.tags?.join(', ')} />
      </Helmet>

      <div className="reading-progress" style={{ width: `${progress}%` }} />

      <article className="blog-post" style={{ paddingTop: 'calc(var(--navbar-height) + 40px)' }}>
        <div className="container">
          <div className="blog-post-layout">
            {/* TOC Sidebar */}
            {toc.length > 0 && (
              <aside className="blog-toc">
                <div className="toc-sticky">
                  <h4 className="toc-title">Table of Contents</h4>
                  <nav>
                    {toc.map((item, i) => (
                      <a key={i} href={`#${item.id}`} className={`toc-link toc-level-${item.level}`}>
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            <div className="blog-post-main">
              <Link to="/blog" className="btn btn-ghost" style={{ marginBottom: 20 }}><FiArrowLeft /> Back to Blog</Link>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="blog-post-meta">
                  <span className="tag">{blog.category}</span>
                  <span className="meta-item"><FiCalendar size={14} /> {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="meta-item"><FiClock size={14} /> {blog.readingTime}</span>
                  <span className="meta-item"><FiEye size={14} /> {blog.views} views</span>
                </div>

                <h1 className="blog-post-title">{blog.title}</h1>

                {blog.tags?.length > 0 && (
                  <div className="blog-post-tags">
                    {blog.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                )}

                <div id="blog-content" className="blog-post-content" dangerouslySetInnerHTML={{ __html: processedContent }} />
              </motion.div>

              {related.length > 0 && (
                <div className="related-posts">
                  <h3 className="related-title">Related Articles</h3>
                  <div className="related-grid">
                    {related.map(r => (
                      <Link key={r._id} to={`/blog/${r.slug}`} className="related-card card">
                        <span className="tag" style={{ marginBottom: 8 }}>{r.category}</span>
                        <h4>{r.title}</h4>
                        <span className="reading-time">{r.readingTime}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
