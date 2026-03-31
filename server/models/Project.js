const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  shortDescription: { type: String, default: '' },
  techStack: [{ type: String, trim: true }],
  images: [{ type: String }],
  demoLink: { type: String, default: '' },
  githubLink: { type: String, default: '' },
  category: { type: String, default: 'Web Development', index: true },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  features: [{ type: String }],
  learnings: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
