const Experience = require('../models/Experience');

exports.getExperiences = async (req, res, next) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const experiences = await Experience.find(query).sort({ startDate: -1 });
    res.json({ success: true, data: experiences });
  } catch (error) { next(error); }
};

exports.createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) { next(error); }
};

exports.updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!experience) return res.status(404).json({ success: false, message: 'Experience not found' });
    res.json({ success: true, data: experience });
  } catch (error) { next(error); }
};

exports.deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ success: false, message: 'Experience not found' });
    res.json({ success: true, message: 'Experience deleted' });
  } catch (error) { next(error); }
};
