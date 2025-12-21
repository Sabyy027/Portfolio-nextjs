import mongoose from 'mongoose';

const LearningNodeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['education', 'experience', 'project', 'certification', 'internship'], 
    default: 'experience' 
  },
  institution: { type: String },
  tags: [{ type: String }],
  isHighlighted: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Force re-compilation of the model in development to pick up schema changes
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.LearningNode;
}

export default mongoose.models.LearningNode || mongoose.model('LearningNode', LearningNodeSchema);
