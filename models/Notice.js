import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  type:   { type: String, default: 'General' },
  link:   { type: String, default: '' },
  pinned: { type: Boolean, default: false },
  date:   { type: String, default: () => new Date().toLocaleDateString('en-IN') }
}, { timestamps: true });

export default mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);