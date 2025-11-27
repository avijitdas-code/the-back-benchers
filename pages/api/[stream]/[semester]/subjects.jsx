// pages/[stream]/[semester]/subjects.jsx
import React, { useState, useEffect } from 'react'; // ADDED useState, useEffect
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaDownload } from 'react-icons/fa';

// REMOVED: import subjectsData from '../../../../lib/subjectsData'; // This line is now gone

export default function SubjectSelectionPage() {
  const router = useRouter();
  const { stream, semester } = router.query;

  const [subjects, setSubjects] = useState([]); // State to store fetched subjects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Helper function to format the display text for stream/semester
  const formatText = (text) => {
    if (!text) return 'Unknown';
    return text.replace(/_/g, ' ').toUpperCase();
  };

  // useEffect hook to fetch data when the component mounts or stream/semester changes
  useEffect(() => {
    if (stream && semester) { // Only fetch if stream and semester are available from the URL
      const fetchSubjects = async () => {
        setLoading(true); // Set loading to true before fetching
        setError(null);   // Clear any previous errors
        try {
          // Construct the API URL using the stream and semester from the router
          const apiUrl = `/api/subjects?stream=${stream}&semester=${semester}`;
          const response = await fetch(apiUrl); // Make the API call
          const result = await response.json(); // Parse the JSON response

          if (response.ok && result.success) { // Check if the API call was successful
            setSubjects(result.data); // Update subjects state with fetched data
          } else {
            // If API call was not successful (e.g., 404, 500, or result.success is false)
            setSubjects([]); // Clear subjects
            setError(result.message || 'Failed to fetch subjects. Please try again.'); // Set error message
          }
        } catch (err) {
          // Catch network errors (e.g., server not running, no internet)
          console.error('Client-side fetch error:', err);
          setError('Network error: Could not connect to the server.');
          setSubjects([]);
        } finally {
          setLoading(false); // Set loading to false after fetching (whether success or error)
        }
      };

      fetchSubjects(); // Call the fetch function
    }
  }, [stream, semester]); // Dependency array: Effect re-runs if stream or semester changes

  // Display a message if stream or semester are not yet available (initial render)
  if (!stream || !semester) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl text-yellow-400">Please select a Stream and Semester from the homepage.</p>
      </div>
    );
  }

  // Function to handle the download button click (opens Google Drive link)
  const handleDownload = (driveLink) => {
    if (driveLink) {
      window.open(driveLink, '_blank'); // Open link in a new tab
    } else {
      alert('Download link not available for this subject.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-8">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Display the selected Stream and Semester */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-300 mb-4">
          {formatText(stream)} - {formatText(semester)} Subjects
        </h1>
        <p className="text-xl text-gray-200 mb-12">
          Select a subject to download its notes.
        </p>

        {/* Conditional Rendering based on loading, error, or subjects data */}
        {loading ? (
          <p className="text-lg text-yellow-400">Loading subjects...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : subjects.length === 0 ? (
          <p className="text-lg text-gray-400">No subjects found for this selection yet. Please add some via the API.</p>
        ) : (
          // Render the grid of subjects if data is available
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map(subject => (
              <div
                key={subject._id || subject.id} // Use MongoDB's _id as key
                className="bg-gray-800 p-8 rounded-lg shadow-lg text-left transform hover:scale-105 transition duration-300 cursor-pointer flex flex-col justify-between"
                onClick={() => handleDownload(subject.driveLink)} // Make the entire card clickable
              >
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{subject.name}</h3>
                  <p className="text-gray-300 mb-4">{subject.overview}</p>
                </div>
                <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-full text-md flex items-center justify-center">
                  <FaDownload className="mr-2" /> Download Notes
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Button to go back to the previous selection page */}
        <div className="mt-16">
          <Link href={`/${stream}/${semester}/selection`} className="bg-transparent border-2 border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
              Go Back to Selection
          </Link>
        </div>
      </div>
    </div>
  );
}