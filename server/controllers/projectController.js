const Project = require('../models/Project');

exports.getProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const query = {};
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) { next(error); }
};

exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) { next(error); }
};

exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) { next(error); }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) { next(error); }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) { next(error); }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Project.distinct('category');
    res.json({ success: true, data: categories });
  } catch (error) { next(error); }
};
