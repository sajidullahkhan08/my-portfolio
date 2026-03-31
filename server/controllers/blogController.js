const Blog = require('../models/Blog');
const sanitizeHtml = require('sanitize-html');

const sanitizeOpts = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'pre', 'code', 'span', 'figure', 'figcaption']),
  allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, '*': ['class', 'id', 'style'], img: ['src', 'alt', 'width', 'height'] }
};

exports.getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, tag, search, status } = req.query;
    const query = {};
    if (!req.user) query.status = 'published';
    else if (status) query.status = status;
    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (search) query.$text = { $search: search };

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ success: true, data: blogs, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    next(error);
  }
};

exports.getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name avatar');
    if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
    if (blog.status !== 'published' && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    blog.views += 1;
    await blog.save();
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const data = { ...req.body, author: req.user._id };
    if (data.content) data.content = sanitizeHtml(data.content, sanitizeOpts);
    const blog = await Blog.create(data);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.content) data.content = sanitizeHtml(data.content, sanitizeOpts);
    const blog = await Blog.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Blog.distinct('category', { status: 'published' });
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

exports.getTags = async (req, res, next) => {
  try {
    const tags = await Blog.distinct('tags', { status: 'published' });
    res.json({ success: true, data: tags });
  } catch (error) {
    next(error);
  }
};

exports.getRelatedBlogs = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    const related = await Blog.find({
      _id: { $ne: blog._id },
      status: 'published',
      $or: [{ category: blog.category }, { tags: { $in: blog.tags } }]
    }).limit(3).sort({ createdAt: -1 });
    res.json({ success: true, data: related });
  } catch (error) {
    next(error);
  }
};
