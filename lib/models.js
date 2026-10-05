import mongoose from 'mongoose';

const { Schema } = mongoose;
const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  tokenVersion: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
const ContentSchema = new Schema({
  kind: { type: String, required: true, enum: ['projects', 'services', 'certificates', 'experience', 'skills', 'techstack', 'profile', 'settings', 'sections', 'media'] },
  key: { type: String, required: true },
  title: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true, default: {} },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
}, { minimize: false });
ContentSchema.index({ kind: 1, key: 1 }, { unique: true });
ContentSchema.index({ kind: 1, visible: 1, order: 1 });
const MessageSchema = new Schema({
  name: { type: String, required: true, maxlength: 120 },
  email: { type: String, required: true, maxlength: 254 },
  message: { type: String, required: true, maxlength: 5000 },
  status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
});
const RateLimitSchema = new Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true, expires: 0 },
});

export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
export const Content = mongoose.models.PortfolioContent || mongoose.model('PortfolioContent', ContentSchema);
export const Message = mongoose.models.ContactMessage || mongoose.model('ContactMessage', MessageSchema);
export const RateLimit = mongoose.models.PortfolioRateLimit || mongoose.model('PortfolioRateLimit', RateLimitSchema);
