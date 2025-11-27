// models/Subject.js
import mongoose from 'mongoose';

// Define the schema for a Subject
const SubjectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Please provide an ID for this subject.'],
    unique: true, // Ensures subject IDs are unique
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for this subject.'],
    trim: true,
  },
  overview: {
    type: String,
    required: [true, 'Please provide an overview for this subject.'],
    trim: true,
  },
  driveLink: {
    type: String,
    required: [true, 'Please provide a Google Drive link for this subject.'],
    trim: true,
  },
  stream: {
    type: String,
    required: [true, 'Please provide the stream (e.g., cse_it) for this subject.'],
    trim: true,
    lowercase: true,
  },
  semester: {
    type: String,
    required: [true, 'Please provide the semester (e.g., sem1) for this subject.'],
    trim: true,
    lowercase: true,
  },
  contentType: { // To differentiate between Notes, PYQs, Organizers if stored in same collection
    type: String,
    enum: ['notes', 'pyqs', 'organizers', 'books', 'suggestions'],
    default: 'notes',
    required: [true, 'Please specify the content type (e.g., notes).'],
    lowercase: true,
  },
});

// If the model already exists, use it; otherwise, create a new one.
// This prevents Mongoose from recompiling models in development.
export default mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);