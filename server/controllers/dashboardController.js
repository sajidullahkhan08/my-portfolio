const Blog = require('../models/Blog');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Media = require('../models/Media');
const Testimonial = require('../models/Testimonial');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [blogs, projects, skills, experiences, media, testimonials, recentBlogs, recentProjects] = await Promise.all([
      Blog.countDocuments(),
      Project.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Media.countDocuments(),
      Testimonial.countDocuments(),
      Blog.find().sort({ createdAt: -1 }).limit(5).select('title slug status createdAt views'),
      Project.find().sort({ createdAt: -1 }).limit(5).select('title category featured createdAt')
    ]);
    const publishedBlogs = await Blog.countDocuments({ status: 'published' });
    const draftBlogs = await Blog.countDocuments({ status: 'draft' });
    const totalViews = await Blog.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]);

    res.json({
      success: true,
      data: {
        counts: { blogs, projects, skills, experiences, media, testimonials },
        blogStats: { published: publishedBlogs, drafts: draftBlogs, totalViews: totalViews[0]?.total || 0 },
        recent: { blogs: recentBlogs, projects: recentProjects }
      }
    });
  } catch (error) { next(error); }
};
