import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  about: { type: String, required: true },
  email: { type: String, required: true },
  resumeLink: { type: String, default: '#' },
  githubLink: { type: String },
  linkedinLink: { type: String },
  maintenanceMode: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
