const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  publicId: { type: String, required: true },
  url: { type: String, required: true },
  secureUrl: { type: String, default: '' },
  format: { type: String, default: '' },
  resourceType: { type: String, default: 'image' },
  bytes: { type: Number, default: 0 },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  folder: { type: String, default: 'portfolio' },
  originalFilename: { type: String, default: '' },
  alt: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);
