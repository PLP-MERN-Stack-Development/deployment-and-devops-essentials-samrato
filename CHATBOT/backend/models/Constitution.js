const mongoose = require('mongoose');

const ConstitutionSchema = new mongoose.Schema({
  chapter: { type: String },
  articleNumber: { type: Number },
  title: { type: String },
  content: { type: String, required: true },
});

// Create a text index on content for full text search
ConstitutionSchema.index({ content: 'text' });

module.exports = mongoose.model('Constitution', ConstitutionSchema);
