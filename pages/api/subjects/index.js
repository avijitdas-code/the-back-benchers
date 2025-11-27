// pages/api/subjects/index.js
//import dbConnect from 'lib/dbConnect'; // Corrected path
//import Subject from 'models/Subject';   // Corrected path

import dbConnect from '@/lib/dbConnect'; // Use alias
import Subject from '@/models/Subject';   // Use alias
export default async function handler(req, res) {
  // Ensure we only handle GET requests for fetching subjects
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Connect to the database
  await dbConnect();

  try {
    // Extract stream and semester from the query parameters
    const { stream, semester } = req.query;

    if (!stream || !semester) {
      return res.status(400).json({ success: false, message: 'Stream and Semester are required query parameters.' });
    }

    // Find subjects based on stream and semester
    // We also explicitly set contentType to 'notes' for now, as that's what we're fetching first
    const subjects = await Subject.find({
      stream: stream.toLowerCase(),
      semester: semester.toLowerCase(),
      contentType: 'notes' // Assuming we're fetching notes here initially
    }).lean(); // .lean() makes the query faster by returning plain JavaScript objects

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ success: false, message: 'No subjects found for this stream and semester.' });
    }

    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch subjects.', error: error.message });
  }
}