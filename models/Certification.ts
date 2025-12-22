import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  imageUrl: { type: String, required: true },
  credentialLink: { type: String },
  isFeatured: { type: Boolean, default: false },
  priority: { type: Number, default: 0, min: 0, max: 10 },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
