const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  type: { type: String, enum: ['work', 'education'], required: true, index: true },
  title: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
  location: { type: String, default: '' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, default: null },
  current: { type: Boolean, default: false },
  description: { type: String, default: '' },
  highlights: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
