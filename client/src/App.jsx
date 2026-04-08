import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import SkillsPage from "./pages/SkillsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardHome from "./pages/admin/DashboardHome";
import ManageBlogs from "./pages/admin/ManageBlogs";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageSkills from "./pages/admin/ManageSkills";
import ManageExperience from "./pages/admin/ManageExperience";
import ManageTestimonials from "./pages/admin/ManageTestimonials";
import MediaLibrary from "./pages/admin/MediaLibrary";
import SiteSettings from "./pages/admin/SiteSettings";
import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <HomePage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Navbar />
                    <AboutPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/projects"
                element={
                  <>
                    <Navbar />
                    <ProjectsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <>
                    <Navbar />
                    <ProjectDetailPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/gallery"
                element={
                  <>
                    <Navbar />
                    <GalleryPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/blog"
                element={
                  <>
                    <Navbar />
                    <BlogPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/blog/:slug"
                element={
                  <>
                    <Navbar />
                    <BlogPostPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/skills"
                element={
                  <>
                    <Navbar />
                    <SkillsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/experience"
                element={
                  <>
                    <Navbar />
                    <ExperiencePage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <Navbar />
                    <ContactPage />
                    <Footer />
                  </>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="blogs" element={<ManageBlogs />} />
                <Route path="projects" element={<ManageProjects />} />
                <Route path="skills" element={<ManageSkills />} />
                <Route path="experience" element={<ManageExperience />} />
                <Route path="testimonials" element={<ManageTestimonials />} />
                <Route path="media" element={<MediaLibrary />} />
                <Route path="settings" element={<SiteSettings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
