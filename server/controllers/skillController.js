const Skill = require('../models/Skill');

exports.getSkills = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const skills = await Skill.find(query).sort({ order: 1, category: 1 });
    res.json({ success: true, data: skills });
  } catch (error) { next(error); }
};

exports.createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) { next(error); }
};

exports.updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, data: skill });
  } catch (error) { next(error); }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) { next(error); }
};
