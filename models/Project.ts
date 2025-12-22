import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  repoLink: { type: String },
  demoLink: { type: String },
  imageUrl: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Featured', 'Personal', 'Mini'], 
    default: 'Personal' 
  },
  projectType: { type: String, default: 'Web App' },
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isOngoing: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  longDescription: { type: String },
  features: [{ type: String }],
}, { timestamps: true });

// Force re-compilation of the model in development to pick up schema changes
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Project;
}

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
