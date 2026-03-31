<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-brightgreen?style=for-the-badge&logo=mongodb&logoColor=white" alt="MERN Stack" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-blue?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

<h1 align="center">🌐 Sajidullah Khan — Full-Stack Portfolio Platform</h1>

<p align="center">
  <strong>A production-grade, admin-driven, full-stack portfolio web application built with the MERN stack.</strong>
  <br />
  <em>Where engineering precision meets philosophical depth.</em>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-environment-variables">Environment Variables</a> •
  <a href="#-admin-dashboard">Admin Dashboard</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-license">License</a>
</p>

---

## 📖 Overview

This is **not** a static portfolio. It is a **fully dynamic, admin-driven content management platform** where every piece of content — from the hero headline to individual blog posts — is managed through a secure admin dashboard and served via a RESTful API.

The platform reflects both technical expertise and intellectual depth, showcasing projects, skills, experience, and a philosophical blog — all powered by a robust backend with JWT-based authentication, role-based access control, and Cloudinary media integration.

---

## ✨ Features

### 🎨 Public Frontend
- **Dynamic Homepage** — Animated hero section with code window visual, featured projects grid, skills cloud, and recent blog feed
- **Blog System** — Full-featured blog with search, category filtering, pagination, auto-generated table of contents, reading progress bar, reading time estimation, and related posts
- **Project Showcase** — Category-filterable project listing with detailed individual pages (tech stack, features, learnings)
- **Skills Display** — Grouped by category with animated proficiency progress bars
- **Experience Timeline** — Visual timeline layout separating work experience and education
- **Contact Page** — Info cards with contact form (mailto-based)
- **Dark/Light Mode** — System-aware theme toggle with smooth transitions
- **Responsive Design** — Mobile-first approach, optimized for all screen sizes
- **SEO Optimized** — Dynamic meta tags, semantic HTML, and proper heading hierarchy on every page
- **Smooth Animations** — Framer Motion scroll-triggered animations and micro-interactions
- **Glassmorphism UI** — Modern design with glass-effect cards, gradient accents, and subtle shadows

### 🔐 Admin Dashboard
- **Secure Authentication** — JWT-based login with role-based access control (RBAC)
- **Dashboard Overview** — Real-time statistics (blog count, project count, total views, etc.)
- **Blog Management** — Full CRUD with HTML content editor, SEO fields, tags, categories, draft/publish status
- **Project Management** — Full CRUD with tech stack, features, learnings, featured toggle
- **Skills Management** — CRUD with visual proficiency slider
- **Experience Management** — CRUD with work/education type toggle, date pickers, highlights
- **Testimonial Management** — CRUD with star rating system
- **Media Library** — Cloudinary-powered upload, grid preview, URL copy, and delete
- **Site Settings** — Edit hero section, about page, contact info, and social links dynamically

### ⚙️ Backend API
- **RESTful Architecture** — Clean, consistent API design with proper HTTP methods and status codes
- **JWT Authentication** — Secure token-based auth with protected admin routes
- **Input Validation** — Mongoose schema validation with proper error messages
- **Error Handling** — Centralized error handler with formatted responses for validation, duplicate key, and JWT errors
- **Rate Limiting** — API rate limiting for DDoS protection
- **CORS Configuration** — Properly configured cross-origin resource sharing
- **Security Headers** — Helmet.js integration for HTTP security headers
- **Blog Slugs** — Auto-generated URL-friendly slugs from titles
- **Reading Time** — Auto-calculated reading time for blog posts
- **Text Search** — Full-text search indexing on blog posts
- **Pagination** — Server-side pagination with metadata
- **Media Uploads** — Cloudinary integration with multer memory storage for efficient streaming

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|:--|:--|
| **React 19** | UI component library |
| **Vite** | Build tool and dev server |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP client with interceptors |
| **Framer Motion** | Animations and transitions |
| **React Icons** | Icon library (Feather, Hero Icons) |
| **React Helmet Async** | SEO meta tag management |
| **React Syntax Highlighter** | Code block rendering in blog posts |

### Backend
| Technology | Purpose |
|:--|:--|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Cloudinary** | Media storage and CDN |
| **Multer** | File upload handling |
| **Helmet** | HTTP security headers |
| **CORS** | Cross-origin resource sharing |
| **Express Rate Limit** | API rate limiting |
| **Slugify** | URL-friendly slug generation |
| **Reading Time** | Blog reading time calculation |
| **Sanitize HTML** | XSS prevention for blog content |

---

## 🏗 Architecture

```
my-portfolio/
│
├── 📁 server/                          # Express.js Backend
│   ├── 📁 controllers/
│   │   ├── authController.js           # Login, profile, password management
│   │   ├── blogController.js           # Blog CRUD, search, pagination, related posts
│   │   ├── configController.js         # Site configuration (hero, about, contact, social)
│   │   ├── dashboardController.js      # Aggregated statistics
│   │   ├── experienceController.js     # Experience CRUD with type filtering
│   │   ├── mediaController.js          # Cloudinary upload/delete, listing
│   │   ├── projectController.js        # Project CRUD with category filtering
│   │   ├── skillController.js          # Skill CRUD with category filtering
│   │   └── testimonialController.js    # Testimonial CRUD
│   ├── 📁 middleware/
│   │   ├── auth.js                     # JWT verification + admin-only authorization
│   │   └── errorHandler.js             # Centralized error handling
│   ├── 📁 models/
│   │   ├── Blog.js                     # Blog schema (auto-slug, reading time, text index)
│   │   ├── Experience.js               # Work & education entries
│   │   ├── Media.js                    # Cloudinary media references
│   │   ├── Project.js                  # Portfolio projects
│   │   ├── Skill.js                    # Skills with proficiency levels
│   │   ├── SiteConfig.js               # Dynamic site configuration (key-value)
│   │   ├── Testimonial.js              # Client testimonials
│   │   └── User.js                     # Users with bcrypt password hashing
│   ├── 📁 routes/
│   │   ├── auth.js                     # /api/auth/*
│   │   ├── blogs.js                    # /api/blogs/*
│   │   ├── config.js                   # /api/config/*
│   │   ├── dashboard.js                # /api/dashboard/*
│   │   ├── experience.js               # /api/experience/*
│   │   ├── media.js                    # /api/media/*
│   │   ├── projects.js                 # /api/projects/*
│   │   ├── skills.js                   # /api/skills/*
│   │   └── testimonials.js             # /api/testimonials/*
│   ├── 📁 services/
│   │   └── cloudinary.js               # Cloudinary SDK + multer + upload stream
│   ├── index.js                        # Server entry point
│   ├── seed.js                         # Database population script
│   ├── package.json
│   └── .env                            # Environment variables (not committed)
│
├── 📁 client/                          # React + Vite Frontend
│   └── 📁 src/
│       ├── 📁 components/
│       │   ├── Navbar.jsx              # Responsive navbar with scroll effect & theme toggle
│       │   ├── Navbar.css
│       │   ├── Footer.jsx              # Site footer with links and branding
│       │   └── Footer.css
│       ├── 📁 context/
│       │   ├── AuthContext.jsx          # Authentication state management
│       │   └── ThemeContext.jsx         # Dark/light mode management
│       ├── 📁 pages/
│       │   ├── HomePage.jsx            # Hero, featured projects, skills, blogs
│       │   ├── AboutPage.jsx           # Dynamic about content
│       │   ├── ProjectsPage.jsx        # Filterable project listing
│       │   ├── ProjectDetailPage.jsx   # Individual project details
│       │   ├── BlogPage.jsx            # Blog listing with search & pagination
│       │   ├── BlogPostPage.jsx        # Full blog post with TOC & progress bar
│       │   ├── SkillsPage.jsx          # Grouped skills with progress bars
│       │   ├── ExperiencePage.jsx       # Timeline display
│       │   ├── ContactPage.jsx         # Contact info + form
│       │   └── 📁 admin/
│       │       ├── AdminLogin.jsx      # Admin authentication
│       │       ├── AdminLayout.jsx     # Dashboard layout with sidebar
│       │       ├── Admin.css           # All admin styles
│       │       ├── DashboardHome.jsx   # Stats overview
│       │       ├── ManageBlogs.jsx     # Blog CRUD
│       │       ├── ManageProjects.jsx  # Project CRUD
│       │       ├── ManageSkills.jsx    # Skills CRUD
│       │       ├── ManageExperience.jsx # Experience CRUD
│       │       ├── ManageTestimonials.jsx # Testimonial CRUD
│       │       ├── MediaLibrary.jsx    # Media upload and management
│       │       └── SiteSettings.jsx    # Dynamic site configuration
│       ├── 📁 services/
│       │   └── api.js                  # Axios instance with JWT interceptors
│       ├── App.jsx                     # Root component with routing
│       ├── main.jsx                    # Entry point
│       └── index.css                   # Global design system (CSS variables)
│
├── .gitignore
└── README.md                           # ← You are here
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

| Requirement | Version |
|:--|:--|
| **Node.js** | v18 or higher |
| **npm** | v9 or higher |
| **MongoDB** | v6+ (local or [MongoDB Atlas](https://www.mongodb.com/atlas)) |
| **Cloudinary Account** | Free tier works ([sign up](https://cloudinary.com/)) |

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/my-portfolio.git
cd my-portfolio
```

**2. Install backend dependencies**

```bash
cd server
npm install
```

**3. Install frontend dependencies**

```bash
cd ../client
npm install
```

**4. Configure environment variables**

Create a `.env` file in the `/server` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=5000
NODE_ENV=development
```

> ⚠️ **Important:** Replace the placeholder values with your actual credentials. Never commit the `.env` file to version control.

**5. Seed the database**

```bash
cd server
node seed.js
```

This populates the database with:
- 1 admin user
- 4 site configuration entries (hero, about, contact, social)
- 15 skills across 5 categories
- 5 portfolio projects
- 3 experience entries (2 work, 1 education)
- 5 philosophical blog posts (fully formatted with HTML)

**6. Start the servers**

```bash
# Terminal 1 — Backend (port 5000)
cd server
node index.js

# Terminal 2 — Frontend (port 5173)
cd client
npm run dev
```

**7. Open in browser**

| URL | Description |
|:----|:-----------|
| `http://localhost:5173` | Public portfolio frontend |
| `http://localhost:5173/admin/login` | Admin dashboard login |

---

## 🔑 Environment Variables

### Server (`/server/.env`)

| Variable | Description | Required |
|:---------|:-----------|:--------:|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT token signing | ✅ |
| `JWT_EXPIRE` | Token expiration time (e.g., `7d`, `24h`) | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |
| `PORT` | Server port (default: `5000`) | ❌ |
| `NODE_ENV` | Environment (`development` / `production`) | ❌ |

### Client

The frontend uses a Vite proxy configured to forward `/api` requests to `http://localhost:5000`. No additional environment variables are needed for development.

---

## 👨‍💼 Admin Dashboard

### Default Credentials

| Field | Value |
|:------|:------|
| **Email** | `admin@sajidullahkhan.com` |
| **Password** | `Admin@123456` |

> 🔒 **Security Note:** Change these credentials immediately after first login in a production environment.

### Dashboard Modules

| Module | Route | Description |
|:-------|:------|:------------|
| **Dashboard** | `/admin` | Overview with stats, recent blog posts, and recent projects |
| **Blogs** | `/admin/blogs` | Create, edit, delete blog posts with HTML content, SEO fields, tags, and publish/draft status |
| **Projects** | `/admin/projects` | Manage portfolio projects with tech stack, features, learnings, and featured toggle |
| **Skills** | `/admin/skills` | Add/edit skills with category grouping and proficiency slider (0–100%) |
| **Experience** | `/admin/experience` | Manage work experience and education entries with timeline highlights |
| **Testimonials** | `/admin/testimonials` | Add client testimonials with star ratings |
| **Media** | `/admin/media` | Upload files to Cloudinary, preview images, copy URLs, delete |
| **Settings** | `/admin/settings` | Edit hero section, about page content, contact info, and social links |

---

## 📡 API Reference

All API endpoints are prefixed with `/api`.

### Authentication
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:----:|
| `POST` | `/api/auth/login` | Login and receive JWT token | ❌ |
| `GET` | `/api/auth/me` | Get current user profile | ✅ |
| `PUT` | `/api/auth/password` | Update password | ✅ |

### Blogs
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:----:|
| `GET` | `/api/blogs` | List blogs (supports `?page`, `?limit`, `?category`, `?search`) | ❌ |
| `GET` | `/api/blogs/categories` | Get all blog categories | ❌ |
| `GET` | `/api/blogs/:slug` | Get blog by slug (increments view count) | ❌ |
| `GET` | `/api/blogs/:slug/related` | Get related blog posts | ❌ |
| `POST` | `/api/blogs` | Create blog post | 🔐 |
| `PUT` | `/api/blogs/:id` | Update blog post | 🔐 |
| `DELETE` | `/api/blogs/:id` | Delete blog post | 🔐 |

### Projects
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:----:|
| `GET` | `/api/projects` | List projects (supports `?category`, `?featured`) | ❌ |
| `GET` | `/api/projects/categories` | Get all project categories | ❌ |
| `GET` | `/api/projects/:id` | Get project by ID | ❌ |
| `POST` | `/api/projects` | Create project | 🔐 |
| `PUT` | `/api/projects/:id` | Update project | 🔐 |
| `DELETE` | `/api/projects/:id` | Delete project | 🔐 |

### Skills
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:----:|
| `GET` | `/api/skills` | List all skills | ❌ |
| `POST` | `/api/skills` | Create skill | 🔐 |
| `PUT` | `/api/skills/:id` | Update skill | 🔐 |
| `DELETE` | `/api/skills/:id` | Delete skill | 🔐 |

### Experience
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:----:|
| `GET` | `/api/experience` | List all experience entries | ❌ |
| `POST` | `/api/experience` | Create entry | 🔐 |
| `PUT` | `/api/experience/:id` | Update entry | 🔐 |
| `DELETE` | `/api/experience/:id` | Delete entry | 🔐 |

### Testimonials
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:----:|
| `GET` | `/api/testimonials` | List all testimonials | ❌ |
| `POST` | `/api/testimonials` | Create testimonial | 🔐 |
| `PUT` | `/api/testimonials/:id` | Update testimonial | 🔐 |
| `DELETE` | `/api/testimonials/:id` | Delete testimonial | 🔐 |

### Media
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:----:|
| `GET` | `/api/media` | List media files | 🔐 |
| `POST` | `/api/media/upload` | Upload file to Cloudinary | 🔐 |
| `DELETE` | `/api/media/:id` | Delete media file | 🔐 |

### Site Configuration
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:----:|
| `GET` | `/api/config` | Get all site configuration | ❌ |
| `PUT` | `/api/config` | Update configuration (bulk) | 🔐 |

### Dashboard
| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:----:|
| `GET` | `/api/dashboard/stats` | Get aggregated statistics | 🔐 |

> **Legend:** ❌ = Public | ✅ = Authenticated | 🔐 = Admin Only

---

## 🎨 Design System

The application uses a custom CSS design system built with CSS custom properties (variables) for maximum flexibility.

### Theme Variables

```css
/* Core colors adapt based on [data-theme="dark"|"light"] */
--bg-primary        /* Main background */
--bg-secondary      /* Section backgrounds */
--bg-card           /* Card surfaces */
--text-primary      /* Headings */
--text-secondary    /* Body text */
--accent-primary    /* Violet — brand color */
--accent-secondary  /* Cyan — secondary accent */
--accent-tertiary   /* Emerald — tertiary accent */
```

### Key Design Patterns

| Pattern | Implementation |
|:--------|:--------------|
| **Glassmorphism** | `backdrop-filter: blur()` on navbar and cards |
| **Gradient Text** | `background-clip: text` on headings |
| **Scroll Animation** | Framer Motion `whileInView` with staggered delays |
| **Reading Progress** | Fixed-top progress bar on blog posts |
| **Responsive Grid** | CSS Grid with `auto-fill` and `minmax()` |
| **Mobile Navigation** | Animated slide-down menu with `AnimatePresence` |

---

## 🌐 Deployment

### Option 1: Render (Recommended for full-stack)

**Backend:**

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Set root directory to `server`
4. Build command: `npm install`
5. Start command: `node index.js`
6. Add all environment variables from `.env`

**Frontend:**

1. Create a new **Static Site** on Render
2. Connect same repository
3. Set root directory to `client`
4. Build command: `npm install && npm run build`
5. Publish directory: `dist`
6. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`

### Option 2: Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel:**
```bash
cd client
npx vercel
```

**Backend on Railway:**
1. Create new project on [Railway](https://railway.app)
2. Deploy from GitHub, set root to `server`
3. Add environment variables

### Option 3: VPS (DigitalOcean, AWS, etc.)

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install && npm run build

# Serve frontend build with Express (add to server/index.js)
app.use(express.static(path.join(__dirname, '../client/dist')));

# Use PM2 for process management
npm install -g pm2
pm2 start server/index.js --name portfolio
```

---

## 🧪 Development

### Running in Development

```bash
# Backend with auto-restart (install nodemon globally first)
cd server
npx nodemon index.js

# Frontend with HMR
cd client
npm run dev
```

### Building for Production

```bash
cd client
npm run build
# Output will be in client/dist/
```

### Database Management

```bash
# Seed database with initial data
cd server
node seed.js

# This creates:
# - Admin user (admin@sajidullahkhan.com / Admin@123456)
# - 5 portfolio projects
# - 15 skills across 5 categories
# - 3 experience entries
# - 5 philosophical blog posts
# - Site configuration (hero, about, contact, social)
```

---

## 📊 Data Models

### User
```
{ name, email, password (hashed), role (user|admin) }
```

### Blog
```
{ title, slug (auto), content, excerpt, category, tags[], status,
  featuredImage, seoTitle, seoDescription, seoKeywords[],
  readingTime (auto), series, views, author }
```

### Project
```
{ title, shortDescription, description, techStack[], category,
  featured, images[], demoLink, githubLink, features[], learnings[], order }
```

### Skill
```
{ name, category, proficiency (0-100), icon, order }
```

### Experience
```
{ type (work|education), title, organization, location,
  startDate, endDate, current, description, highlights[], order }
```

### SiteConfig
```
{ key, label, value (Mixed — supports any JSON structure) }
```

---

## 🔒 Security

- **Password Hashing** — bcrypt with salt rounds
- **JWT Authentication** — Secure token-based auth with configurable expiration
- **Role-Based Access** — Admin-only middleware protecting sensitive routes
- **HTTP Security Headers** — Helmet.js integration
- **Rate Limiting** — Express rate limiter on all routes
- **Input Sanitization** — HTML sanitization on blog content to prevent XSS
- **CORS** — Configured to allow only trusted origins
- **Environment Variables** — All secrets stored in `.env` (never committed)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Sajidullah Khan**

- **Role:** Full-Stack Developer
- **Location:** Islamabad, Pakistan
- **Education:** BS Computer Science

---

<p align="center">
  <em>Crafted with 💜 precision, purpose, and a commitment to excellence.</em>
</p>
