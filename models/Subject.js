import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  code:       { type: String },
  department: { type: String, required: true }, // "CSE", "IT", "ECE"
  semester:   { type: Number, required: true },  // 1-8
});

export default mongoose.models.Subject ||
  mongoose.model("Subject", SubjectSchema);