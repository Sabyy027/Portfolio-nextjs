import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  about: { type: String, required: true },
  email: { type: String, required: true },
  resumeLink: { type: String, default: '#' },
  githubLink: { type: String },
  linkedinLink: { type: String },
  profileImage: { type: String, default: '/logo.jpeg' },
  maintenanceMode: { type: Boolean, default: false },
}, { timestamps: true });

// Force model recompilation if schema changed in dev
if (process.env.NODE_ENV === 'development' && mongoose.models.Profile) {
  delete mongoose.models.Profile;
}

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
