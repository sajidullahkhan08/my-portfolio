const router = require('express').Router();
const { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog, getCategories, getTags, getRelatedBlogs } = require('../controllers/blogController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/', getBlogs);
router.get('/categories', getCategories);
router.get('/tags', getTags);
router.get('/:slug', getBlogBySlug);
router.get('/:slug/related', getRelatedBlogs);
router.post('/', auth, adminOnly, createBlog);
router.put('/:id', auth, adminOnly, updateBlog);
router.delete('/:id', auth, adminOnly, deleteBlog);

module.exports = router;
