const mongoose = require('mongoose');
const slugify = require('slugify');
const readingTime = require('reading-time');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, index: true },
  content: { type: String, required: true },
  excerpt: { type: String, default: '' },
  category: { type: String, default: 'General', index: true },
  tags: [{ type: String, trim: true }],
  status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
  featuredImage: { type: String, default: '' },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  seoKeywords: [{ type: String }],
  readingTime: { type: String, default: '' },
  series: { type: String, default: '' },
  seriesOrder: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.isModified('content')) {
    const stats = readingTime(this.content.replace(/<[^>]*>/g, ''));
    this.readingTime = stats.text;
    if (!this.excerpt) {
      this.excerpt = this.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
    }
  }
  next();
});

blogSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Blog', blogSchema);
