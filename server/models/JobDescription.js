import mongoose from 'mongoose';

const jobDescriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: String,
    company: String,
    rawText: String,
    requiredSkills: [String],
    preferredSkills: [String],
    responsibilities: [String],
    keywords: [String],
    experienceLevel: String,
    roleTitle: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('JobDescription', jobDescriptionSchema);
