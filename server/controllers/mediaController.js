const Media = require("../models/Media");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../services/cloudinary");

exports.uploadMedia = async (req, res, next) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    const folder = req.body.folder || "portfolio";
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: `portfolio/${folder}`,
    });
    const media = await Media.create({
      publicId: result.public_id,
      url: result.url,
      secureUrl: result.secure_url,
      format: result.format,
      resourceType: result.resource_type,
      bytes: result.bytes,
      width: result.width || 0,
      height: result.height || 0,
      folder,
      originalFilename: req.file.originalname,
      alt: req.body.alt || "",
      category: req.body.category || "",
      title: req.body.title || "",
      description: req.body.description || "",
      displayInGallery: req.body.displayInGallery !== "false",
    });
    res.status(201).json({ success: true, data: media });
  } catch (error) {
    next(error);
  }
};

exports.getMedia = async (req, res, next) => {
  try {
    const { folder, page = 1, limit = 20 } = req.query;
    const query = folder ? { folder } : {};
    const total = await Media.countDocuments(query);
    const media = await Media.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({
      success: true,
      data: media,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media)
      return res
        .status(404)
        .json({ success: false, message: "Media not found" });
    await deleteFromCloudinary(media.publicId, media.resourceType);
    await Media.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Media deleted" });
  } catch (error) {
    next(error);
  }
};

/* Gallery endpoints */
exports.getGalleryCategories = async (req, res, next) => {
  try {
    const categories = await Media.distinct("category", {
      displayInGallery: true,
      category: { $ne: "" },
    });
    res.json({ success: true, data: categories.sort() });
  } catch (error) {
    next(error);
  }
};

exports.getGallery = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const query = { displayInGallery: true };
    if (category && category !== "all") query.category = category;
    const total = await Media.countDocuments(query);
    const media = await Media.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({
      success: true,
      data: media,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMediaMetadata = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, title, description, displayInGallery } = req.body;
    const media = await Media.findByIdAndUpdate(
      id,
      { category, title, description, displayInGallery },
      { new: true, runValidators: true },
    );
    if (!media)
      return res
        .status(404)
        .json({ success: false, message: "Media not found" });
    res.json({ success: true, data: media });
  } catch (error) {
    next(error);
  }
};
