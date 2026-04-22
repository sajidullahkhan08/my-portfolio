require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Validate required env vars
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missing = requiredEnvVars.filter(v => !process.env[v]);
if (missing.length > 0) {
  console.error(`FATAL: Missing required environment variables: ${missing.join(', ')}`);
  console.error('Set them in your platform dashboard or .env file.');
  process.exit(1);
}

// Security
app.use(helmet());
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map(s => s.trim());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, message: 'Too many requests' });
app.use('/api/', limiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/media', require('./routes/media'));
app.use('/api/config', require('./routes/config'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// One-time remote seed endpoint (protected by SEED_SECRET)
app.post('/api/seed', async (req, res) => {
  try {
    const secret = req.headers['x-seed-secret'] || req.body.secret;
    if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
      return res.status(403).json({ success: false, message: 'Invalid seed secret' });
    }
    const User = require('./models/User');
    const existing = await User.countDocuments();
    if (existing > 0) {
      return res.status(400).json({ success: false, message: 'Database already has users. Delete them first if you want to re-seed.' });
    }
    // Run seed logic inline
    const Blog = require('./models/Blog');
    const Project = require('./models/Project');
    const Skill = require('./models/Skill');
    const Experience = require('./models/Experience');
    const Testimonial = require('./models/Testimonial');
    const Media = require('./models/Media');
    const SiteConfig = require('./models/SiteConfig');

    await Promise.all([
      Blog.deleteMany({}), Project.deleteMany({}), Skill.deleteMany({}),
      Experience.deleteMany({}), Testimonial.deleteMany({}),
      Media.deleteMany({}), SiteConfig.deleteMany({})
    ]);

    const admin = await User.create({
      name: 'Sajidullah Khan',
      email: 'admin@sajidullahkhan.com',
      password: 'Admin@123456',
      role: 'admin'
    });

    const configs = [
      { key: 'hero', label: 'Hero Section', value: {
        headline: 'Full-Stack Developer Exploring the Intersection of Code, Rationality & Meaning',
        subtext: 'I build robust, scalable web systems while engaging deeply with questions of truth, logic, and purpose.',
        cta: 'View My Work', ctaLink: '/projects'
      }},
      { key: 'about', label: 'About Section', value: {
        title: 'About Me',
        content: '<p>I am Sajidullah Khan — a Full-Stack and Backend Web Developer based in Islamabad, Pakistan.</p>'
      }},
      { key: 'contact', label: 'Contact Info', value: {
        email: 'sajiidullahkhan0348@gmail.com',
        location: 'Islamabad, Pakistan',
        availability: 'Open to opportunities'
      }},
      { key: 'social', label: 'Social Links', value: {
        github: 'https://github.com/sajidullahkhan08',
        linkedin: '', twitter: '',
        email: 'sajiidullahkhan0348@gmail.com'
      }}
    ];
    await SiteConfig.insertMany(configs);

    const skills = [
      { name: 'HTML', category: 'Frontend', proficiency: 90, order: 1 },
      { name: 'CSS', category: 'Frontend', proficiency: 85, order: 2 },
      { name: 'JavaScript', category: 'Frontend', proficiency: 88, order: 3 },
      { name: 'React', category: 'Frontend', proficiency: 85, order: 4 },
      { name: 'Node.js', category: 'Backend', proficiency: 88, order: 1 },
      { name: 'Express.js', category: 'Backend', proficiency: 85, order: 2 },
      { name: 'MongoDB', category: 'Database', proficiency: 82, order: 1 },
      { name: 'Git', category: 'Tools', proficiency: 80, order: 1 },
      { name: 'GitHub', category: 'Tools', proficiency: 82, order: 2 }
    ];
    await Skill.insertMany(skills);

    res.json({
      success: true,
      message: 'Database seeded successfully!',
      admin: { email: 'admin@sajidullahkhan.com', password: 'Admin@123456 (CHANGE THIS IMMEDIATELY)' }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Error handler
app.use(errorHandler);

// DB Connection & Start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;
