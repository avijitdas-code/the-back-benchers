import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema({
  title:            { type: String, required: true },
  subject:          { type: String, required: true },
  semester:         { type: Number, required: true },
  department:       { type: String, required: true },
  year:             { type: String },
  type: {
    type: String,
    enum: ["pyq", "notes", "syllabus", "organizer", "other"],
    required: true
  },
  driveFileId:      { type: String, required: true },
  driveViewLink:    { type: String },
  driveDownloadLink:{ type: String },
  uploadedAt:       { type: Date, default: Date.now }
});

export default mongoose.models.Material ||
  mongoose.model("Material", MaterialSchema);