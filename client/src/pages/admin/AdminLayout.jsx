import { Navigate, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiFileText, FiFolder, FiStar, FiBriefcase, FiMessageSquare, FiImage, FiSettings, FiLogOut } from 'react-icons/fi';
import './Admin.css';

const sidebarLinks = [
  { path: '/admin', icon: <FiHome />, label: 'Dashboard', end: true },
  { path: '/admin/blogs', icon: <FiFileText />, label: 'Blogs' },
  { path: '/admin/projects', icon: <FiFolder />, label: 'Projects' },
  { path: '/admin/skills', icon: <FiStar />, label: 'Skills' },
  { path: '/admin/experience', icon: <FiBriefcase />, label: 'Experience' },
  { path: '/admin/testimonials', icon: <FiMessageSquare />, label: 'Testimonials' },
  { path: '/admin/media', icon: <FiImage />, label: 'Media' },
  { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' },
];

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-logo"><span className="logo-accent">S</span>K Admin</h2>
        </div>
        <nav className="sidebar-nav">
          {sidebarLinks.map(link => (
            <NavLink key={link.path} to={link.path} end={link.end} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              {link.icon} {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">{user.name}</div>
          <button onClick={logout} className="sidebar-link logout-link"><FiLogOut /> Logout</button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
