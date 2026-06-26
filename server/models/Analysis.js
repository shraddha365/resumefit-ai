import mongoose from 'mongoose';

const weakSectionSchema = new mongoose.Schema({
  section: String,
  issue: String,
  suggestion: String,
});

const sectionSuggestionSchema = new mongoose.Schema({
  section: String,
  original: String,
  improved: String,
  changes: [String],
});

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    jobDescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobDescription',
      required: true,
    },
    matchScore: Number,
    matchedKeywords: [String],
    missingKeywords: [String],
    weakSections: [weakSectionSchema],
    suggestions: [sectionSuggestionSchema],
    keywordDensity: {
      type: Map,
      of: Number,
    },
    tailoredSections: [sectionSuggestionSchema],
    newScore: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Analysis', analysisSchema);
