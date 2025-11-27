// pages/api/subjects/add.js
//import dbConnect from 'lib/dbConnect'; // Corrected path
// import Subject from 'models/Subject';   // Corrected path

import dbConnect from '@/lib/dbConnect'; // Use alias
import Subject from '@/models/Subject';   // Use alias

export default async function handler(req, res) {
  // Ensure we only handle POST requests for adding subjects
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Connect to the database
  await dbConnect();

  try {
    const { id, name, overview, driveLink, stream, semester, contentType } = req.body;

    // Basic validation
    if (!id || !name || !overview || !driveLink || !stream || !semester || !contentType) {
      return res.status(400).json({ success: false, message: 'All subject fields are required.' });
    }

    // Convert stream, semester, and contentType to lowercase for consistency
    const newSubject = await Subject.create({
      id,
      name,
      overview,
      driveLink,
      stream: stream.toLowerCase(),
      semester: semester.toLowerCase(),
      contentType: contentType.toLowerCase(),
    });

    res.status(201).json({ success: true, data: newSubject });
  } catch (error) {
    // Handle validation errors or duplicate ID errors
    if (error.code === 11000) { // MongoDB duplicate key error code
      return res.status(409).json({ success: false, message: 'Subject with this ID already exists.' });
    }
    console.error('Error adding subject:', error);
    res.status(500).json({ success: false, message: 'Failed to add subject.', error: error.message });
  }
}