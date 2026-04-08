const router = require("express").Router();
const {
  uploadMedia,
  getMedia,
  deleteMedia,
  getGallery,
  getGalleryCategories,
  updateMediaMetadata,
} = require("../controllers/mediaController");
const { auth, adminOnly } = require("../middleware/auth");
const { upload } = require("../services/cloudinary");

// Admin routes
router.get("/", auth, adminOnly, getMedia);
router.post("/upload", auth, adminOnly, upload.single("file"), uploadMedia);
router.delete("/:id", auth, adminOnly, deleteMedia);
router.put("/:id/metadata", auth, adminOnly, updateMediaMetadata);

// Public gallery routes
router.get("/gallery/categories", getGalleryCategories);
router.get("/gallery", getGallery);

module.exports = router;
