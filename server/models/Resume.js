import mongoose from 'mongoose';

const resumeSectionSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
});

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      default: 'Untitled Resume',
    },
    rawText: String,
    sections: [resumeSectionSchema],
    fileUrl: String,
    fileName: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Resume', resumeSchema);
